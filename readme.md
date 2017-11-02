# Node Audio Stream to Speech API

Lifted pretty much straight from the docs [https://cloud.google.com/speech/docs/streaming-recognize#speech-streaming-recognize-nodejs]

Source @ [https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/master/speech/recognize.js]

This is aimed at being a git clone and go demo.

## Non JS dependencies

- For Mac OS: brew install sox.
- For most Linux distributions: sudo apt-get install sox libsox-fmt-all.
- For Windows: Download the binaries.

## JS deps

Run your preference of `$ npm install` or `$ yarn`

Before you run the test, the API will need to have some credentials to use. Run this:

`$ gcloud auth application-default login`

You can now run the demo with:

`$ PROJECT_ID=your-project node index.js`

Then look really odd by randomly talking to your computer :)

*Only tested on macOS 10.12.6 running Node 8.7.0*
