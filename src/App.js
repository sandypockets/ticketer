import './main.css';
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Settings from "./components/Settings";

function App() {
  const [page, setPage] = useState('home')
  const [state, setState] = useState({
    urlOne: '',
    urlTwo: '',
    urlThree: '',
    groupOneIsPinned: false,
    urlFour: '',
    urlFive: '',
    urlSix: '',
    groupTwoIsPinned: false,
    urlSeven: '',
    urlEight: '',
    urlNine: '',
    groupThreeIsPinned: false
  })

  return (
    <div className="app">
      {page === 'home' &&
        <Home
          state={state}
          setPage={setPage}
        />
      }
      {page === 'settings' &&
        <Settings
          state={state}
          setState={setState}
          setPage={setPage}
        />
      }
    </div>
  );
}

export default App;
