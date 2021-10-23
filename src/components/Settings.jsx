import { useState, useEffect } from "react";

export default function Settings({ setPage }) {
  const [state, setState] = useState({
    urlOne: '',
    urlTwo: '',
    urlThree: '',
    urlFour: '',
    urlFive: '',
    urlSix: '',
    urlSeven: '',
    urlEight: '',
    urlNine: '',
  })

  useEffect(() => {
    chrome.storage.local.get(['urls'], function(result) {
      chrome.runtime.sendMessage(result) // Debugging
      for (let url in result.urls.groupOne) {
        setState(prev => ({ ...prev, [url]: result.urls.groupOne[url] }))
      }
      for (let url in result.urls.groupTwo) {
        setState(prev => ({ ...prev, [url]: result.urls.groupTwo[url] }))
      }
      chrome.runtime.sendMessage(state) // Debugging
    })
  }, [])

  const handleSubmit = () => {
    chrome.runtime.sendMessage({
      id: "setUrls",
      payload: {
        groupOne: {
          urlOne: state.urlOne,
          urlTwo: state.urlTwo,
          urlThree: state.urlThree,
        },
        groupTwo: {
          urlFour: state.urlFour,
          urlFive: state.urlFive,
          urlSix: state.urlSix
        },
        groupThree: {
          urlFour: state.urlSeven,
          urlFive: state.urlEight,
          urlSix: state.urlNine
        }
      }
    });
  }

  const formGroups = {
    groupOne: [
      {
        "label": "URL",
        "placeholder": state.urlOne,
        "onChangeFunction": (event) => setState(prev => ({ ...prev, urlOne: event.target.value }))
      },
      {
        "label": "URL",
        "placeholder": state.urlTwo,
        "onChangeFunction": (event) => setState(prev => ({ ...prev, urlTwo: event.target.value }))
      },
      {
        "label": "URL",
        "placeholder": state.urlThree,
        "onChangeFunction": (event) => setState(prev => ({ ...prev, urlThree: event.target.value }))
      }
    ],
    groupTwo: [
      {
        "label": "URL",
        "placeholder": state.urlFour,
        "onChangeFunction": (event) => setState(prev => ({ ...prev, urlFour: event.target.value }))
      },
      {
        "label": "URL",
        "placeholder": state.urlFive,
        "onChangeFunction": (event) => setState(prev => ({ ...prev, urlFive: event.target.value }))
      },
      {
        "label": "URL",
        "placeholder": state.urlSix,
        "onChangeFunction": (event) => setState(prev => ({ ...prev, urlSix: event.target.value }))
      }
    ],
    groupThree: [
      {
        "label": "URL",
        "placeholder": state.urlSeven,
        "onChangeFunction": (event) => setState(prev => ({ ...prev, urlSeven: event.target.value }))
      },
      {
        "label": "URL",
        "placeholder": state.urlEight,
        "onChangeFunction": (event) => setState(prev => ({ ...prev, urlEight: event.target.value }))
      },
      {
        "label": "URL",
        "placeholder": state.urlNine,
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
                <input value={item.placeholder} onChange={item.onChangeFunction} />
              </div>
            ))}
          </div>

          <div className="urlForms card">
            <h3 className="linkGroupTitle cardTitle">Link group 2</h3>
            {formGroups.groupTwo.map((item, index) => (
              <div key={index} className="urlForm">
                <label className="urlLabel">{item.label}</label>
                <input value={item.placeholder} onChange={item.onChangeFunction} />
              </div>
            ))}
          </div>

          <div className="urlForms card">
            <h3 className="linkGroupTitle cardTitle">Link group 2</h3>
            {formGroups.groupThree.map((item, index) => (
              <div key={index} className="urlForm">
                <label className="urlLabel">{item.label}</label>
                <input value={item.placeholder} onChange={item.onChangeFunction} />
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