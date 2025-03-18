import React, { useState } from 'react';

const ResourceManagement = () => {
  const [inventory, setInventory] = useState([
    { id: 1, resource: 'Food', quantity: 1000, unit: 'meals' },
    { id: 2, resource: 'Water', quantity: 5000, unit: 'liters' },
    { id: 3, resource: 'Medical Kits', quantity: 200, unit: 'kits' },
  ]);

  const [demands, setDemands] = useState([
    { id: 1, area: 'Pune', resource: 'Food', quantityNeeded: 500, unit: 'meals' },
    { id: 2, area: 'Mumbai', resource: 'Water', quantityNeeded: 2000, unit: 'liters' },
    { id: 3, area: 'Delhi', resource: 'Medical Kits', quantityNeeded: 100, unit: 'kits' },
  ]);

  const [successMessage, setSuccessMessage] = useState('');

  const handleSupplyResources = (demandId) => {
    const demand = demands.find((d) => d.id === demandId);
    setSuccessMessage(`✅ Resources successfully allocated to ${demand.area}! Your help is making a difference.`);
    setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
  };

  return (
    <section className="resource-management">
      <h2>Resource Management</h2>
      <div className="subsections">
        {/* Inventory Management */}
        <div className="inventory-management">
          <h3>Inventory Management</h3>
          <div className="inventory-list">
            {inventory.map((item) => (
              <div key={item.id} className="inventory-item">
                <span className="resource-name">{item.resource}</span>
                <span className="resource-quantity">
                  {item.quantity} {item.unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Demand-Supply Matching */}
        <div className="demand-supply-matching">
          <h3>Demand-Supply Matching</h3>
          <div className="demand-list">
            {demands.map((demand) => (
              <div key={demand.id} className="demand-item">
                <div className="demand-info">
                  <span className="area">{demand.area}</span>
                  <span className="resource-needed">
                    {demand.resource}: {demand.quantityNeeded} {demand.unit}
                  </span>
                </div>
                <button
                  className="supply-button"
                  onClick={() => handleSupplyResources(demand.id)}
                >
                  Supply Resources
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </section>
  );
};

export default ResourceManagement;