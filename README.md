In this repo, each commit is an attempt at one of the exercises in the book *Interaction of Color* by Josef Albers. It uses [canvas-sketch](https://github.com/mattdesl/canvas-sketch) for rendering, and [dat.gui](https://github.com/dataarts/dat.gui) to adjust colors locally.

Using GitHub Actions, every time a commit is pushed, the image is rendered and added as a reply to this Twitter thread: https://twitter.com/ericrav/status/1239705295645016068

## Setup

1. Clone the repo

```
git clone https://github.com/ericrav/interaction-of-color.git
cd interaction-of-color
```

2. Install JS dependencies

```
npm install
```

3. Run a sketch locally in your browser

```
npm start
```

4. To view a specific attempt, click the link in the Tweet to the commit on GitHub. Copy the SHA of the commit and run, for example:
```
git checkout 81cfd9e3806826061e80624297b001ae29f70de1
```
