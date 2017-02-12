'use strict'

{
  const D = new Event('download_started'); // To start filling buffer and queue
  const QUEUE = []; // Queue of items to download
  let BUFFER = []; // Current downloading items
  let FILES = listDirectory(); // Array of downloaded songs

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
    if (FILES.includes(mes.author + ' - ' + mes.title)) return; // If song already downloaded
    QUEUE.push(item);
    doc.dispatchEvent(D); // Starting to monitor queue and buffer
  });

  doc.addEventListener('download_started', function () {
    const ID = setInterval(function () {
      console.log(`queue: ${QUEUE}\nbuffer: ${BUFFER}`);
      BUFFER = BUFFER.filter((el, i, arr) => el.state != 'complete'); // Clear from downloaded

      if (BUFFER.length < 10) {
        let curItem = QUEUE.pop();
        chrome.downloads.download(
          { url: curItem.url, filename: curItem.author + ' - ' + curItem.title },
          (el) => BUFFER.push(el));
      }

      if ((!QUEUE.length) && (!BUFFER.length)) clearInterval(ID);
    }, 1000);
  });

  function listDirectory() {}
}
