import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faFirstAid, faHouseDamage } from '@fortawesome/free-solid-svg-icons';

const tips = [
  { icon: faInfoCircle, title: 'Stay Informed', description: 'Monitor local news and weather updates.' },
  { icon: faFirstAid, title: 'Emergency Kit', description: 'Prepare a kit with essentials like water, food, and first aid.' },
  { icon: faHouseDamage, title: 'Secure Your Home', description: 'Reinforce windows and doors to withstand disasters.' },
];

export default function Preparedness() {
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
          >
            <FontAwesomeIcon icon={tip.icon} className="tip-icon" />
            <h3>{tip.title}</h3>
            <p>{tip.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}