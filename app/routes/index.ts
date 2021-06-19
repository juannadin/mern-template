import express, { Request, Response } from 'express';
import test from '../pages/test';

const router = express.Router();

router.use('/', test);

export default router;
