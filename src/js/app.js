'use strict';
import 'babel-polyfill'

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector("button[name=play]");
  const context = new window.AudioContext();

  fetch('/audio/61322__mansardian__news-end-signature.wav')
    .then((response) => { return response.arrayBuffer(); })
    .then((buffer) => { return context.decodeAudioData(buffer); })
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
