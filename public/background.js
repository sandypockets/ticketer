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
    switch (message.payload) {
      case 'timerOn':
        chrome.storage.local.get(['minutes'], function(result) {
          chrome.storage.local.set({
            minutes: result.minutes ? result.minutes : 0
          });
        })
        chrome.alarms.create({ delayInMinutes: 1, periodInMinutes: 1 });
        chrome.action.setBadgeText({ text: 'ON' });
        break;
      case 'timerOff':
        chrome.alarms.clearAll();
        chrome.storage.local.set({ minutes: 0 });
        chrome.action.setBadgeText({ text: '' });
        break;
      case 'timerPause':
        chrome.alarms.clearAll();
        chrome.action.setBadgeText({ text: 'HOLD' });
        break;
      case 'timerReset':
        chrome.alarms.clearAll();
        chrome.storage.local.set({ minutes: 0 });
        chrome.alarms.create({ delayInMinutes: 1, periodInMinutes: 1 });
        chrome.action.setBadgeText({ text: 'ON' });
        break;
      default: console.log('Message Error: No case found.')
    }
  } else if (message.id === 'tabs') {
    chrome.storage.local.get(['urls'], function(result) {
      const storedUrls = result.urls[message.groupId].urls
      const isPinnedSelector = `${message.groupId}IsPinned`
      const isPinned = result.urls[message.groupId][isPinnedSelector]
      const urlsArray = Object.entries(storedUrls)
      for (let item in urlsArray) {
        chrome.tabs.create({ url: urlsArray[item][1], pinned: isPinned })
      }
    })
  } else if (message.id === 'setUrls') {
    chrome.storage.local.set({
      urls: message.payload
    });
  } else {
    console.log("400 - Incorrect message.id")
  }
})

