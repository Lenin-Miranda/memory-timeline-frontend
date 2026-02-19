import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { AuthProvider } from "./context/AuthContext";
import { useState } from "react";
import Hero from "./components/hero/Hero";
import Plans from "./components/Plans/Plans";
import About from "./pages/About/About";
import Dashboard from "./pages/Dashboard/Dashboard";
import Steps from "./components/Steps/Steps";
import Footer from "./components/Footer/Footer";
import { TimelineProvider } from "./contexts/TimelineContext";
import "./App.css";

function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const openLogin = () => {
    setSignupOpen(false);
    setLoginOpen(true);
  };

  const openSignup = () => {
    setLoginOpen(false);
    setSignupOpen(true);
  };
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
 <AuthProvider>
      <NavBar onLoginClick={openLogin} onSignupClick={openSignup} />
      <Hero />
      <Plans />

      <Login
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToSignup={openSignup}
      />

      <SignUp
        isOpen={signupOpen}
        onClose={() => setSignupOpen(false)}
        onSwitchToLogin={openLogin}
      />
    </AuthProvider>
        <Footer />
      </BrowserRouter>
    </TimelineProvider>
  );
}

export default App;
