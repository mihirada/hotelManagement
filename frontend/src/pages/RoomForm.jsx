import React, { useState, useEffect } from 'react';

const RoomForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    room_number: '',
    room_type: 'Single',
    facilities: '',
    price_per_night: '',
    status: 'available'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        room_number: initialData.room_number,
        room_type: initialData.room_type,
        facilities: initialData.facilities,
        price_per_night: initialData.price_per_night,
        status: initialData.status
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? 'Edit Room' : 'Add New Room'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Room Number</label>
          <input
            type="text"
            name="room_number"
            value={formData.room_number}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Room Type</label>
          <select
            name="room_type"
            value={formData.room_type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
            <option value="Deluxe">Deluxe</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Facilities</label>
          <textarea
            name="facilities"
            value={formData.facilities}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            rows="3"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price Per Night ($)</label>
          <input
            type="number"
            name="price_per_night"
            value={formData.price_per_night}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            min="0"
            step="0.01"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="available">Available</option>
            <option value="booked">Booked</option>
           
          </select>
        </div>
        
        <div className="flex justify-end space-x-3">
          {initialData && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {initialData ? 'Update Room' : 'Add Room'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomForm;