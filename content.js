'use strict'

chrome.runtime.onMessage.addListener(function (mes, sen, resp) {
  if (mes.clicked === 'cfButton') {
    // Choose folder stuff
    console.log('cfButton');
  } else {
    // Download stuff
    console.log('dButton');
  }
});
