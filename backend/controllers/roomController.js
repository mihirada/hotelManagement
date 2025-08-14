import pool from '../config/db.js';


export const getAllRooms = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM rooms ORDER BY room_number');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch rooms' });
  }
};


export const addRoom = async (req, res) => {
  const { room_number, room_type, facilities, price_per_night, status } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO rooms (room_number, room_type, facilities, price_per_night, status) VALUES (?, ?, ?, ?, ?)',
      [room_number, room_type, facilities, price_per_night, status]
    );
    res.status(201).json({ success: true, data: { id: result.insertId } });
  } catch (error) {
    console.error('Error adding room:', error);
    res.status(500).json({ success: false, message: 'Failed to add room' });
  }
};


export const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { room_number, room_type, facilities, price_per_night, status } = req.body;
  
  try {
    await pool.query(
      'UPDATE rooms SET room_number = ?, room_type = ?, facilities = ?, price_per_night = ?, status = ? WHERE id = ?',
      [room_number, room_type, facilities, price_per_night, status, id]
    );
    res.json({ success: true, message: 'Room updated successfully' });
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ success: false, message: 'Failed to update room' });
  }
};


export const deleteRoom = async (req, res) => {
  const { id } = req.params;
  
  try {
    await pool.query('DELETE FROM rooms WHERE id = ?', [id]);
    res.json({ success: true, message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ success: false, message: 'Failed to delete room' });
  }
};