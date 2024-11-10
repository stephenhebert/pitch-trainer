let audioContext = null;

const baseVolume = 0.75;
const minFrequency = 20;
const maxFrequency = 20000;

let mainGainNode = null;
let activeSources = [];

let initialized = false;

function initialize() {
  initialized = true;

  audioContext = new AudioContext();

  mainGainNode = audioContext.createGain();
  mainGainNode.connect(audioContext.destination);
  mainGainNode.gain.value = 1;

}

function getFrequencyOctave(frequency) {
  return Math.log2(frequency - minFrequency);
  // let octave = 0;
  // let cursor = frequency;
  // while (cursor > minFrequency) {
  //   cursor /= 2;
  //   octave++;
  // }
  // return octave;
}

function stopAll() {
  const currentSources = [ ...activeSources ]
  while (currentSources.length) {
    currentSources.shift().stop();
  }
}

async function playSample(url) {

  if (!initialized) {
    initialize();
  }

  const audioElement = new Audio(url);
  audioElement.play();
  audioElement.onended = () => {
    audioElement.remove();
  }

  // TODO: convert url to media stream

  // You can also use the Web Audio API to directly generate and manipulate 
  // audio streams from JavaScript code rather than streaming pre-existing 
  // audio files. You can set the srcObject in JavaScript to a MediaStream 
  // object. This is commonly used for live audio streams or real-time audio 
  // processing.

  // https://stackoverflow.com/questions/40314457/audiobuffers-getchanneldata-equivalent-for-mediastream-or-mediastreamaudio
  // ChannelSplitterNode to split the audio stream into separate channels,
  // and then use a ScriptProcessorNode to access the raw audio data.

  // failed attempt below
  // const audio = new Audio();
  // const audioBuffer = await fetch(url)
  //   .then(res => res.arrayBuffer())
  //   .then(ArrayBuffer => audioContext.decodeAudioData(ArrayBuffer));
  // audio.srcObject = audioBuffer;
  // audio.play();
  // audio.onended = () => {
  //   audio.remove();
  // }

  // this doesn't work on iPhone with silent switch
  // const source = audioContext.createBufferSource();
  // const audioBuffer = await fetch(url)
  //   .then(res => res.arrayBuffer())
  //   .then(ArrayBuffer => audioContext.decodeAudioData(ArrayBuffer));

  // source.buffer = audioBuffer;
  // source.connect(audioContext.destination);
  // source.start();
  // activeSources.push(source);
  // source.onended = () => {
  //   activeSources = activeSources.filter(s => s !== source);
  // }

  // console.log(`Playing sample ${url}`, audioBuffer);
  // how does strum machine do it?


};

function playFrequency(frequency, durationMs: number = 1 * 1000) {

  if (!initialized) {
    initialize();
  }

  const osc = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  osc.connect(gainNode);
  gainNode.connect(mainGainNode);
  // higher frequencies are more audible, so we reduce the volume
  const frequencyVolume = baseVolume * Math.pow(.70,getFrequencyOctave(frequency) )
  gainNode.gain.value = frequencyVolume

  // TODO: replace with a better waveform using osc.setPeriodicWave
  osc.type = 'sine';
  osc.frequency.value = frequency;


  activeSources.push(osc);
  osc.start();
  setTimeout(() => {
    osc.stop();
  }, durationMs);

  // console.log(`Playing frequency ${frequency} at ${frequencyVolume} volume for ${durationMs}ms`, Math.log2(frequency - minFrequency));

  // TODO: cleanup osc and gainNode
}

function playFrequencyAllOctaves(frequency, durationMs: number = 1 * 1000) {

  if (!initialized) {
    initialize();
  }

  let cursor = frequency;
  while (cursor < maxFrequency) {
    playFrequency(cursor, durationMs);
    cursor *= 2;
  }
}

export {
  stopAll,
  playSample,
  playFrequency,
  playFrequencyAllOctaves,
}