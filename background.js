var tabsTimer = {};
const myAudio = new Audio();
myAudio.src = 'assests/wompwomp.mp3';


chrome.runtime.onInstalled.addListener(() => {
  this.tabsTimer = {};
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

// onHighlighted but not onCreated to make a change to alarm

chrome.tabs.onHighlighted.addListener((highlighted) => {
//   window.alert(highlighted.tabIds);
//   chrome.alarms.clear(`timer${highlighted.tabIds}`);
//   delete tabsTimer[highlighted.tabIds];

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
      myAudio.play();
    }
  });
});
