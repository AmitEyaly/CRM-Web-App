const express = require('express');
const reservationsBLL = require('../BLL/reservationsBLL');
const router = express.Router();

// Get all reservations
router.get('/',  async (req, res) => {
    try {
        let reservations = await reservationsBLL.getAllReservations();
        console.log(reservations);
        res.send(reservations);
    } catch (error) {
        console.error("Error getting reservations:", error);
        res.send(error.message);
    }
});

// // Get reservation by ID
// router.get('/:id', reservationsController.getReservationById);

// // Update reservation by ID
// router.put('/:id', reservationsController.updateReservationById);

// // Delete reservation by ID
// router.delete('/:id', reservationsController.deleteReservationById);

module.exports = router;