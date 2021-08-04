import { ADD_CHAIR_SUCCESS, GET_LIST_TICKET_ROOM_REQUEST, GET_LIST_TICKET_ROOM_SUCCESS } from "../constants/booking";


const initialState={
    isLoading: false,
    listChairs: null,
}
function bookingReducer(state=initialState, action) {
    switch (action.type) {
        case GET_LIST_TICKET_ROOM_REQUEST:
            return {...state, isLoading: true}
        case GET_LIST_TICKET_ROOM_SUCCESS:
            return {...state, isLoading:false, listChairs: action.payload.data}
        case ADD_CHAIR_SUCCESS:
            return {...state, isLoading:false, listChairs: action.payload.data}
        default:
            return state
    }
}
export default bookingReducer;