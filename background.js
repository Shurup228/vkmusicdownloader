'use strict'

{
  const popup = chrome.extension.getViews({ type: 'popup' })[0];
  const doc = popup.document;

  const dButton = doc.getElementById('download');
  const cfButton = doc.getElementById('setFolder');

  dButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { clicked: 'downloadButton' }, function (response) {});
    });
  });

  cfButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { clicked: 'cfButton' }, function (response) {});
    });

  });
}
