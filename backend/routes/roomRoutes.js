import express from 'express';
import { getAllRooms, addRoom, updateRoom, deleteRoom } from '../controllers/roomController.js';

const router = express.Router();

router.get('/', getAllRooms);
router.post('/', addRoom);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom);

export default router;