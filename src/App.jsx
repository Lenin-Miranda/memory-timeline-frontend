import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Hero from "./components/hero/Hero";
import Plans from "./components/Plans/Plans";
import About from "./pages/About/About";
import Dashboard from "./pages/Dashboard/Dashboard";
import Steps from "./components/Steps/Steps";
import Footer from "./components/Footer/Footer";
import { TimelineProvider } from "./contexts/TimelineContext";
import "./App.css";

function App() {
  return (
    <TimelineProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Plans />
                <Steps />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TimelineProvider>
  );
}

export default App;
