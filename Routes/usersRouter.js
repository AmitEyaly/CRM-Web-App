const express = require('express');
const router = express.Router();
const usersBLL = require('../BLL/usersBLL');
const { error } = require('pdf-lib');

router.post('/', async (req, res) => {
    const user = req.body;
    const result = await usersBLL.registerUser(user);
    if (result.error) {
        return res.send(result.error);
    }
    return res.send('User registered successfully');
});

// router.get('/', async (req, res) => {
//     try {
//         const users = await usersBLL.getAllUsers();
//         return res.status(200).json(users);
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// });

module.exports = router;