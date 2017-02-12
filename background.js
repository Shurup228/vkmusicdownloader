'use strict'

{
  const popup = chrome.extension.getViews({ type: 'popup' })[0];
  const doc = popup.document;

  const cont = doc.getElementById('download');

  cont.addEventListener('mouseover', function () {
    const img = cont.querySelector('img');
    img.setAttribute('src', 'button_white.png');
  });

  cont.addEventListener('mouseleave', function () {
    const img = cont.querySelector('img');
    img.setAttribute('src', 'button.png');
  });

  cont.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const t = tabs[0];
      if (!t.url.startsWith('https://vk.com/audio')) alert('This is not vk[audio] page!');
      chrome.tabs.sendMessage(t.id, { clicked: 'downloadButton' }, function (response) {});
    });
  });

  chrome.runtime.onMessage.addListener(function (mes, sen, resp) {
    console.log(mes);
  });
}
