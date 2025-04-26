const { spawn } = require("child_process");
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('🤡');
});

app.listen(3000);

const videoURL = "https://www.facebook.com/100002225287939/videos/1088797489773399/?app=fbl";
const streamURL = "rtmps://live-api-s.facebook.com:443/rtmp/";
const streamKey = "FB-122227477664176809-0-Ab1lZ-0Y6KZ7h_D-L_MUk8NZ
";

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
  ffmpeg.on("close", (code) => console.log(` ريال مدريدvs ,برشلونة: ${code}`));

}

startFacebookLive();
