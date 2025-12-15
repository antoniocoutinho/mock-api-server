import type { Request, Response, NextFunction } from 'express';

const express = require('express');
const PORT = 3009;
const app = express();
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${req.params ? JSON.stringify(req.params) : ''} ${req.body ? JSON.stringify(req.body) : '' } ${res.statusCode} `);
    next();
});

app.post('/api/token', (req: Request, res: Response) => {

    if (req.body.user_id === '123' && req.body.secret === '1234') {
        return res.status(201).json({
            access_token: 'ubigoiuygfouy66',
            expires_in: 3600
        });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
});

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader === 'Bearer MOCKED_BEARER_TOKEN_ABC123XYZ') {
        next();
    } else {
        res.status(401).json({ message: 'Access denied. Invalid or missing token.' });
    }
};

app.get('/api/users', verifyToken, (req: Request, res: Response) => {
    res.status(200).json([
        { id: 1, name: 'Mock User 1', email: 'mock1@example.com' },
        { id: 2, name: 'Mock User 2', email: 'mock2@example.com' }
    ]);
});

app.post('/api/users', verifyToken, (req: Request, res: Response) => {
    const newUser = {
        id: Math.floor(Math.random() * 1000) + 3,
        ...req.body,
    };
    res.status(201).json(newUser);
});

app.listen(PORT, () => {
    console.log(`✅ Mock API Server running at http://localhost:${PORT}`);
});