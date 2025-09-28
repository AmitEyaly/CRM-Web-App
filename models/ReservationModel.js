const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    "contactName": {type:String, required: true},
    "contactPhone": {type:String, required: true},
    "contactMail": {type:String, required: true},
    "contactRole": {type:String, required: true},
    "groupName": {type:String, required: true},
    "groupId": {type:Number, required: true},
    "seminarStartDate": {type:String, required: true},
    "seminarEndDate": {type:String, required: true},
    "seminarDateNote": {type:String, required: true, default:"no notes"},
    "participantsAmount": {type:Number, required: true},
    "staffAmount": {type:Number, required: true},
    "allAmount": {type:Number, required: true},
    "participantsDevesion": {type:Number, required: true},
    "staffDevision": {type:Number, required: true},
    "smallClassesAmount": {type:Number, required: true},
    "Classes70Amount": {type:Number, required: true},
    "gatheringClassesAmount": {type:Number, required: true},
    "araivleTime": {type:String, required: true},
    "departureTime": {type:String, required: true},
    "lateDeparture": {type:String, required: true},
    "lateAmount": {type:Number, required: true},
    "meals": {type:Array, required: true},
    "other": {type:String, required: true},
    "classRoomsSaved": {type:Boolean, default: false},
    "offerSent": {type:Boolean, default: false},
    "signed": {type:Boolean, default: false},
    "status": {type:String, default: "reservation"},
});

const ReservationsModel = new mongoose.model("reservation" , ReservationSchema , "reservations");

module.exports = ReservationsModel;

