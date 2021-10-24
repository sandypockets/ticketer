import { useState, useEffect } from "react";

export default function Settings({ setPage, state, setState }) {

  useEffect(() => {
    chrome.storage.local.get(['urls'], function(result) {
      chrome.runtime.sendMessage(result) // Debugging
      for (let url in result.urls.groupOne.urls) {
        setState(prev => ({ ...prev, [url]: result.urls.groupOne.urls[url] }))
      }
      setState(prev => ({ ...prev, groupOneIsPinned: result.urls.groupOne.groupOneIsPinned }))
      for (let url in result.urls.groupTwo) {
        setState(prev => ({ ...prev, [url]: result.urls.groupTwo[url] }))
      }
      for (let url in result.urls.groupThree) {
        setState(prev => ({ ...prev, [url]: result.urls.groupThree[url] }))
      }
    })
  }, [])

  const handleSubmit = () => {
    chrome.runtime.sendMessage({
      id: "setUrls",
      payload: {
        groupOne: {
          urls: {
            urlOne: state.urlOne,
            urlTwo: state.urlTwo,
            urlThree: state.urlThree,
          },
          // urlOne: state.urlOne,
          // urlTwo: state.urlTwo,
          // urlThree: state.urlThree,
          groupOneIsPinned: state.groupOneIsPinned
        },
        groupTwo: {
          urlFour: state.urlFour,
          urlFive: state.urlFive,
          urlSix: state.urlSix,
          groupTwoIsPinned: state.groupTwoIsPinned
        },
        groupThree: {
          urlSeven: state.urlSeven,
          urlEight: state.urlEight,
          urlNine: state.urlNine,
          groupTwoIsPinned: state.groupTwoIsPinned
        }
      }
    });
  }

  const formGroups = {
    groupOne: [
      {
        "label": "URL",
        "type": "text",
        "value": state.urlOne,
        "onChangeFunction": (event) => setState(prev => ({ ...prev, urlOne: event.target.value }))
      },
      {
        "label": "URL",
        "type": "text",
        "value": state.urlTwo,
        "onChangeFunction": (event) => setState(prev => ({ ...prev, urlTwo: event.target.value }))
      },
      {
        "label": "URL",
        "type": "text",
        "value": state.urlThree,
        "onChangeFunction": (event) => setState(prev => ({ ...prev, urlThree: event.target.value }))
      },
      {
        "label": "Pin tabs on open",
        "type": "checkbox",
        "id": "pinnedOnOpen",
        "onChangeFunction":  (event) => {
          setState(prev => ({...prev, groupOneIsPinned: !state.groupOneIsPinned}))
          handleSubmit()
          chrome.runtime.sendMessage({
            id: 'debug',
            payload: state.groupOneIsPinned
          })
        },
        "checked": state.groupOneIsPinned,
        "value": state.groupOneIsPinned
      }
    ],
    groupTwo: [
      {
        "label": "URL",
        "value": state.urlFour,
        "onChangeFunction": (event) => setState(prev => ({ ...prev, urlFour: event.target.value }))
      },
      {
        "label": "URL",
        "value": state.urlFive,
        "onChangeFunction": (event) => setState(prev => ({ ...prev, urlFive: event.target.value }))
      },
      {
        "label": "URL",
        "value": state.urlSix,
        "onChangeFunction": (event) => setState(prev => ({ ...prev, urlSix: event.target.value }))
      }
    ],
    groupThree: [
      {
        "label": "URL",
        "value": state.urlSeven,
        "onChangeFunction": (event) => setState(prev => ({ ...prev, urlSeven: event.target.value }))
      },
      {
        "label": "URL",
        "value": state.urlEight,
        "onChangeFunction": (event) => setState(prev => ({ ...prev, urlEight: event.target.value }))
      },
      {
        "label": "URL",
        "value": state.urlNine,
        "onChangeFunction": (event) => setState(prev => ({ ...prev, urlNine: event.target.value }))
      }
    ]
  }



  return (
    <>
      <div className="container">
        <div>
          <h1 className="title">Settings</h1>

          <div className="urlForms card">
            <h3 className="linkGroupTitle cardTitle">Link group 1</h3>
            {formGroups.groupOne.map((item, index) => (
              <div key={index} className="urlForm">
                <label className="urlLabel">{item.label}</label>
                <input type={item.type} value={item.value} checked={item.checked} onChange={item.onChangeFunction} />
              </div>
            ))}
          </div>

          <div className="urlForms card">
            <h3 className="linkGroupTitle cardTitle">Link group 2</h3>
            {formGroups.groupTwo.map((item, index) => (
              <div key={index} className="urlForm">
                <label className="urlLabel">{item.label}</label>
                <input value={item.value} onChange={item.onChangeFunction} />
              </div>
            ))}
          </div>

          <div className="urlForms card">
            <h3 className="linkGroupTitle cardTitle">Link group 3</h3>
            {formGroups.groupThree.map((item, index) => (
              <div key={index} className="urlForm">
                <label className="urlLabel">{item.label}</label>
                <input value={item.value} onChange={item.onChangeFunction} />
              </div>
            ))}
          </div>

          <button className="saveUrls" onClick={handleSubmit}>Update URLs</button>
        </div>
        <a onClick={() => setPage('home')}>Back</a>
      </div>
    </>
  )
}