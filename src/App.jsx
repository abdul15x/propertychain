import React, { useState } from "react";
import { ethers } from "ethers";
import { contractABI } from "./contractABI";

// Replace with your deployed contract address on Sepolia
const CONTRACT_ADDRESS = "0xeb39677f542e057e14c9e21a1ac9afc962f04e02";

function App() {
  const [account, setAccount] = useState("");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [propertyDetails, setPropertyDetails] = useState(null);

  // Connect MetaMask Wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const [acc] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(acc);
      } catch (error) {
        console.error("User rejected connection:", error);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask extension.");
    }
  };

  // Load Smart Contract
  const getContract = () => {
    if (!window.ethereum) {
      alert("MetaMask not found");
      return null;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
  };

  // Register Property
  const registerProperty = async () => {
    if (!window.ethereum) {
      alert("MetaMask not found");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
      
      const tx = await contract.registerProperty(location, parseInt(area));
      alert("⏳ Transaction sent. Waiting for confirmation...");
      await tx.wait();
      alert("✅ Property registered successfully!");
    } catch (error) {
      console.error("Register error:", error);
      alert("❌ Failed to register property.");
    }
  };

  // Transfer Property
  const transferProperty = async () => {
    if (!window.ethereum) {
      alert("MetaMask not found");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
      
      const tx = await contract.transferProperty(
        parseInt(propertyId),
        newOwner,
      );
      alert("⏳ Transaction sent. Waiting for confirmation...");
      await tx.wait();
      alert("✅ Property ownership transferred!");
    } catch (error) {
      console.error("Transfer error:", error);
      alert("❌ Transfer failed.");
    }
  };

  // View Property Details
  const viewProperty = async () => {
    if (!window.ethereum) {
      alert("MetaMask not found");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
      
      const data = await contract.getProperty(parseInt(propertyId));
      setPropertyDetails(data);
    } catch (error) {
      console.error("View error:", error);
      alert("❌ Could not fetch property.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🏠 Property Transfer DApp</h1>

      {!account ? (
        <button onClick={connectWallet}>🔌 Connect MetaMask</button>
      ) : (
        <p>✅ Connected: {account}</p>
      )}

      <hr />

      <h2>📌 Register Property</h2>
      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}

      />
      <input
        placeholder="Area (sqft)"
        type="number"
        value={area}
        onChange={(e) => setArea(e.target.value)}
      />
      <button onClick={registerProperty}>Register</button>

      <hr />

      <h2>🔁 Transfer Property</h2>
      <input
        placeholder="Property ID"
        type="number"
        value={propertyId}
        onChange={(e) => setPropertyId(e.target.value)}
      />
      <input
        placeholder="New Owner Address"
        value={newOwner}
        onChange={(e) => setNewOwner(e.target.value)}
      />
      <button onClick={transferProperty}>Transfer</button>

      <hr />

      <h2>🔍 View Property</h2>
      <input
        placeholder="Property ID"
        type="number"
        value={propertyId}
        onChange={(e) => setPropertyId(e.target.value)}
      />
      <button onClick={viewProperty}>View</button>

      {propertyDetails && (
        <div>
          <p>
            <strong>📍 Location:</strong> {propertyDetails[0]}
          </p>
          <p>
            <strong>📐 Area:</strong> {propertyDetails[1].toString()} sqft
          </p>
          <p>
            <strong>👤 Owner:</strong> {propertyDetails[2]}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
