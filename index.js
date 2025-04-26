const { spawn } = require("child_process");
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('🤡');
});

app.listen(3000);

const videoURL = "https://shls-live-enc.edgenextcdn.net/out/v1/46079e838e65490c8299f902a7731168/index.m3u8";
const streamURL = "rtmps://live-api-s.facebook.com:443/rtmp/";
const streamKey = "FB-617310068033384-0-Ab2lizw_B6sL0AAbcEgW8CVg";

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
