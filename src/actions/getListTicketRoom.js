import { GET_LIST_TICKET_ROOM_REQUEST, GET_LIST_TICKET_ROOM_SUCCESS } from "../constants/booking"
import axiosClient from "../services/axiosClient"


export function getListTicketRoom(idSt) {
    return async(dispatch)=>{
        dispatch({
            type: GET_LIST_TICKET_ROOM_REQUEST
        })
        try {
            const {data} = await axiosClient.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${idSt}`)
            dispatch({
                type: GET_LIST_TICKET_ROOM_SUCCESS,
                payload: {data}
            })
        } catch (error) {
            console.log(error)
        }
    }
}