import React, { useState } from "react";
import { ethers } from "ethers";
import { contractABI } from "./contractABI";

const CONTRACT_ADDRESS = "0xeb39677f542e057e14c9e21a1ac9afc962f04e02";

function App() {
  const [account, setAccount] = useState("");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [propertyDetails, setPropertyDetails] = useState(null);

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

  const registerProperty = async () => {
    if (!window.ethereum) return alert("MetaMask not found");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
      const tx = await contract.registerProperty(location, parseInt(area));
      alert("⏳ Waiting for confirmation...");
      await tx.wait();
      alert("✅ Property registered!");
    } catch (error) {
      console.error("Register error:", error);
      alert("❌ Registration failed.");
    }
  };

  const transferProperty = async () => {
    if (!window.ethereum) return alert("MetaMask not found");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
      const tx = await contract.transferProperty(parseInt(propertyId), newOwner);
      alert("⏳ Waiting for confirmation...");
      await tx.wait();
      alert("✅ Property transferred!");
    } catch (error) {
      console.error("Transfer error:", error);
      alert("❌ Transfer failed.");
    }
  };

  const viewProperty = async () => {
    if (!window.ethereum) return alert("MetaMask not found");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
      const data = await contract.getProperty(parseInt(propertyId));
      setPropertyDetails(data);
    } catch (error) {
      console.error("View error:", error);
      alert("❌ View failed.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏠 Property Transfer DApp</h1>

      {!account ? (
        <button style={styles.button} onClick={connectWallet}>
          🔌 Connect MetaMask
        </button>
      ) : (
        <p style={styles.connected}>✅ Connected: {account}</p>
      )}

      <div style={styles.section}>
        <h2 style={styles.subtitle}>📌 Register Property</h2>
        <input style={styles.input} placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <input style={styles.input} placeholder="Area (sqft)" type="number" value={area} onChange={(e) => setArea(e.target.value)} />
        <button style={styles.button} onClick={registerProperty}>Register</button>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>🔁 Transfer Property</h2>
        <input style={styles.input} placeholder="Property ID" type="number" value={propertyId} onChange={(e) => setPropertyId(e.target.value)} />
        <input style={styles.input} placeholder="New Owner Address" value={newOwner} onChange={(e) => setNewOwner(e.target.value)} />
        <button style={styles.button} onClick={transferProperty}>Transfer</button>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>🔍 View Property</h2>
        <input style={styles.input} placeholder="Property ID" type="number" value={propertyId} onChange={(e) => setPropertyId(e.target.value)} />
        <button style={styles.button} onClick={viewProperty}>View</button>

        {propertyDetails && (
          <div style={styles.card}>
            <p><strong>📍 Location:</strong> {propertyDetails[0]}</p>
            <p><strong>📐 Area:</strong> {propertyDetails[1].toString()} sqft</p>
            <p><strong>👤 Owner:</strong> {propertyDetails[2]}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    paddingTop: "3rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "#fff",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    color: "#f7fafc",
    textShadow: "1px 1px 5px rgba(0,0,0,0.6)"
  },
  subtitle: {
    color: "#fff",
    fontSize: "1.3rem",
    marginBottom: "0.5rem"
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#38a169",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  section: {
    width: "90%",
    maxWidth: "500px",
    marginTop: "2rem",
    padding: "2rem",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.6)"
  },
  card: {
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "10px",
    color: "#fff",
    boxShadow: "0 4px 12px rgba(255, 255, 255, 0.1)"
  },
  connected: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#90ee90"
  },
};

export default App;
