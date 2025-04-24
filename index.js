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
  "-re",
  "-i", videoURL,
  "-r", "30", 
  "-c:v", "libx264",
  "-preset", "veryfast",
  "-tune", "zerolatency",
  "-profile:v", "high",
  "-level", "3.1",
  "-b:v", "4000k",
  "-maxrate", "4000k",
  "-bufsize", "8000k",
  "-g", "60",
  "-keyint_min", "60",
  "-sc_threshold", "0",
  "-pix_fmt", "yuv420p",
  "-c:a", "aac",
  "-b:a", "128k",
  "-ar", "48000",
  "-ac", "2",
  "-f", "flv",
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
