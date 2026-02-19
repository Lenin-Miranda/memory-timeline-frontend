import { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Hero from "./components/hero/Hero";
import Plans from "./components/Plans/Plans";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { AuthProvider } from "./context/AuthContext";
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
  );
}

export default App;
