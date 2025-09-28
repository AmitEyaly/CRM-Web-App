const express = require('express');
const router = express.Router();
const clientsBLL = require("../BLL/clientsBLL");

router.post('/', async (req, res) => {
    // let token = req.headers.authorization;
    let obj = req.body;
    // let username = req.params.username;
    let response = await clientsBLL.newReservation(obj);
        
    res.send(response);
});

module.exports = router;