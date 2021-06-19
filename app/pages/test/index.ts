import express from 'express';
import render from './controller';

const router = express.Router();

router.get('/', render);

export default router;
