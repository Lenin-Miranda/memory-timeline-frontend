import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Hero from "./components/hero/Hero";
import Plans from "./components/Plans/Plans";
import About from "./pages/About/About";
import Dashboard from "./pages/Dashboard/Dashboard";
import Steps from "./components/Steps/Steps";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { AuthProvider } from "./context/AuthContext";
import { TimelineProvider } from "./contexts/TimelineContext";
import { MemoryProvider } from "./contexts/MemoryContext";
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
    <AuthProvider>
      <TimelineProvider>
        <MemoryProvider>
          <BrowserRouter>
            <NavBar onLoginClick={openLogin} onSignupClick={openSignup} />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <Plans />
                    <Steps />
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
                  </>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>

            <Footer />
          </BrowserRouter>
        </MemoryProvider>
      </TimelineProvider>
    </AuthProvider>
  );
}

export default App;
