chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: '#3aa757' }, () => {
    console.log('The color is green.');
  });
});


chrome.tabs.onCreated.addListener(() => {
  // create unique timers per each new tab opened
  chrome.alarms.create('timer', { delayInMinutes: 1 });
});

// onHighlighted but not onCreated to make a change to alarm

// chrome.tabs.onHighlighted.addListener((highlighted) => {
//   chrome.alarms.get('timer', (alarm) => {window.alert(alarm.name)});
//   if a unique tab has been accessed, reset its timer
//   chrome.alarms.clear('timer');
// })

chrome.alarms.onAlarm.addListener(() => {
  chrome.tabs.query({ currentWindow: true, active: false }, (tabs) => {
    tabs.forEach((tabObj) => {
      chrome.tabs.remove(tabObj.id);
    });
  });
});
