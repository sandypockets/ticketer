chrome.alarms.onAlarm.addListener(function() {
  let storedTime;
  chrome.storage.local.get(['minutes'], function(result) {
    storedTime = result.minutes
    storedTime += 1;
    chrome.storage.local.set({ minutes: storedTime });
  })
})

chrome.runtime.onMessage.addListener(function(message) {
  if (message.id === 'timer') {
    if (message.payload === 'timerOn') {
      chrome.storage.local.get(['minutes'], function(result) {
        chrome.storage.local.set({
          minutes: result.minutes ? result.minutes : 0
        });
      })
      chrome.alarms.create({ delayInMinutes: 1, periodInMinutes: 1 });
      chrome.action.setBadgeText({ text: 'ON' });
    }
    if (message.payload === 'timerOff') {
      chrome.action.setBadgeText({ text: '' });
      chrome.alarms.clearAll();
      chrome.storage.local.set({ minutes: 0 });
    }
    if (message.payload === 'timerPause') {
      chrome.action.setBadgeText({ text: '!' });
      chrome.alarms.clearAll();
    }
    if (message.payload === 'timerReset') {
      chrome.alarms.clearAll();
      chrome.storage.local.set({ minutes: 0 });
      chrome.alarms.create({ delayInMinutes: 1, periodInMinutes: 1 });
      chrome.action.setBadgeText({ text: 'ON' });
    }
  }
  if (message.id === 'tabs') {
    chrome.storage.local.get(['urls'], function(result) {
      const storedUrls = result.urls[message.groupId].urls
      const isPinnedSelector = `${message.groupId}IsPinned`
      const isPinned = result.urls[message.groupId][isPinnedSelector]
      const urlsArray = Object.entries(storedUrls)
      for (let item in urlsArray) {
        chrome.tabs.create({ url: urlsArray[item][1], pinned: isPinned })
      }
    })
  }
  if (message.id === 'setUrls') {
      chrome.storage.local.set({
        urls: message.payload
      });
  }
})

