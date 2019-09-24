const record = require('node-record-lpcm16');

// Imports the Google Cloud client library
const speech = require('@google-cloud/speech').v1p1beta1;


// Instantiates a client
const client = new speech.SpeechClient(
  {
    projectId: process.env.PROJECT_ID
  }
);

// The encoding of the audio file, e.g. 'LINEAR16'
const encoding = 'LINEAR16';

// The sample rate of the audio file in hertz, e.g. 16000
const sampleRateHertz = 16000;

// The BCP-47 language code to use, e.g. 'en-US'
const languageCode = 'en-GB';

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    // Made up Phrases to pass to the API
    speechContexts: []
  },
  interimResults: true // If you want interim results, set this to true
};

function getOutput(data) {
  const endString = `\n\nReached transcription time limit, press Ctrl+C\n`;
  if (data.results[0] && data.results[0].alternatives[0]) {
    const final = data.results[0].isFinal;
    return `Transcription (isFinal ${final}): ${data.results[0].alternatives[0].transcript}\n`
  }

  return endString;
}

// Create a recognize stream
const recognizeStream = client.streamingRecognize(request)
  .on('error', console.error)
  .on('data', (data) => {
    // To see full response, uncomment bellow
    // process.stdout.write(`${JSON.stringify(data.results)}`);
    const output = getOutput(data);
    process.stdout.write(output);

  });



// Start recording and send the microphone input to the Speech API
record
  .start({
    sampleRateHertz: sampleRateHertz,
    threshold: 0,
    // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
    verbose: false,
    recordProgram: 'rec', // Try also "arecord" or "sox"
    silence: '10.0'
  })
  .on('error', console.error)
  .pipe(recognizeStream);

console.log('Listening, press Ctrl+C to stop.');
