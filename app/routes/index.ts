import express, { Request, Response } from 'express';
import Layout from '../components/Layout';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.reactRender(Layout, {});
});

export default router;
