import axiosClient from "../services/axiosClient";
import {CREATE_FILM_SCHEDULE_SUCCESS} from "../constants/booking"
import { toast } from "react-toastify";

export function createFilmSchedule(values, callback) {
    return async(dispatch) => {
        try {
            const {data} = await axiosClient.post('/QuanLyDatVe/TaoLichChieu', values);
            dispatch({
                type: CREATE_FILM_SCHEDULE_SUCCESS
            })
            callback();
            return toast.success(data)
        } catch (error) {
            return toast.error(error.response.data);
        }
    }
}