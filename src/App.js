import './main.css';
import { useState, useEffect } from "react";

function App() {
  const [url, setUrl] = useState('')
  const [time, setTime] = useState(0)

  useEffect(() => {
    // Get current tab url
    const queryInfo = {active: true, lastFocusedWindow: true};
    // eslint-disable-next-line no-undef
    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
      const url = tabs[0].url;
      setUrl(url);
    });
  }, [])


  chrome.alarms.onAlarm.addListener(function() {
    setTime(time + 1)
  })

  const handleOn = () => {
    function setAlarm() {
      chrome.action.setBadgeText({ text: 'ON' });
      chrome.alarms.create({ delayInMinutes: 1 });
      chrome.storage.sync.set({ minutes: 1 });
      window.close();
    }
    setAlarm()
  }

  const handleOff = () => {

  }
  const clearTime = () => {
    setTime(0)
  }

  return (
    <div className="app">
      Current URL: <p className="get-started">{url}</p>
      <h1>{time}</h1>
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
