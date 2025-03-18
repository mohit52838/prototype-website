import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faFirstAid, faHouseDamage, faTimes } from '@fortawesome/free-solid-svg-icons';

const tips = [
  {
    icon: faInfoCircle,
    title: 'Stay Informed',
    description: 'Monitor local news and weather updates.',
    details: 'Sign up for emergency alerts from your local government. Keep a battery-powered radio for updates during power outages.',
  },
  {
    icon: faFirstAid,
    title: 'Emergency Kit',
    description: 'Prepare a kit with essentials like water, food, and first aid.',
    details: 'Your emergency kit should include: 1 gallon of water per person per day, non-perishable food, a first-aid kit, flashlights, batteries, and important documents.',
  },
  {
    icon: faHouseDamage,
    title: 'Secure Your Home',
    description: 'Reinforce windows and doors to withstand disasters.',
    details: 'Install storm shutters or board up windows. Secure heavy furniture to walls. Check your roof and foundation for vulnerabilities.',
  },
];

export default function Preparedness() {
  const [selectedTip, setSelectedTip] = useState(null);

  const handleTipClick = (tip) => {
    setSelectedTip(tip);
  };

  const closeDetails = () => {
    setSelectedTip(null);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="preparedness"
    >
      <h2>Disaster Preparedness Tips</h2>
      <div className="tips-grid">
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            className="tip-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTipClick(tip)}
          >
            <FontAwesomeIcon icon={tip.icon} className="tip-icon" />
            <h3>{tip.title}</h3>
            <p>{tip.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedTip && (
        <motion.div
          className="details-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="details-content">
            <button className="close-button" onClick={closeDetails}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <FontAwesomeIcon icon={selectedTip.icon} className="tip-icon" />
            <h3>{selectedTip.title}</h3>
            <p>{selectedTip.description}</p>
            <div className="details-text">
              <p>{selectedTip.details}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}