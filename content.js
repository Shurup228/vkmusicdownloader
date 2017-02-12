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
      audio.click(); // Start player, so vk need to get url
      window.ap.setVolume(0); // We will be quiet ;)

      const l = window.ap._currentPlaylist._ref._list.length; // getting length of audios

      // When you fiercely skip songs vk will not load them.
      // So u need to stay on song some time, to get it's url
      // Function below is my way of creating delay

      setTimeout(() => (function getSong(index) {
        if (index >= l) return;

        let title = window.ap._currentAudio[TITLE];
        let author = window.ap._currentAudio[AUTHOR];
        let url = window.ap._currentAudio[URL];

        const D = new CustomEvent('download_music', { detail:
          { author: author, url: url, title: title }, });
        document.dispatchEvent(D); // Passing data to bg.js for downloading

        window.ap.playNext(); // Getting next song

        setTimeout(() => getSong(index + 1), 1000); // Cauzing delay
      })(0), 1000);
    } + ')();';

    document.head.appendChild(injScript); // Injecting script
    injScript.remove();
    console.log('Script injected successfuly...');
  }

  chrome.runtime.onMessage.addListener(function (mes, sen, resp) {
    document.addEventListener('download_music', (e) => chrome.runtime.sendMessage(e.detail));

    const bottom = document.getElementById('ui_audio_load_more');
    bottom.addEventListener('endOfList', () => inject());

    const label = setInterval(() => {
      bottom.scrollIntoView();
      if (bottom.style.display === 'none') {
        clearInterval(label);
        bottom.dispatchEvent(EVENT);
      }
    }, 500);

  });
}
