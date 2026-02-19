import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import NavBar from "./components/NavBar/NavBar";
import Hero from "./components/hero/Hero";
import CardAnimation from "./components/CardAnimation/CardAnimation";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <Hero />
    </>
  );
}

export default App;
