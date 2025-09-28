const ReservationsModel = require('../models/ReservationModel')

const getAllReservations = async (req, res) => {
    try {
        let reservations = await ReservationsModel.find();
        return reservations;
    } catch (error) {
        return error.message;
    }
}

module.exports = {getAllReservations}