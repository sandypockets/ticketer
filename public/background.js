let storedTime;

chrome.storage.local.get(['minutes'], function(result) {
  console.log("storage.local.minutes: ", result)
  storedTime = result.minutes
})

chrome.alarms.onAlarm.addListener(function() {
  storedTime += 1;
  chrome.storage.local.set({ minutes: storedTime });
})


chrome.storage.local.get(['tickets'], function(result) {
  console.log("storage.local.tickets: ", result.tickets)
})

chrome.storage.onChanged.addListener(function() {
  chrome.storage.local.get(['tickets'], function(result) {
    console.log("EVENT!--storage.local.tickets: ", result)
  })
  chrome.storage.local.get(['urls'], function(result) {
    console.log("LINE 25 storage.local.urls: ", result)
  })
  chrome.storage.local.get()
  chrome.storage.local.get(['minutes'], function(result) {
    console.log("Line 28 - MIUNTES: ", result)
  })
})

chrome.storage.local.get(function(result) {
  console.log("EVENT!--storage.local: ", result)
})


chrome.runtime.onMessage.addListener(function(message) {
  if (message.id === 'tabs') {
    if (message.payload === 'openTabGroupOne') {
      let storedUrls;
      chrome.storage.local.get(['urls'], function(result) {
        console.log("EVENT!--storage.local.RESULT: ", result)
        storedUrls = result.urls.groupOne.urls;
        console.log("STORED URLS: ", storedUrls)
        const isPinned = message.isPinned;
        const urlsArr = Object.entries(storedUrls)
        for (let arr in urlsArr) {
          console.log("urlsArr[arr]!!!!!!", arr)
          chrome.tabs.create({ url: urlsArr[arr][1], pinned: isPinned })
        }
      })
    }
    if (message.payload === 'openTabGroupTwo') {
      let storedUrls;
      chrome.storage.local.get(['urls'], function(result) {
        console.log("EVENT!--storage.local.RESULT: ", result.urls)
        storedUrls = result.urls.groupTwo;
        const urlsArr = Object.entries(storedUrls)
        for (let arr in urlsArr) {
          chrome.tabs.create({ url: urlsArr[arr][1], pinned: message.groupTwoIsPinned })
        }
      })
    }
    if (message.payload === 'openTabGroupThree') {
      let storedUrls;
      chrome.storage.local.get(['urls'], function(result) {
        console.log("EVENT!--storage.local.RESULT: ", result.urls)
        storedUrls = result.urls.groupThree;
        const urlsArr = Object.entries(storedUrls)
        for (let arr in urlsArr) {
          chrome.tabs.create({ url: urlsArr[arr][1], pinned: message.groupThreeIsPinned })
        }
      })
    }
  }

  if (message.id === 'setUrls') {
    console.log(message.payload)
      chrome.storage.local.set({
        urls: message.payload
      });
  }

  if (message.id === 'debug') {
    console.log("DEBUG: ", message.payload)
  }

  console.log(message) // Debugging
})

