import express from 'express';
import { deleteSlideImage, getSlideImage, getSlideImageById, saveSlideImage, updateSlideImage } from '../controllers/slideImageController.js';

const router = express.Router();

router.get('/slides', getSlideImage);
router.get('/slides/:id', getSlideImageById);
router.post('/slides', saveSlideImage);
router.patch('/slides/:id', updateSlideImage);
router.delete('/slides/:id', deleteSlideImage);

export default router;
