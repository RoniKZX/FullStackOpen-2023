import { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const resetCounter = () => setCounter(0)

  return (
    <>
      {counter}
      <button onClick={increaseByOne}>Increment</button>
      <button onClick={resetCounter}>Reset to zero</button>
    </>
  );
}

export default App;
