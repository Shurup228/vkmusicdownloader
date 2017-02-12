'use strict'

{
  var EVENT = new Event('endOfList');

  function inject() {
    console.log('Injecting script...');

    const injScript = document.createElement('script');

    injScript.textContent = '(' + function () {
      const audios = document.querySelectorAll('div.audio_row');
      audios[0].click();
      console.log(window.ap);
    } + ')();';

    document.head.appendChild(injScript); // Injecting script
    injScript.remove();
    console.log('Script injected successfuly...');
  }

  chrome.runtime.onMessage.addListener(function (mes, sen, resp) {
    const bottom = document.getElementById('ui_audio_load_more');
    bottom.addEventListener('endOfList', () => inject());
    bottom.dispatchEvent(EVENT);

  //   const label = setInterval(() => {
  //     bottom.scrollIntoView();
  //     if (bottom.style.display === 'none') {
  //       clearInterval(label);
  //       bottom.dispatchEvent(EVENT);
  //     }
  //   }, 500);
  });
}
