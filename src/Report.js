import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faExclamationTriangle, faAlignLeft, faCamera } from '@fortawesome/free-solid-svg-icons';

export default function Report() {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('flood');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      alert('Please upload an image under 5MB.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const report = {
      location,
      type,
      description,
      photo: photo ? URL.createObjectURL(photo) : null,
      timestamp: new Date().toLocaleString(),
    };

    // Log the report data to the console
    console.log('Report Submitted:', report);
    alert('Report submitted successfully! (Check console for details)');

    // Reset form fields
    setLocation('');
    setType('flood');
    setDescription('');
    setPhoto(null);
    setPhotoPreview(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="report-form"
    >
      <form onSubmit={handleSubmit}>
        <label>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label>
        <label>
          <FontAwesomeIcon icon={faExclamationTriangle} /> Disaster Type:
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            style={{
              appearance: 'none',
              backgroundColor: 'var(--glass-bg)',
              backdropFilter: 'var(--blur)',
              border: '1px solid var(--glass-border)',
              borderRadius: '8px',
              padding: '12px',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            <option value="flood" style={{ backgroundColor: '#3B4E5F', color: 'white' }}>Flood</option>
            <option value="earthquake" style={{ backgroundColor: '#3B4E5F', color: 'white' }}>Earthquake</option>
            <option value="wildfire" style={{ backgroundColor: '#3B4E5F', color: 'white' }}>Wildfire</option>
          </select>
        </label>
        <label>
          <FontAwesomeIcon icon={faAlignLeft} /> Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          <FontAwesomeIcon icon={faCamera} /> Upload Photo:
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
          />
        </label>
        {photoPreview && (
          <div className="photo-preview">
            <img src={photoPreview} alt="Uploaded" style={{ maxWidth: '100%', borderRadius: '8px' }} />
          </div>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
        >
          Submit Report
        </motion.button>
      </form>
    </motion.div>
  );
}