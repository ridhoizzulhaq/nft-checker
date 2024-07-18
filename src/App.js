import React, { useState } from 'react';
import NFTDisplay from './components/NFTDisplay';
import './App.css';

function App() {
  const [userAddress, setUserAddress] = useState('');
  const [nfts, setNfts] = useState([]);
  const [error, setError] = useState('');

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setUserAddress(accounts[0]);
        await fetchNFTs(accounts[0]); // Fetch NFTs after connecting
      } catch (error) {
        setError('User rejected request');
        console.error('User rejected request:', error);
      }
    } else {
      setError('MetaMask is not installed!');
      console.error('MetaMask is not installed!');
    }
  };

  const fetchNFTs = async (address) => {
    if (!address) return;

    const options = {
      method: 'GET',
      headers: { accept: 'application/json' },
    };

    const url = `https://zksync-sepolia.g.alchemy.com/nft/v3/(put your api key)/getNFTsForOwner?owner=${address}&contractAddresses[]=(put your nft contract)&withMetadata=true&pageSize=100`;

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log('Fetched NFTs:', data); // Log the response
      setNfts(data.ownedNfts || []);
    } catch (error) {
      setError('Error fetching NFTs');
      console.error('Error fetching NFTs:', error);
    }
  };

  return (
    <div className="App">
      <button onClick={connectMetaMask}>Connect MetaMask</button>
      {error && <p>{error}</p>}
      <NFTDisplay nfts={nfts} />
    </div>
  );
}

export default App;
