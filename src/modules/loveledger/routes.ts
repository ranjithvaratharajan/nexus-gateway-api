import { Router } from 'express';

const router = Router();

router.get('/status', (req, res) => {
    res.json({ message: "LoveLedger module is active" });
});

export default router;
