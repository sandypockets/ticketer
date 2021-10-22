import { useState, useEffect } from "react";

export default function Settings({ setPage }) {
  const [state, setState] = useState({
    urlOne: '',
    urlTwo: '',
    urlThree: ''
  })

  useEffect(() => {
    chrome.storage.local.get(['urls'], function(result) {
      const urlsArr = Object.entries(result.urls)
      for (let url in urlsArr) {
        let stateKey = [urlsArr[url][0]];
        setState(prev => ({ ...prev, [stateKey]: urlsArr[url][1] }))
      }
    })
  }, [])

  const handleSubmit = () => {
    chrome.runtime.sendMessage({
      id: "setUrls",
      payload: {
        urlOne: state.urlOne,
        urlTwo: state.urlTwo,
        urlThree: state.urlThree
      }
    });
  }

  const formGroup = [
    {
      "label": "URL 1",
      "placeholder": state.urlOne,
      "onChangeFunction": (event) => setState(prev => ({ ...prev, urlOne: event.target.value }))
    },
    {
      "label": "URL 2",
      "placeholder": state.urlTwo,
      "onChangeFunction": (event) => setState(prev => ({ ...prev, urlTwo: event.target.value }))
    },
    {
      "label": "URL 3",
      "placeholder": state.urlThree,
      "onChangeFunction": (event) => setState(prev => ({ ...prev, urlThree: event.target.value }))
    },
  ]

  return (
    <>
      <h1>Settings</h1>
      <a onClick={() => setPage('home')}>Back</a>
      {formGroup.map((item, index) => (
        <>
          <label>{item.label}</label>
          <input placeholder={item.placeholder} onChange={item.onChangeFunction} />
        </>
      ))}
      <button onClick={handleSubmit}>Save URLs</button>
    </>
  )
}