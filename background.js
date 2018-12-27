chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: '#3aa757' }, () => {
    console.log('The color is green.');
  });
});


chrome.tabs.onCreated.addListener(() => {
  chrome.alarms.create('timer', { delayInMinutes: 1 });


  //   chrome.tabs.query({ currentWindow: true, active: false }, (tabs) => {
  //     tabs.forEach((tabObj) => {
  //       chrome.tabs.remove(tabObj.id);
  //     });
  //   });
});

chrome.alarms.onAlarm.addListener(() => {
  chrome.tabs.query({ currentWindow: true, active: false }, (tabs) => {
    tabs.forEach((tabObj) => {
      chrome.tabs.remove(tabObj.id);
    });
  });
});
