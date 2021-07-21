import { GET_NEWS_DETAIL_PAGE } from "../constants/news";



const initialState = {
    newsDetail: null,
}

function newsReducer(state = initialState,action) {
    switch (action.type) {
        case GET_NEWS_DETAIL_PAGE:
            return {...state,newsDetail: action.payload.data}
        default:
            return state;
    }
}
export default newsReducer;