import { useState, useEffect } from "react";

export default function Settings({ setPage }) {
  const [state, setState] = useState({
    urlOne: '',
    urlTwo: '',
    urlThree: ''
  })

  useEffect(() => {
    chrome.storage.local.get(['urlOne'], function(result) {
      console.log("storage.local.urlOne: ", result)
      // setUrlOne(result.urlOne)
      setState(prev => ({ ...prev, urlOne: result.urlOne }))
    })

    chrome.storage.local.get(['urlTwo'], function(result) {
      console.log("storage.local.urlTwo: ", result)
      // setUrlTwo(result.urlTwo)
      setState(prev => ({ ...prev, urlTwo: result.urlTwo }))
    })

    chrome.storage.local.get(['urlThree'], function(result) {
      console.log("storage.local.urlThree: ", result)
      // setUrlTwo(result.urlTwo)
      setState(prev => ({ ...prev, urlThree: result.urlThree }))
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

  const getUrls = () => {
    chrome.storage.local.get(['urlOne'], function(result) {
      console.log("storage.local.urlOne: ", result)
      // setUrlOne(result.urlOne)
      setState(prev => ({ ...prev, urlOne: result.urlOne }))
    })

    chrome.storage.local.get(['urlTwo'], function(result) {
      console.log("storage.local.urlTwo: ", result)
      // setUrlTwo(result.urlTwo)
      setState(prev => ({ ...prev, urlTwo: result.urlTwo }))
    })
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
      <button onClick={getUrls}>Get URLs</button>
    </>
  )
}