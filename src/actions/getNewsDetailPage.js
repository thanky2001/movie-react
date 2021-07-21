import { news, promotionalNews, reviews } from "../components/App/data/DataNews";
import { GET_NEWS_DETAIL_PAGE } from "../constants/news"


export function getNewsDetailsPage(value) {
    let data = null;
    if (value.type === 'goc-dien-anh') {
        data = news.filter(n=>parseInt(n.id) === parseInt(value.id))[0];
    }
    if (value.type === 'review') {
        data = reviews.filter(n=>parseInt(n.id) === parseInt(value.id))[0];
    }
    if (value.type === 'khuyen-mai') {
        data = promotionalNews.filter(n=>parseInt(n.id) === parseInt(value.id))[0];
    }
    return (dispatch)=>{
        dispatch({
            type: GET_NEWS_DETAIL_PAGE,
            payload: {data}
        })
    }
}