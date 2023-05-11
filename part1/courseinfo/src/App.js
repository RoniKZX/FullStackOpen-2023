import { useState } from "react";

const Display = ({counter}) => <p>{counter}</p>
const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

function App() {
  const [counter, setCounter] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const resetCounter = () => setCounter(0)

  return (
    <>
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text="Increase" />
      <Button handleClick={decreaseByOne} text="Decrease" />
      <Button handleClick={resetCounter} text="Reset" />
    </>
  );
}

export default App;
