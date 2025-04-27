const { spawn } = require("child_process");
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('🤡');
});

app.listen(3000);

const videoURL = "https://shls-live-enc.edgenextcdn.net/out/v1/46079e838e65490c8299f902a7731168/index.m3u8";
const streamURL = "rtmps://live-api-s.facebook.com:443/rtmp/";
const streamKey = "FB-618396087924782-0-Ab2vv6KYF7M6QCDBf6r5OnlO";

function startFacebookLive() {
    
const ffmpeg = spawn('ffmpeg', [
  '-re',
  '-i', videoURL,
  '-c:v', 'libx264',
  '-preset', 'veryfast',
  '-tune', 'zerolatency',
  '-b:v', '2500k',
  '-maxrate', '2500k',
  '-bufsize', '5000k',
  '-g', '50',
  '-c:a', 'aac',
  '-b:a', '128k',
  '-ac', '2',
  '-ar', '44100',
  '-f', 'flv',
  `${streamURL}${streamKey}`
]);

  ffmpeg.stderr.on("data", (data) => console.log(`FFmpeg: ${data}`));
  ffmpeg.on("close", (code) => console.log(`الكود الختامي: ${code}`));

}

startFacebookLive();
