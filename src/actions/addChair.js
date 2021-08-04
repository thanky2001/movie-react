import { ADD_CHAIR_SUCCESS } from "../constants/booking"


export function addChair(listChair,stt) {
    let list = {...listChair};
    let index = listChair.danhSachGhe.findIndex(ch => ch.stt === stt);
    if (index !== -1) {
        if (list.danhSachGhe[index].dangChon) {
            delete list.danhSachGhe[index].dangChon;
        }else{
            list.danhSachGhe[index] = {...listChair.danhSachGhe[index], dangChon: true}
        }
    }
    return (dispatch)=>{
        dispatch({
            type: ADD_CHAIR_SUCCESS,
            payload: {data: list}
        })
    }
}