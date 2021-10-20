import './main.css';
import { useState, useEffect } from "react";

function App() {
  const [url, setUrl] = useState('')

  useEffect(() => {
    // Get current tab url
    const queryInfo = {active: true, lastFocusedWindow: true};
    // eslint-disable-next-line no-undef
    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
      const url = tabs[0].url;
      setUrl(url);
    });
  }, [])

  return (
    <div className="app">
      Current URL: <p className="get-started">{url}</p>
    </div>
  );
}

export default App;
