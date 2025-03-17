import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faFire, faAmbulance, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

const contacts = [
  { name: 'Police', number: '100', icon: faShieldAlt },
  { name: 'Fire Brigade', number: '101', icon: faFire },
  { name: 'Ambulance', number: '102', icon: faAmbulance },
  { name: 'Disaster Helpline', number: '108', icon: faPhone },
];

export default function EmergencyContacts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="emergency-contacts"
    >
      <div className="contacts-grid">
        {contacts.map((contact, index) => (
          <motion.div
            key={index}
            className="contact-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={contact.icon} className="contact-icon" />
            <h3>{contact.name}</h3>
            <p>{contact.number}</p>
            <a href={`tel:${contact.number}`} className="call-button">
              Call Now
            </a>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}