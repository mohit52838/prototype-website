import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faShieldAlt, faFire, faTimes, faClock, faBell } from '@fortawesome/free-solid-svg-icons';

// Helper function to generate random dates within the last two months
const getRandomDate = () => {
  const now = new Date();
  const twoMonthsAgo = new Date(now);
  twoMonthsAgo.setMonth(now.getMonth() - 2);

  const randomTimestamp = twoMonthsAgo.getTime() + Math.random() * (now.getTime() - twoMonthsAgo.getTime());
  const randomDate = new Date(randomTimestamp);

  // Format the date and time
  const date = randomDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const time = randomDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return `${date} ${time}`;
};

// Simulated API call to fetch alerts
const fetchAlerts = () => {
  return Promise.resolve([
    { id: 1, type: 'flood', message: 'Flood alert in Pune', details: 'Severe flooding reported in low-lying areas.', urgent: true, timestamp: getRandomDate() },
    { id: 2, type: 'earthquake', message: 'Earthquake in Mumbai', details: 'Magnitude 5.5 earthquake reported.', urgent: false, timestamp: getRandomDate() },
    { id: 3, type: 'wildfire', message: 'Wildfire in Delhi', details: 'Wildfire spreading in the northern region.', urgent: false, timestamp: getRandomDate() },
  ]);
};

export default function Alerts() {
  const [show, setShow] = useState(false);
  const [expandedAlert, setExpandedAlert] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch alerts on component mount
  useEffect(() => {
    fetchAlerts().then((data) => {
      setAlerts(data);
      setLoading(false);
    });
  }, []);

  const handleClick = () => {
    setShow(!show);
  };

  const handleAlertClick = (id) => {
    setExpandedAlert(expandedAlert === id ? null : id);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'flood':
        return faWater;
      case 'earthquake':
        return faShieldAlt;
      case 'wildfire':
        return faFire;
      default:
        return faShieldAlt;
    }
  };

  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="alerts-button"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faBell} /> Latest Disaster Alerts
      </motion.button>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="alerts-list"
          >
            {loading ? (
              <p>Loading alerts...</p>
            ) : (
              <ul>
                {alerts.map((alert) => (
                  <motion.li
                    key={alert.id}
                    className={alert.urgent ? 'urgent-alert' : ''}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAlertClick(alert.id)}
                  >
                    <div className="alert-header">
                      <FontAwesomeIcon icon={getIcon(alert.type)} /> {alert.message}
                      <span className="alert-timestamp">
                        <FontAwesomeIcon icon={faClock} /> {alert.timestamp}
                      </span>
                    </div>
                    {expandedAlert === alert.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="alert-details"
                      >
                        <p>{alert.details}</p>
                        <button
                          className="close-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedAlert(null);
                          }}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </motion.div>
                    )}
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}