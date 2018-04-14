import 'babel-polyfill'

let btn = document.querySelector("button[name=play]");
let context = new window.AudioContext();

let request = new XMLHttpRequest();
request.open('GET', '/audio/61322__mansardian__news-end-signature.wav')
request.responseType = 'arraybuffer';

request.send();
request.onload = function () {
  // 読み込みが終わったら、decodeしてbufferにいれておく
  context.decodeAudioData(request.response, function (buffer) {
    btn.addEventListener('click', function() {
      let source = context.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      source.connect(context.destination);
      source.start(0);
    });
  });
};
