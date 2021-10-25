// Timer
let storedTime;
chrome.storage.local.get(['minutes'], function(result) {
  storedTime = result.minutes
})
chrome.alarms.onAlarm.addListener(function() {
  storedTime += 1;
  chrome.storage.local.set({ minutes: storedTime });
})

// Tabs
chrome.runtime.onMessage.addListener(function(message) {
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
  // Debugging
  if (message.id === 'debug') {
    console.log("Debug--Full message: ")
    console.log("Debug--Payload: ", message.payload)
    chrome.storage.local.get(['tickets'], function(result) {
      console.log("Debug--Tickets: ", result.tickets)
    })
    chrome.storage.local.get(['minutes'], function(result) {
      console.log("Debug--Minutes: ", result.minutes)
    })
    chrome.storage.local.get(['urls'], function(result) {
      console.log("Debug--Urls: ", result.urls)
    })
  }
})

