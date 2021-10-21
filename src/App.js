import './main.css';
import { useState, useEffect } from "react";

function App() {
  const [url, setUrl] = useState('')
  const [time, setTime] = useState()

  useEffect(() => {
    // Get current tab url
    const queryInfo = {active: true, lastFocusedWindow: true};
    // eslint-disable-next-line no-undef
    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
      const url = tabs[0].url;
      setUrl(url);
    });

    chrome.storage.local.get(['minutes'], function(result) {
      console.log("RESULT", result)
      setTime(result.minutes)
    })
  }, [])


  chrome.alarms.onAlarm.addListener(function() {
    setTime(time + 1);
    chrome.storage.local.set({ minutes: time + 1 });
  })

  const handleOn = () => {
    function setAlarm() {
      chrome.action.setBadgeText({ text: 'ON' });
      chrome.alarms.create({ delayInMinutes: 1, periodInMinutes: 1 });
      chrome.storage.local.set({ minutes: time });
      window.close();
    }
    setAlarm()
  }

  const handleOff = () => {
    function clearAlarm() {
      chrome.action.setBadgeText({ text: '' });
      chrome.alarms.clearAll();
      window.close();
    }
    clearAlarm()
  }
  const clearTime = () => {
    setTime(0)
    chrome.storage.local.set({ minutes: time });
  }

  return (
    <div className="app">
      Current URL: <p className="get-started">{url}</p>
      <h1>Elapsed time</h1>
      <h2>{time ? time : 0} minutes</h2>
      <button onClick={handleOn}>
        Turn on
      </button>
      <button onClick={handleOff}>
        Turn off
      </button>
      <button onClick={clearTime}>
        Clear
      </button>
    </div>
  );
}

export default App;
