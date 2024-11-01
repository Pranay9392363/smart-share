import React, { useState } from 'react';

const PostOfficeForm = ({ onSubmit }) => {
  const [postOffice, setPostOffice] = useState({
    name: '',
    life: [
      { name: 'Waste Reduction', score: 0 },
      { name: 'Energy Conservation', score: 0 },
      { name: 'Water Conservation', score: 0 },
      { name: 'Green Spaces', score: 0 },
      { name: 'Awareness and Education', score: 0 },
    ],
    swachhta: [
      { name: 'Cleanliness of Premises', score: 0 },
      { name: 'Waste Management', score: 0 },
      { name: 'Sanitation and Hygiene', score: 0 },
      { name: 'Preventive Maintenance', score: 0 },
      { name: 'Infrastructure Upkeep', score: 0 },
    ],
    historicalData: []
  });

  const handleInputChange = (field, value) => {
    setPostOffice({ ...postOffice, [field]: value });
  };

  const handleLifeChange = (index, score) => {
    const updatedLife = [...postOffice.life];
    updatedLife[index].score = score;
    setPostOffice({ ...postOffice, life: updatedLife });
  };

  const handleSwachhtaChange = (index, score) => {
    const updatedSwachhta = [...postOffice.swachhta];
    updatedSwachhta[index].score = score;
    setPostOffice({ ...postOffice, swachhta: updatedSwachhta });
  };

  const handleAddHistoricalData = (month, lifeScore, swachhtaScore) => {
    const newEntry = { month, life: lifeScore, swachhta: swachhtaScore };
    setPostOffice({ ...postOffice, historicalData: [...postOffice.historicalData, newEntry] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(postOffice);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Post Office Details</h2>

      <div>
        <label>Post Office Name:</label>
        <input
          type="text"
          value={postOffice.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
        />
      </div>

      <h3>LiFE Practices</h3>
      {postOffice.life.map((practice, index) => (
        <div key={practice.name}>
          <label>{practice.name} Score:</label>
          <input
            type="number"
            value={practice.score}
            onChange={(e) => handleLifeChange(index, parseFloat(e.target.value))}
            min="0"
            max="1"
            step="0.01"
            required
          />
        </div>
      ))}

      <h3>Swachhta Practices</h3>
      {postOffice.swachhta.map((practice, index) => (
        <div key={practice.name}>
          <label>{practice.name} Score:</label>
          <input
            type="number"
            value={practice.score}
            onChange={(e) => handleSwachhtaChange(index, parseFloat(e.target.value))}
            min="0"
            max="1"
            step="0.01"
            required
          />
        </div>
      ))}

      <h3>Historical Data</h3>
      <div>
        <label>Month:</label>
        <input
          type="text"
          onChange={(e) => handleInputChange('month', e.target.value)}
        />
        <label>LiFE Score:</label>
        <input
          type="number"
          onChange={(e) => handleInputChange('lifeScore', parseFloat(e.target.value))}
          min="0"
          max="1"
          step="0.01"
        />
        <label>Swachhta Score:</label>
        <input
          type="number"
          onChange={(e) => handleInputChange('swachhtaScore', parseFloat(e.target.value))}
          min="0"
          max="1"
          step="0.01"
        />
        <button
          type="button"
          onClick={() => handleAddHistoricalData(postOffice.month, postOffice.lifeScore, postOffice.swachhtaScore)}
        >
          Add Historical Data
        </button>
      </div>

      <button type="submit">Save Post Office Details</button>
    </form>
  );
};

export default PostOfficeForm;
