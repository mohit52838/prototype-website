import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import App from './App';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faBell, faMap, faExclamationCircle, faPhone, faCommentDots, faWater, faShieldAlt, faFire, faTimes, faClock, faInfoCircle, faFirstAid, faHouseDamage, faMapMarkerAlt, faExclamationTriangle, faAlignLeft } from '@fortawesome/free-solid-svg-icons';

// Add FontAwesome icons to the library
library.add(faHome, faBell, faMap, faExclamationCircle, faPhone, faCommentDots, faWater, faShieldAlt, faFire, faTimes, faClock, faInfoCircle, faFirstAid, faHouseDamage, faMapMarkerAlt, faExclamationTriangle, faAlignLeft);

// Use React 18's createRoot API
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);