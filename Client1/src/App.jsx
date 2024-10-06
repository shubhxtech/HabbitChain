import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Contact from './components/Contact';
import Header from './components/Header';
import Footer from './components/Footer'
const App = () => {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const initWallet = async () => {
      const petraWallet = new PetraWallet();
      await petraWallet.connect();
      setWallet(petraWallet);
    };

    initWallet();
  }, []);

  return (
    <Router>
      <Header wallet={wallet} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/track" element={<Dashboard wallet={wallet} />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;