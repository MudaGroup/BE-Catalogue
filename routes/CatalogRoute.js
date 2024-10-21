import express from 'express';
import { deleteCatalog, getCatalog, getCatalogById, saveCatalog, updateCatalog } from '../controllers/CatalogController.js';

const router = express.Router();

router.get('/catalog', getCatalog);
router.get('/catalog/:id', getCatalogById);
router.post('/catalog', saveCatalog);
router.patch('/catalog/:id', updateCatalog);
router.delete('/catalog/:id', deleteCatalog);

export default router;
