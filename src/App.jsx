
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
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: "#000",
  },
  
  // Header Styles
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    padding: "1rem 0",
    transition: "all 0.3s ease",
    animation: "slideDown 0.8s ease-out",
  },
  nav: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    animation: "fadeInLeft 1s ease-out",
  },
  logoIcon: {
    fontSize: "1.5rem",
    animation: "bounce 2s infinite",
  },
  logoText: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#000",
  },
  connectBtn: {
    background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
    border: "none",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    borderRadius: "50px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.875rem",
    transition: "all 0.3s ease",
    animation: "fadeInRight 1s ease-out",
    transform: "translateY(0)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  },
  walletInfo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "rgba(0, 0, 0, 0.1)",
    padding: "0.5rem 1rem",
    borderRadius: "50px",
    animation: "fadeInRight 1s ease-out",
    transition: "all 0.3s ease",
  },
  connectedDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#00ff88",
    animation: "pulse 2s infinite",
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
    padding: "120px 1rem 80px",
  },
  heroContent: {
    maxWidth: "800px",
    margin: "0 auto",
    animation: "fadeInUp 1.2s ease-out",
  },
  heroTitle: {
    fontSize: "clamp(2rem, 8vw, 3.5rem)",
    fontWeight: "800",
    lineHeight: "1.1",
    marginBottom: "1.5rem",
    animation: "slideInFromBottom 1s ease-out 0.3s both",
  },
  heroGradient: {
    background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: "glow 3s ease-in-out infinite alternate",
  },
  heroSubtitle: {
    fontSize: "clamp(1rem, 3vw, 1.25rem)",
    opacity: 0.9,
    marginBottom: "3rem",
    lineHeight: "1.6",
    animation: "slideInFromBottom 1s ease-out 0.6s both",
  },
  heroStats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "2rem",
    marginTop: "3rem",
  },
  statItem: {
    textAlign: "center",
    animation: "scaleIn 0.8s ease-out",
    transition: "transform 0.3s ease",
  },
  statNumber: {
    fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
    fontWeight: "800",
    color: "#000000",
    marginBottom: "0.5rem",
    animation: "countUp 2s ease-out",
  },
  statLabel: {
    fontSize: "0.875rem",
    opacity: 0.8,
  },

  // Features Styles
  features: {
    padding: "4rem 1rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
  },
  featureCard: {
    background: "rgba(0, 0, 0, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    padding: "2rem",
    textAlign: "center",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    transition: "all 0.4s ease",
    cursor: "pointer",
    animation: "slideInFromBottom 0.8s ease-out",
    transform: "translateY(0)",
  },
  featureIcon: {
    fontSize: "3rem",
    marginBottom: "1rem",
    transition: "transform 0.3s ease",
  },
  featureTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "1rem",
    transition: "color 0.3s ease",
  },
  featureDesc: {
    opacity: 0.9,
    lineHeight: "1.6",
    transition: "opacity 0.3s ease",
  },

  // Dashboard Styles
  dashboard: {
    padding: "4rem 1rem",
    maxWidth: "800px",
    margin: "0 auto",
  },
  dashboardContainer: {
    background: "rgba(0, 0, 0, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    overflow: "hidden",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    animation: "zoomIn 0.8s ease-out",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
  },
  tabNav: {
    display: "flex",
    background: "rgba(0, 0, 0, 0.05)",
    flexWrap: "wrap",
  },
  tab: {
    flex: 1,
    padding: "1rem 0.5rem",
    background: "transparent",
    border: "none",
    color: "rgba(0, 0, 0, 0.7)",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: "500",
    transition: "all 0.3s ease",
    minWidth: "120px",
    position: "relative",
    overflow: "hidden",
  },
  activeTab: {
    color: "#000",
    background: "rgba(0, 0, 0, 0.1)",
    transform: "translateY(-2px)",
  },
  tabContent: {
    padding: "2rem",
    animation: "fadeIn 0.5s ease-out",
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
    animation: "slideInFromTop 0.6s ease-out",
  },
  formSubtitle: {
    opacity: 0.8,
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "0.875rem",
    animation: "slideInFromTop 0.6s ease-out 0.1s both",
  },
  inputGroup: {
    marginBottom: "1.5rem",
    animation: "slideInFromLeft 0.6s ease-out",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    transition: "color 0.3s ease",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    background: "rgba(0, 0, 0, 0.05)",
    color: "#000",
    fontSize: "0.875rem",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
    outline: "none",
  },
  primaryBtn: {
    width: "100%",
    background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
    border: "none",
    color: "#fff",
    padding: "0.875rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.875rem",
    transition: "all 0.3s ease",
    animation: "slideInFromBottom 0.6s ease-out",
    transform: "translateY(0)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  },
  propertyCard: {
    marginTop: "2rem",
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: "12px",
    padding: "1.5rem",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    animation: "slideInFromBottom 0.6s ease-out",
    transition: "all 0.3s ease",
  },
  propertyCardTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "#000000",
  },
  propertyDetail: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.75rem",
    paddingBottom: "0.75rem",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    animation: "fadeIn 0.8s ease-out",
    flexWrap: "wrap",
    gap: "0.5rem",
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
    background: "rgba(0, 0, 0, 0.05)",
    padding: "2rem 1rem",
    textAlign: "center",
    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
    animation: "fadeIn 1s ease-out",
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

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  @keyframes slideDown {
    from { transform: translateY(-100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes fadeInLeft {
    from { transform: translateX(-50px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes fadeInRight {
    from { transform: translateX(50px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes fadeInUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes slideInFromBottom {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes slideInFromTop {
    from { transform: translateY(-30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes slideInFromLeft {
    from { transform: translateX(-30px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes scaleIn {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  
  @keyframes zoomIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
  
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
  
  @keyframes glow {
    from { filter: brightness(1) drop-shadow(0 0 5px rgba(0, 0, 0, 0.3)); }
    to { filter: brightness(1.1) drop-shadow(0 0 20px rgba(0, 0, 0, 0.5)); }
  }
  
  @keyframes countUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Hover effects */
  button:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3) !important;
  }
  
  .feature-card:hover {
    transform: translateY(-10px) !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
  }
  
  .feature-card:hover .feature-icon {
    transform: scale(1.2) !important;
  }
  
  input:focus {
    border-color: #000 !important;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1) !important;
    transform: translateY(-2px) !important;
  }
  
  .tab:hover {
    background: rgba(0, 0, 0, 0.08) !important;
    transform: translateY(-2px) !important;
  }
  
  .wallet-info:hover {
    background: rgba(0, 0, 0, 0.15) !important;
    transform: scale(1.05) !important;
  }
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem !important;
    }
    
    .features-grid {
      grid-template-columns: 1fr !important;
    }
    
    .tab-nav {
      flex-direction: column !important;
    }
    
    .tab {
      min-width: 100% !important;
    }
    
    .hero-stats {
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)) !important;
      gap: 1rem !important;
    }
    
    .property-detail {
      flex-direction: column !important;
      gap: 0.25rem !important;
    }
  }
  
  @media (max-width: 480px) {
    .nav {
      flex-direction: column !important;
      gap: 1rem !important;
    }
    
    .hero {
      padding-top: 140px !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default App;
