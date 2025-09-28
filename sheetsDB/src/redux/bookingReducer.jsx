

const initialState = {
    reservations: [],
    upcomingWeek: [],
};

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SETRESERVATIONS':
            return {
                ...state,
                reservations: state.reservations = action.payload
            };
        
        case 'UPCOMING_WEEK':
            return {
                ...state,
                upcomingWeek: state.upcomingWeek = action.payload
            };
        case 'GET_BOOKINGS_LOADING':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'GET_BOOKINGS_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default bookingReducer;