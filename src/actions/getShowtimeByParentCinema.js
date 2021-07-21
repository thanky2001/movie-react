import { GET_SHOWTIME_BY_PARENT_CINEMAS_REQUEST, GET_SHOWTIME_BY_PARENT_CINEMAS_SUCCESS } from "../constants/cinemas"
import axiosClient from "../services/axiosClient"

export function getShowtimeByParentCinemas(value) {
    return async (dispatch)=>{
        dispatch({
            type: GET_SHOWTIME_BY_PARENT_CINEMAS_REQUEST
        })
        try {
            const {data} = await axiosClient.get(`/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${value}&maNhom=GP01`)
            dispatch({
                type: GET_SHOWTIME_BY_PARENT_CINEMAS_SUCCESS,
                payload: {data}
            })
        } catch (error) {
            console.log(error)
        }
    }
}