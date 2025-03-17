import React, { useState } from 'react';
import './App.css';
import Map from './Map';
import Alerts from './Alerts';
import Report from './Report';
import EmergencyContacts from './EmergencyContacts';
import Preparedness from './Preparedness';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBell, faMap, faExclamationCircle, faPhone, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Disaster Management Website</h1>
        <nav>
          <a href="#home">
            <FontAwesomeIcon icon={faHome} /> Home
          </a>
          <a href="#alerts">
            <FontAwesomeIcon icon={faBell} /> Alerts
          </a>
          <a href="#map">
            <FontAwesomeIcon icon={faMap} /> Map
          </a>
          <a href="#report">
            <FontAwesomeIcon icon={faExclamationCircle} /> Report
          </a>
          <a href="#contacts">
            <FontAwesomeIcon icon={faPhone} /> Contacts
          </a>
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
          <Preparedness />
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

      {/* Floating Chat Assistant */}
      <motion.div
        className="chat-assistant"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FontAwesomeIcon icon={faCommentDots} />
      </motion.div>
    </div>
  );
}

export default App;