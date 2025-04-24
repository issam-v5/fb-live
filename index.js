const { spawn } = require("child_process");
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('🤡');
});

app.listen(3000);

const videoURL = "https://shls-mbc3-prod-dub.shahid.net/out/v1/d5bbe570e1514d3d9a142657d33d85e6/index.m3u8";
const streamURL = "rtmps://live-api-s.facebook.com:443/rtmp/";
const streamKey = "FB-645825988326321-0-Ab07EDmP75GhzAC0Kj-vVj3T";
const STREAM_DURATION = 7.9 * 60 * 60 * 1000;

function startFacebookLive() {
    const ffmpeg = spawn('ffmpeg', [
  '-i', videoURL,
  '-c:v', 'libx264',
  '-preset', 'fast',
  '-b:v', '1500k',
  '-c:a', 'aac',
  '-b:a', '128k',
  '-f', 'flv',
  `${streamURL}${streamKey}`
]);

  ffmpeg.stderr.on("data", (data) => console.log(`FFmpeg: ${data}`));
  ffmpeg.on("close", (code) => console.log(`الكود الختامي: ${code}`));

  setTimeout(() => {
    ffmpeg.kill("SIGINT");
    setTimeout(startFacebookLive, 5000);
  }, STREAM_DURATION);
}

startFacebookLive();
