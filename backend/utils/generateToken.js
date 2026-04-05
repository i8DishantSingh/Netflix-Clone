import jwt from 'jsonwebtoken'
import { ENV_VARS } from '../config/envVars.js'


export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ id: userId }, ENV_VARS.JWT_SECRET, { expiresIn: '15d' })
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
    })

    return token
} 

 



