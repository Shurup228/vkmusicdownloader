'use strict'

{
  function listDirectory() {
    var url = 'file:///';
    chrome.fileSystem.chooseEntry({ options: 'openDirectory' },  (entry) => console.log(entry));
  }

  const QUEUE = [];
  let BUFFER = [];

  const popup = chrome.extension.getViews({ type: 'popup' })[0];
  const doc = popup.document;

  const cont = doc.getElementById('download');

  cont.addEventListener('mouseover', function () {
    const img = cont.querySelector('img');
    img.setAttribute('src', 'button_white.png');
    listDirectory();
  });

  cont.addEventListener('mouseleave', function () {
    const img = cont.querySelector('img');
    img.setAttribute('src', 'button.png');
  });

  cont.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const t = tabs[0];
      if (!t.url.startsWith('https://vk.com/audio')) alert('This is not vk[audio] page!');
      chrome.tabs.sendMessage(t.id, { clicked: 'downloadButton' });
    });
  });

  chrome.runtime.onMessage.addListener(function (mes, sen, resp) {
    chrome.downloads.download({ url: mes.url, filename: mes.author + ' - ' + mes.title },
    (item) => QUEUE.push(item));
  });

  while (true) {
    console.log(`queue: ${QUEUE}\nbuffer: ${BUFFER}`);
    BUFFER = BUFFER.filter((el, i, arr) => el.state != 'complete');
    if (BUFFER.length < 10) BUFFER.push(QUEUE.pop());
    if ((!QUEUE.length) && (!BUFFER.length)) break;
  }
}
