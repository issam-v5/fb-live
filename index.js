const { spawn } = require("child_process");
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('🤡');
});

app.listen(3000);

const videoURL = "https://video-lga3-2.xx.fbcdn.net/o1/v/t2/f2/m69/AQPAx6eziTt51_toN8-JD8GxBzOWhuCJixLDNC0pQGkFAYpHvIiUzj06swp9tfz7l3FPzHckRdu2vsgtlYM3j06i.mp4?strext=1&_nc_cat=105&_nc_sid=5e9851&_nc_ht=video-lga3-2.xx.fbcdn.net&_nc_ohc=dx5PuDwBt88Q7kNvwHrerEa&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5GQUNFQk9PSy4uQzMuNjQwLmRhc2hfbGl2ZV9tZF9mcmFnXzJfdmlkZW8iLCJ4cHZfYXNzZXRfaWQiOjQ3MTc4NDE2NTM3NjQyNCwiYXNzZXRfYWdlX2RheXMiOjQ0NCwidmlfdXNlY2FzZV9pZCI6MTAxMjUsImR1cmF0aW9uX3MiOjE0MTQ2LCJ1cmxnZW5fc291cmNlIjoid3d3In0%3D&ccb=17-1&vs=3c23d2c35cefbd41&_nc_vs=HBksFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HSUNXbUFBMENPV3hpSUFDQUtLa21nQjNIbGhVYnY0R0FBQUYVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dJQ1dtQUNyNHBDTWliWUNBRDRiSWNRVzU1RlBidjRHQUFBRhUCAsgBACgAGAAbAogHdXNlX29pbAExEnByb2dyZXNzaXZlX3JlY2lwZQExFQAAJtCGtPm5xdYBFQIoAkMzLBdAy27qn752yRgZZGFzaF9saXZlX21kX2ZyYWdfMl92aWRlbxEAdQIA&_nc_zt=28&oh=00_AfFi2ShQp6jfrb-dpYCcF_DuZwMUsIL_wQDHMN0sfP75Cg&oe=68115061";
const streamURL = "rtmps://live-api-s.facebook.com:443/rtmp/";
const streamKey = "FB-616472368117154-0-Ab3uiP8sAJaREITFD0JJH0RW";
const STREAM_DURATION = 7.9 * 60 * 60 * 1000;

function startFacebookLive() {
    
const ffmpeg = spawn('ffmpeg', [
  '-re',
  '-i', videoURL,

  // إعدادات الفيديو
  '-c:v', 'libx264',
  '-preset', 'veryfast',
  '-tune', 'zerolatency',
  '-b:v', '2500k',
  '-maxrate', '2500k',
  '-bufsize', '5000k',
  '-g', '50',

  // إعدادات الصوت
  '-c:a', 'aac',
  '-b:a', '128k',
  '-ac', '2',
  '-ar', '44100',

  // الإخراج
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
