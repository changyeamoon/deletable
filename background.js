chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: '#3aa757' }, () => {
    console.log('The color is green.');
  });
});


chrome.tabs.onCreated.addListener(() => {
  chrome.tabs.query({ currentWindow: true, active: false }, (tabs) => {
    tabs.forEach((tabObj) => {
      chrome.tabs.remove(tabObj.id);
    });
  });


  chrome.alarms.create('timer', { delayinMinutes: 1 });
  window.alert('alarm called');
  //   chrome.alarms.onAlarm.addListener((alarm) => {

//   });
});
