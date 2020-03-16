import AWS from 'aws-sdk';

const s3 = new AWS.S3();
const Bucket = process.env.TWEET_S3_BUCKET;
const Key = process.env.GITHUB_REPOSITORY;

const params = {
  Bucket,
  Key,
};

export const put = (Body: string) => {
  s3.putObject({ ...params, Body }, (err, data) => {
    console.log(err, data);
  });
};

export const get = async (): Promise<string | null> => {
  return new Promise(resolve => {
    s3.getObject(params, (err, data) => {
      if (err) {
        resolve(null);
      } else {
        resolve(data.Body.toString());
      }
    });
  });
};
