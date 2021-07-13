import { GET_INFO_BY_PARENT_CINEMAS_REQUEST, GET_INFO_BY_PARENT_CINEMAS_SUCCESS, GET_PARENT_CINEMAS_REQUEST, GET_PARENT_CINEMAS_SUCCESS } from "../constants/cinemas"
import axiosClient from "../services/axiosClient";


export function getParentCinemas() {
    return async (dispatch)=>{
        dispatch({
            type: GET_PARENT_CINEMAS_REQUEST
        })
        try {
            const {data} = await axiosClient.get(`/QuanLyRap/LayThongTinHeThongRap`);
            dispatch({
                type: GET_PARENT_CINEMAS_SUCCESS,
                payload: {data}
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export function getInfoByParentCinemas(value) {
    return async (dispatch)=>{
        dispatch({
            type: GET_INFO_BY_PARENT_CINEMAS_REQUEST
        })
        try {
            const {data} = await axiosClient.get(`/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${value}`);
            dispatch({
                type: GET_INFO_BY_PARENT_CINEMAS_SUCCESS,
                payload: {data}
            })
        } catch (error) {
            console.log(error);
        }
    }
}