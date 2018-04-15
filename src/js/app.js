'use strict';
import 'babel-polyfill'

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector("button[name=play]");
  const context = new window.AudioContext();

  function loadAudio(url) {
    return new Promise((fulfilled, rejected) => {
      const request = new XMLHttpRequest();
      request.open('GET', url);
      request.responseType = 'arraybuffer';
      request.onload = () => {
        if (request.status === 200) {
          fulfilled(request);
        } else {
          rejected(new Error(request));
        }
      };
      request.onerror = () => {
        rejected(new Error(request));
      };
      request.send();
    });
  }

  loadAudio('/audio/61322__mansardian__news-end-signature.wav')
    .then((request) => { return context.decodeAudioData(request.response); })
    .then((buffer) => {
      btn.onclick = (ev) => {
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        source.connect(context.destination);
        source.start(0);
      };
    });
});
