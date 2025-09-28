const ReservationsModel = require('../models/ReservationModel')

const newReservation = async (obj) => {
    // const newNote = async (token, obj) => {
    try {
        console.log(obj);

        // Verify the token
        // let tokenVerified;
        // try {
        //     tokenVerified = jwt.verify(token, process.env.SECRET_TOKEN_KEY);

        // } catch (verifyError) {
        //     throw new Error("Error: please register/log in");
        // }

        // if (tokenVerified) {
        // Create a new reservation

        let newReservation = new ReservationsModel(obj);

        // Save the chat
        try {
            await newReservation.save()
            .then(response => {
            return("Reservation saved:", response);
            })
            .catch(err => {
            console.error("Error saving reservation:", err);
        });
    } catch (saveError) {
        return `Error saving note: ${saveError.message}`;
    }
    // let chatMembers = obj.chatMembers
    // for (let member of chatMembers) {
    //     console.log(`Updating chat member: ${JSON.stringify(member)}`);

    // }

    // let user = await usersModel.findById(userId);
    // if (!user) {
    //     return "Error: User not found";
    // }

    // // Add the new chat's _id to the user's chatsRelated array
    // let chatIDsList = user.chatsRelated;
    // chatIDsList.push(newChat._id.toString());


    // // Update the user's chatsRelated array
    // try {
    //     await usersModel.findOneAndUpdate(
    //         // { _id: tokenVerified._doc._id },
    //         { _id: userId },
    //         { $set: { chatsRelated: chatIDsList } },
    //         { new: true }
    //     );
    // } catch (updateError) {
    //     return `Error updating user: ${updateError.message}`;
    // }



    // } else {
    //     throw new Error("Error: Token verification failed");
    // }
} catch (error) {
    console.log(error);
    return `Unhandled error: ${error.message}`;
}
}


module.exports = { newReservation }