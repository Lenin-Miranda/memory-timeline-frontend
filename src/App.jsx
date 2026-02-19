import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import NavBar from "./components/NavBar/NavBar";
import Hero from "./components/hero/Hero";
import CardAnimation from "./components/CardAnimation/CardAnimation";
import "./App.css";
import Plans from "./components/Plans/Plans";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <Hero />
      <Plans />
    </>
  );
}

export default App;
