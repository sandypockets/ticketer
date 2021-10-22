import { useState, useEffect } from "react";

export default function Settings({ setPage }) {
  const [state, setState] = useState({
    urlOne: '',
    urlTwo: '',
    urlThree: '',
    urlFour: '',
    urlFive: '',
    UrlSix: ''
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
        groupOne: {
          urlOne: state.urlOne,
          urlTwo: state.urlTwo,
          urlThree: state.urlThree,
        },
        groupTwo: {
          urlFour: state.urlFour,
          urlFive: state.urlFive,
          urlSix: state.urlSix
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
    ]
  }



  return (
    <>
      <div className="container">
        <div>
          <h1>Settings</h1>

          <div className="urlForms">
            <h3>Link group 1</h3>
            {formGroups.groupOne.map((item, index) => (
              <div className="urlForm">
                <label className="urlLabel">{item.label}</label>
                <input placeholder={item.placeholder} onChange={item.onChangeFunction} />
              </div>
            ))}
          </div>

          <div className="urlForms">
            <h3>Link group 2</h3>
            {formGroups.groupTwo.map((item, index) => (
              <div className="urlForm">
                <label className="urlLabel">{item.label}</label>
                <input placeholder={item.placeholder} onChange={item.onChangeFunction} />
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