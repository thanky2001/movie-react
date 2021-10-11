import Swal from "sweetalert2";
import { POST_BOOKING_TICKET_SUCCESS } from "../constants/booking"
import axiosClient from "../services/axiosClient"


export function postBookingTicket(values) {
    return async(dispatch)=>{
        try {
            const {data} = await axiosClient.post('/QuanLyDatVe/DatVe',values);
            dispatch({
                type: POST_BOOKING_TICKET_SUCCESS,
            })
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: data,
                showConfirmButton: false,
                timer: 1000
            })
        } catch (error) {
            console.log(error);
        }
    }
}