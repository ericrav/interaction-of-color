import { exec } from 'child_process';
import fs from 'fs';
import Twitter from 'twitter';

import { get, put } from './s3';

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const upload = async (media: Buffer): Promise<string> => {
  let response;
  try {
    response = await client.post('media/upload', { media });
  } catch (e) {
    console.error('Could not upload media');
    throw e;
  }
  return response.media_id_string;
};

const { GITHUB_REPOSITORY, GITHUB_SHA } = process.env;

const getCommitMessage = () => {
  const cmd = `git log --format=%B -n 1 ${GITHUB_SHA}`;
  return new Promise<string>((resolve, reject) => {
    exec(cmd, (error, stdout) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
};

const tweet = async (
  status: string,
  media_ids?: string,
  replyTo?: string
): Promise<string> => {
  let params: Twitter.RequestParams = { status, media_ids };

  if (replyTo) {
    params = {
      ...params,
      in_reply_to_status_id: replyTo,
      auto_populate_reply_metadata: true,
    };
  }

  const response = await client.post('statuses/update', params);

  return response.id_str;
};

export const performTweet = async () => {
  const replyTo = (await get()) || process.env.TWEET_REPLY_TO;
  const commitMessage = await getCommitMessage();
  const commitUrl = `https://github.com/${GITHUB_REPOSITORY}/commit/${GITHUB_SHA}`;
  const status = `${commitMessage}\n${commitUrl}`;

  const file = fs.readFileSync('./output.png');
  const mediaIds = await upload(file);
  console.log('Uploaded media', mediaIds);
  let tweetId: string;
  try {
    tweetId = await tweet(status, mediaIds, replyTo);
  } catch (errors) {
    if (
      errors &&
      errors.length &&
      errors.find((e: { code: number }) => e.code === 385)
    ) {
      console.log('Reply-To tweet does not exist. Retrying without reply...');
      tweetId = await tweet(status, mediaIds);
    } else {
      throw JSON.stringify(errors);
    }
  }

  console.log('Created Tweet', tweetId);
  put(tweetId);
};
