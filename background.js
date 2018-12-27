let tabsTimer = {};


chrome.runtime.onInstalled.addListener(() => {
  tabsTimer = {};
  chrome.storage.sync.set({ color: '#3aa757' }, () => {
    console.log('The color is what.');
  });
});


chrome.tabs.onCreated.addListener((currTab) => {
  chrome.tabs.query({ currentWindow: true, active: false }, (tabs) => {
    tabs.forEach((tabObj) => {
      if (!tabsTimer[tabObj.id]) {
        chrome.alarms.create(`timer${tabObj.id}`, { delayInMinutes: 1 });
        tabsTimer[tabObj.id] = `timer${tabObj.id}`;
        // window.alert(tabsTimer[tabObj.id]);
      } else {
        // chrome.alarms.clear(`timer${tabObj.id}`);
        // chrome.alarms.create(`timer${tabObj.id}`, { delayInMinutes: 1 });
      }
    });
  });
});


chrome.tabs.onHighlighted.addListener((highlighted) => {
  chrome.alarms.clear(`timer${highlighted.tabIds}`);

  chrome.tabs.query({ currentWindow: true, active: false }, (tabs) => {
    // window.alert(`this current${highlighted.tabIds}`);
    tabs.forEach((tabObj) => {
      if (!tabsTimer[tabObj.id]) {
        chrome.alarms.create(`timer${tabObj.id}`, { delayInMinutes: 1 });
        tabsTimer[tabObj.id] = `timer${tabObj.id}`;
      } else {
        // chrome.alarms.clear(`timer${tabObj.id}`);
        // chrome.alarms.create(`timer${tabObj.id}`, { delayInMinutes: 1 });
      }
    });
  });
});

chrome.alarms.onAlarm.addListener((alarmDone) => {
//   window.alert(`alarmDone name: ${alarmDone.name}`);
  Object.entries(tabsTimer).forEach((tabEntry) => {
    if (tabEntry[1] === alarmDone.name) {
    //   window.alert(`tab id: ${typeof tabEntry[0]}`);
      chrome.tabs.remove(parseInt(tabEntry[0], 10));
      delete tabsTimer[tabEntry[0]];
    }
  });
});
