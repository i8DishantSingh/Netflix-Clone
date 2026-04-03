import express from 'express';
import { signup, lognin, logout } from '../controllers/auth.controller.js';
    
const router = express.Router();

router.get('/signup', (req, res) => {
    res.send('Signup route');
})

router.post('/signup', signup);
router.post('/login', lognin);
router.post('/logout', logout);


export default router;