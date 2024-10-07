import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import { AptosClient } from "aptos";
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Contact from './components/Contact';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const [wallet, setWallet] = useState(null);
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const initClient = () => {
      const aptosClient = new AptosClient("https://fullnode.mainnet.aptoslabs.com/v1");
      setClient(aptosClient);
    };

    initClient();
  }, []);

  const connectWallet = async () => {
    try {
      const petraWallet = new PetraWallet();
      await petraWallet.connect();
      setWallet(petraWallet);
      setIsConnected(true);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setIsConnected(false);
    }
  };

  const disconnectWallet = () => {
    if (wallet) {
      wallet.disconnect();
    }
    setWallet(null);
    setIsConnected(false);
  };

  return (
    <Router>
      <Header 
        wallet={wallet} 
        isConnected={isConnected} 
        connectWallet={connectWallet} 
        disconnectWallet={disconnectWallet} 
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/track" element={
          <Dashboard 
            wallet={wallet} 
            client={client} 
            isConnected={isConnected} 
            connectWallet={connectWallet}
          />
        } />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;