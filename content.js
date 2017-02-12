'use strict'

{
  const EVENT = new Event('endOfList');

  function inject() {
    console.log('Injecting script...');

    const injScript = document.createElement('script');

    injScript.textContent = '(' + function () {
      const URL = 2; // Some constants
      const TITLE = 3; // Offset of values in array
      const AUTHOR = 4;

      const audio = document.querySelector('div.audio_row');
      audio.click(); // Forcing vk to get url
      window.ap.setVolume(0);

      const l = window.ap._currentPlaylist._ref._list.length; // getting length of audios

      for (let i = 0; i < l; i++) {
        const title = window.ap._currentAudio[TITLE];
        const author = window.ap._currentAudio[AUTHOR];
        const url = window.ap._currentAudio[URL];

        const D = new CustomEvent('download_music', { detail:
          { author: author, url: url, title: title }, });
        document.dispatchEvent(D);
      }
    } + ')();';

    document.head.appendChild(injScript); // Injecting script
    injScript.remove();
    console.log('Script injected successfuly...');
  }

  chrome.runtime.onMessage.addListener(function (mes, sen, resp) {
    console.log('mda');
    document.addEventListener('download_music', (e) => chrome.runtime.sendMessage(e.detail));

    const bottom = document.getElementById('ui_audio_load_more');

    bottom.addEventListener('endOfList', () => inject());
    bottom.dispatchEvent(EVENT);

    // const label = setInterval(() => {
    //   bottom.scrollIntoView();
    //   if (bottom.style.display === 'none') {
    //     clearInterval(label);
    //     bottom.dispatchEvent(EVENT);
    //   }
    // }, 500);

  });
}
