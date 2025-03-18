import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './Map';
import Alerts from './Alerts';
import Report from './Report';
import EmergencyContacts from './EmergencyContacts';
import Preparedness from './Preparedness';
import ResourceManagement from './ResourceManagement'; // Import the new section
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBell, faMap, faExclamationCircle, faPhone, faBox } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import netlifyIdentity from 'netlify-identity-widget';
import LiquidButton from './LiquidButton'; // Import the LiquidButton component

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    netlifyIdentity.init({
      APIUrl: 'https://serene-fairy-7e7e71.netlify.app/.netlify/identity',
    });

    netlifyIdentity.on('login', (user) => {
      setUser(user);
      netlifyIdentity.close();
    });

    netlifyIdentity.on('logout', () => {
      setUser(null);
    });

    return () => {
      netlifyIdentity.off('login');
      netlifyIdentity.off('logout');
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const handleLogin = () => {
    netlifyIdentity.open('login');
  };

  const handleSignUp = () => {
    netlifyIdentity.open('signup');
  };

  const handleLogout = () => {
    netlifyIdentity.logout();
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-panel">
          {user ? (
            <div>
              <p>Welcome, {user.user_metadata.full_name || user.email}!</p>
              <LiquidButton
                text="Logout"
                onClick={handleLogout}
                color1="#FF6B6B"
                color2="#EF476F"
                color3="#FFD166"
                textColor="#FFFFFF"
              />
            </div>
          ) : (
            <div>
              <LiquidButton
                text="Login"
                onClick={handleLogin}
                color1="#36DFE7"
                color2="#8F17E1"
                color3="#E509E6"
                textColor="#FFFFFF"
              />
              <LiquidButton
                text="Sign Up"
                onClick={handleSignUp}
                color1="#36DFE7"
                color2="#8F17E1"
                color3="#E509E6"
                textColor="#FFFFFF"
              />
            </div>
          )}
        </div>
        <h1>Disaster Management Website</h1>
        <nav>
          <a href="#home"><FontAwesomeIcon icon={faHome} /> Home</a>
          <a href="#alerts"><FontAwesomeIcon icon={faBell} /> Alerts</a>
          <a href="#map"><FontAwesomeIcon icon={faMap} /> Map</a>
          <a href="#report"><FontAwesomeIcon icon={faExclamationCircle} /> Report</a>
          <a href="#contacts"><FontAwesomeIcon icon={faPhone} /> Contacts</a>
          <a href="#resources"><FontAwesomeIcon icon={faBox} /> Resources</a>
          <button onClick={toggleDarkMode} className="dark-mode-toggle">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </nav>
      </motion.header>

      <main>
        <motion.section
          id="home"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Welcome to the Disaster Management System</h2>
          <p>This website helps you stay informed and prepared for disasters.</p>
        </motion.section>

        <motion.section
          id="alerts"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2>Latest Disaster Alerts</h2>
          <Alerts />
        </motion.section>

        <motion.section
          id="map"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2>Interactive Disaster Map</h2>
          <Map />
        </motion.section>

        <motion.section
          id="report"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2>Report a Disaster</h2>
          <Report />
        </motion.section>

        <motion.section
          id="preparedness"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <h2>Disaster Preparedness Tips</h2>
          <Preparedness />
        </motion.section>

        <motion.section
          id="resources"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <ResourceManagement />
        </motion.section>

        <motion.section
          id="contacts"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <h2>Emergency Contacts</h2>
          <EmergencyContacts />
        </motion.section>
      </main>

      <footer>
        <p>&copy; 2025 Disaster Management Team</p>
      </footer>
    </div>
  );
}

export default App;
