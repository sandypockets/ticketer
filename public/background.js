let storedTime;

chrome.storage.local.get(['minutes'], function(result) {
  console.log("RESULT", result)
  storedTime = result.minutes
})

chrome.alarms.onAlarm.addListener(function() {
  storedTime += 1;
  chrome.storage.local.set({ minutes: storedTime });
})