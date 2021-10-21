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
    console.log("EVENT!--storage.local.tickets: ", result.tickets)
  })

  chrome.storage.local.get(['urlOne'], function(result) {
    console.log("EVENT!--storage.local.urlOne: ", result.urlOne)
  })
})


chrome.runtime.onMessage.addListener(function(message) {
  if (message === 'openTabGroupOne') {
    const urls = ["https://google.com", "https://sandypockets.dev"]
    for (let url of urls) {
      chrome.tabs.create({ url: url })
    }
  }
  if (message.id === 'setUrls') {
    console.log(message.payload)
    for (let url in message.payload) {
      console.log("URL PAYLOAD: ", url, message.payload[url])
      chrome.storage.local.set({ [message.payload.url]: message.payload[url] });
    }
  }
})

