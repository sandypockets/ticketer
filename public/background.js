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
      chrome.storage.local.get(['urls'], function(result) {
        console.log("EVENT!--storage.local.RESULT: ", result)
        const storedUrls = result.urls.groupOne.urls;
        const isPinned = result.urls.groupOne.groupOneIsPinned
        console.log("STORED URLS: ", storedUrls)
        const urlsArr = Object.entries(storedUrls)
        for (let arr in urlsArr) {
          console.log("urlsArr[arr]!!!!!!", arr)
          chrome.tabs.create({ url: urlsArr[arr][1], pinned: isPinned })
        }
      })
    }
    if (message.payload === 'openTabGroupTwo') {
      chrome.storage.local.get(['urls'], function(result) {
        const storedUrls = result.urls.groupTwo.urls;
        const isPinned = result.urls.groupTwo.groupTwoIsPinned
        console.log("EVENT!--storedUrls: ", storedUrls)
        const urlsArr = Object.entries(storedUrls)
        for (let arr in urlsArr) {
          chrome.tabs.create({ url: urlsArr[arr][1], pinned: isPinned })
        }
      })
    }
    if (message.payload === 'openTabGroupThree') {
      chrome.storage.local.get(['urls'], function(result) {
        console.log("GroupThree RESULT", result)
        const storedUrls = result.urls.groupThree.urls;
        const isPinned = result.urls.groupThree.groupThreeIsPinned
        console.log("EVENT!--storedUrls: ", storedUrls)
        const urlsArr = Object.entries(storedUrls)
        for (let arr in urlsArr) {
          chrome.tabs.create({ url: urlsArr[arr][1], pinned: isPinned })
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

