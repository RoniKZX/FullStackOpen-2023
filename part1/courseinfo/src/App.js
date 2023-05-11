import { useState } from "react";

// const Display = ({ counter }) => <p>{counter}</p>
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

function History({ allClicks }) {
  if (allClicks.length === 0) {
    return (<p>The app is used by pressing the buttons.</p>)
  }
  return (<p>Button press history: [{allClicks.join(' ')}]</p>)
}

function App() {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0
  })
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = clicks.left + 1
    setClicks({ ...clicks, left: updatedLeft })
    setTotal(updatedLeft + clicks.right)
  }
  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = clicks.right + 1
    setClicks({ ...clicks, right: updatedRight })
    setTotal(clicks.left + updatedRight)
  }

  return (
    <>
      {clicks.left}
      <Button handleClick={handleLeftClick} text="Left" />
      <Button handleClick={handleRightClick} text="Right" />
      {clicks.right}

      <History allClicks={allClicks} />
      <p>Total clicks: {total}</p>
    </>
  );
}

export default App;
