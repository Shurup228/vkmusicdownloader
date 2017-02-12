'use strict'

function scrollBottom() {
  const bottom = document.getElementById('ui_audio_load_more');
  var disp = bottom.style.display;
  while (disp !== 'none') {
    bottom.scrollIntoView();
    console.log(`display: ${bottom.style.display}`);
    disp = bottom.style.display;
  }
}

chrome.runtime.onMessage.addListener(function (mes, sen, resp) {
  console.log('lol');
  scrollBottom();
});
