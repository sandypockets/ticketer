import TicketCounter from "./TicketCounter";
import FastTabs from "./FastTabs";
import Timer from "./Timer";

export default function Home({ state, setPage }) {
  return (
    <div className="container">
      <div>
        <h1 className="title">Ticketer</h1>
        <Timer />
        <TicketCounter />
        <FastTabs state={state} />
        </div>
      <div>
        <a onClick={() => setPage('settings')}>Settings</a>
      </div>
    </div>
  )
}