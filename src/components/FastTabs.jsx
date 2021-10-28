export default function FastTabs({ state }) {
  const openTabGroupOne = () => {
    chrome.runtime.sendMessage({
      id: 'tabs',
      groupId: "groupOne",
      isPinned: state.groupOneIsPinned
    });
  }
  const openTabGroupTwo = () => {
    chrome.runtime.sendMessage({
      id: 'tabs',
      groupId: "groupTwo",
      isPinned: state.groupTwoIsPinned
    });
  }
  const openTabGroupThree = () => {
    chrome.runtime.sendMessage({
      id: 'tabs',
      groupId: "groupThree",
      isPinned: state.groupThreeIsPinned
    });
  }

  return (
    <div className="card card-padding-increase">
      <div className="flex-center">
        <h3 className="cardTitle">Fast Tabs</h3>
      </div>
      <p className="flex-center info">Open three links at once.</p>
      <div className="buttonGroup">
        <div>
          <button onClick={openTabGroupOne}>
            Group 1
          </button>
          <button onClick={openTabGroupTwo}>
            Group 2
          </button>
          <button onClick={openTabGroupThree}>
            Group 3
          </button>
        </div>
      </div>
    </div>
  )
}