const { spawn } = require("child_process");
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('🟢'));
app.listen(3000);

const VIDEO_URL = "https://ahmed4567-youtube.hf.space/download/1745585653.mp4";
const RTMP_URL = "rtmps://live-api-s.facebook.com:443/rtmp/";
const STREAM_KEY = "FB-616458424785215-0-Ab2kkUO4m_lFM-ZhuBLketB1";
const INTERVAL = 28500000;

function startStream() {
  const ffmpeg = spawn('ffmpeg', [
    '-re', '-i', VIDEO_URL,
    '-c:v', 'libx264', '-preset', 'veryfast', '-tune', 'zerolatency',
    '-b:v', '2500k', '-maxrate', '2500k', '-bufsize', '5000k', '-g', '50',
    '-c:a', 'aac', '-b:a', '128k', '-ac', '2', '-ar', '44100',
    '-f', 'flv', `${RTMP_URL}${STREAM_KEY}`
  ]);

  ffmpeg.stderr.on('data', (d) => console.log(d.toString()));
  ffmpeg.on('close', (c) => {
    console.log(`Restarting... (${c})`);
    setTimeout(startStream, 5000);
  });

  setTimeout(() => ffmpeg.kill(), INTERVAL);
}

process.on('SIGINT', () => {
  console.log('Terminating...');
  process.exit();
});

startStream();
