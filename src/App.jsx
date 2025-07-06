
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
  const [activeTab, setActiveTab] = useState("register");

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
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.nav}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>🏠</span>
            <span style={styles.logoText}>PropertyChain</span>
          </div>
          
          {!account ? (
            <button style={styles.connectBtn} onClick={connectWallet}>
              Connect Wallet
            </button>
          ) : (
            <div style={styles.walletInfo}>
              <span style={styles.connectedDot}></span>
              <span style={styles.walletAddress}>
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Secure Property<br />
            <span style={styles.heroGradient}>Registration</span><br />
            on Blockchain
          </h1>
          <p style={styles.heroSubtitle}>
            Register, transfer, and verify property ownership with complete transparency 
            and security using blockchain technology.
          </p>
          <div style={styles.heroStats}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>100+</div>
              <div style={styles.statLabel}>Properties Registered</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>24/7</div>
              <div style={styles.statLabel}>Secure & Available</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>0%</div>
              <div style={styles.statLabel}>Transaction Fees</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📝</div>
            <h3 style={styles.featureTitle}>Register Property</h3>
            <p style={styles.featureDesc}>Securely register your property on the blockchain with immutable records</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🔄</div>
            <h3 style={styles.featureTitle}>Transfer Ownership</h3>
            <p style={styles.featureDesc}>Transfer property ownership instantly with smart contract automation</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🔍</div>
            <h3 style={styles.featureTitle}>Verify Records</h3>
            <p style={styles.featureDesc}>View and verify property details with complete transparency</p>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section style={styles.dashboard}>
        <div style={styles.dashboardContainer}>
          <div style={styles.tabNav}>
            <button 
              style={activeTab === "register" ? {...styles.tab, ...styles.activeTab} : styles.tab}
              onClick={() => setActiveTab("register")}
            >
              Register Property
            </button>
            <button 
              style={activeTab === "transfer" ? {...styles.tab, ...styles.activeTab} : styles.tab}
              onClick={() => setActiveTab("transfer")}
            >
              Transfer Property
            </button>
            <button 
              style={activeTab === "view" ? {...styles.tab, ...styles.activeTab} : styles.tab}
              onClick={() => setActiveTab("view")}
            >
              View Property
            </button>
          </div>

          <div style={styles.tabContent}>
            {activeTab === "register" && (
              <div style={styles.formContainer}>
                <h2 style={styles.formTitle}>Register New Property</h2>
                <p style={styles.formSubtitle}>Add your property to the blockchain registry</p>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Property Location</label>
                  <input 
                    style={styles.input} 
                    placeholder="Enter property address or location" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                  />
                </div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Area (Square Feet)</label>
                  <input 
                    style={styles.input} 
                    placeholder="Enter area in sqft" 
                    type="number" 
                    value={area} 
                    onChange={(e) => setArea(e.target.value)} 
                  />
                </div>
                
                <button style={styles.primaryBtn} onClick={registerProperty}>
                  Register Property
                </button>
              </div>
            )}

            {activeTab === "transfer" && (
              <div style={styles.formContainer}>
                <h2 style={styles.formTitle}>Transfer Property</h2>
                <p style={styles.formSubtitle}>Transfer ownership to a new address</p>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Property ID</label>
                  <input 
                    style={styles.input} 
                    placeholder="Enter property ID" 
                    type="number" 
                    value={propertyId} 
                    onChange={(e) => setPropertyId(e.target.value)} 
                  />
                </div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>New Owner Address</label>
                  <input 
                    style={styles.input} 
                    placeholder="Enter new owner's wallet address" 
                    value={newOwner} 
                    onChange={(e) => setNewOwner(e.target.value)} 
                  />
                </div>
                
                <button style={styles.primaryBtn} onClick={transferProperty}>
                  Transfer Property
                </button>
              </div>
            )}

            {activeTab === "view" && (
              <div style={styles.formContainer}>
                <h2 style={styles.formTitle}>View Property Details</h2>
                <p style={styles.formSubtitle}>Look up property information by ID</p>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Property ID</label>
                  <input 
                    style={styles.input} 
                    placeholder="Enter property ID to view details" 
                    type="number" 
                    value={propertyId} 
                    onChange={(e) => setPropertyId(e.target.value)} 
                  />
                </div>
                
                <button style={styles.primaryBtn} onClick={viewProperty}>
                  View Property
                </button>

                {propertyDetails && (
                  <div style={styles.propertyCard}>
                    <h3 style={styles.propertyCardTitle}>Property Details</h3>
                    <div style={styles.propertyDetail}>
                      <span style={styles.propertyLabel}>Location:</span>
                      <span style={styles.propertyValue}>{propertyDetails[0]}</span>
                    </div>
                    <div style={styles.propertyDetail}>
                      <span style={styles.propertyLabel}>Area:</span>
                      <span style={styles.propertyValue}>{propertyDetails[1].toString()} sqft</span>
                    </div>
                    <div style={styles.propertyDetail}>
                      <span style={styles.propertyLabel}>Owner:</span>
                      <span style={styles.propertyValue}>{propertyDetails[2]}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLogo}>
            <span style={styles.logoIcon}>🏠</span>
            <span style={styles.logoText}>PropertyChain</span>
          </div>
          <p style={styles.footerText}>
            Secure, transparent, and decentralized property management on the blockchain.
          </p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: "#fff",
  },
  
  // Header Styles
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    background: "rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    zIndex: 1000,
    padding: "1rem 0",
  },
  nav: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  logoIcon: {
    fontSize: "1.5rem",
  },
  logoText: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#fff",
  },
  connectBtn: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    borderRadius: "50px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.875rem",
    transition: "all 0.3s ease",
  },
  walletInfo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "rgba(255, 255, 255, 0.1)",
    padding: "0.5rem 1rem",
    borderRadius: "50px",
  },
  connectedDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#00ff88",
  },
  walletAddress: {
    fontSize: "0.875rem",
    fontWeight: "500",
  },

  // Hero Styles
  hero: {
    paddingTop: "120px",
    paddingBottom: "80px",
    textAlign: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "120px 2rem 80px",
  },
  heroContent: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  heroTitle: {
    fontSize: "3.5rem",
    fontWeight: "800",
    lineHeight: "1.1",
    marginBottom: "1.5rem",
  },
  heroGradient: {
    background: "linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSubtitle: {
    fontSize: "1.25rem",
    opacity: 0.9,
    marginBottom: "3rem",
    lineHeight: "1.6",
  },
  heroStats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "2rem",
    marginTop: "3rem",
  },
  statItem: {
    textAlign: "center",
  },
  statNumber: {
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "#00ff88",
    marginBottom: "0.5rem",
  },
  statLabel: {
    fontSize: "0.875rem",
    opacity: 0.8,
  },

  // Features Styles
  features: {
    padding: "4rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
  },
  featureCard: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    padding: "2rem",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  featureIcon: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  featureTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "1rem",
  },
  featureDesc: {
    opacity: 0.9,
    lineHeight: "1.6",
  },

  // Dashboard Styles
  dashboard: {
    padding: "4rem 2rem",
    maxWidth: "800px",
    margin: "0 auto",
  },
  dashboardContainer: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  tabNav: {
    display: "flex",
    background: "rgba(0, 0, 0, 0.1)",
  },
  tab: {
    flex: 1,
    padding: "1rem",
    background: "transparent",
    border: "none",
    color: "rgba(255, 255, 255, 0.7)",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: "500",
    transition: "all 0.3s ease",
  },
  activeTab: {
    color: "#fff",
    background: "rgba(255, 255, 255, 0.1)",
  },
  tabContent: {
    padding: "2rem",
  },
  formContainer: {
    maxWidth: "400px",
    margin: "0 auto",
  },
  formTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    textAlign: "center",
  },
  formSubtitle: {
    opacity: 0.8,
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "0.875rem",
  },
  inputGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.875rem",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    background: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    fontSize: "0.875rem",
    boxSizing: "border-box",
  },
  primaryBtn: {
    width: "100%",
    background: "linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)",
    border: "none",
    color: "#000",
    padding: "0.875rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.875rem",
    transition: "all 0.3s ease",
  },
  propertyCard: {
    marginTop: "2rem",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "12px",
    padding: "1.5rem",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  propertyCardTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "#00ff88",
  },
  propertyDetail: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.75rem",
    paddingBottom: "0.75rem",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  },
  propertyLabel: {
    fontWeight: "500",
    opacity: 0.8,
  },
  propertyValue: {
    fontWeight: "600",
    wordBreak: "break-all",
  },

  // Footer Styles
  footer: {
    background: "rgba(0, 0, 0, 0.2)",
    padding: "2rem",
    textAlign: "center",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  },
  footerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  footerLogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  footerText: {
    opacity: 0.8,
    fontSize: "0.875rem",
  },
};

export default App;
