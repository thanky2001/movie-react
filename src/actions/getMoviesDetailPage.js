import { GET_MOVIES_DETAIL_PAGE_REQUEST, GET_MOVIES_DETAIL_PAGE_SUCCESS } from "../constants/movies"
import axiosClient from "../services/axiosClient"


export function getMoviesDetail(idFilm) {
    return async (dispatch)=>{
        dispatch({
            type: GET_MOVIES_DETAIL_PAGE_REQUEST
        })
        try {
            const {data} = await axiosClient.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${idFilm}`)
            dispatch({
                type: GET_MOVIES_DETAIL_PAGE_SUCCESS,
                payload: {data},
            })
        } catch (error) {
            console.log(error);
        }
    }
}