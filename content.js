'use strict'

function scrollBottom() {
  let getLen = () => {
    const a = document.querySelectorAll('div.audio_row');
    return a.length;
  };

  let audios = document.querySelectorAll('div.audio_row');
  let lastL = audios.length;
  let newL = 0;
  const bot = document.getElementById('ui_audio_load_more');

  while (newL !== lastL) {
    lastL = getLen();
    bot.scrollIntoView();
    newL = getLen();
  }
}

chrome.runtime.onMessage.addListener(function (mes, sen, resp) {
  console.log('lol');
  scrollBottom();
});
