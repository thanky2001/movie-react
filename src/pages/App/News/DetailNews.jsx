import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { getNewsDetailsPage } from '../../../actions/getNewsDetailPage';
import { getParamId, ToSlug } from '../../../utils/format';
import '../Home/home.css'
import { news, promotionalNews, reviews } from '../../../components/App/data/DataNews';
import { scrollToTop } from '../../../utils/scrollTop';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .col--news--detail': {
            [theme.breakpoints.down('xs')]: {
                width: '100% !important'
            }
        },
        '& .news--link': {
            color: '#000',
            fontSize: '17px',
            fontWeight: '600'
        },
        '& a.news--link:hover': {
            color: '#fb4226',
            textDecoration: 'none'
        }
    },
}));
export default function DetailNews() {
    const classes = useStyles();
    const [arrNewsRandom, setArrNewsRandom] = useState(null)
    const location = useLocation();
    const dispatch = useDispatch()
    useEffect(() => {
        let value = getParamId(location.pathname);
        if (value.id && value.type) {
            dispatch(getNewsDetailsPage(value))
        };
        randomNews();
        scrollToTop()
    }, [location]) // eslint-disable-line react-hooks/exhaustive-deps
    const { newsDetail } = useSelector(state => state.newsReducer)
    const randomNews = () => {
        let type = getParamId(location.pathname) && getParamId(location.pathname).type
        let typeUp = '';
        let arrNewsRandomUpdate = [];
        if (type && type === 'goc-dien-anh') {
            while (arrNewsRandomUpdate.length <= 4) {
                let elem = reviews[Math.floor(Math.random() * reviews.length)];
                let index = arrNewsRandomUpdate.findIndex(news => parseInt(news.id) === parseInt(elem.id))
                if (index === -1) {
                    arrNewsRandomUpdate.push(elem);
                    typeUp = 'review'
                }
            }
        }
        if (type && type === 'review') {
            while (arrNewsRandomUpdate.length <= 4) {
                let elem = promotionalNews[Math.floor(Math.random() * promotionalNews.length)];
                let index = arrNewsRandomUpdate.findIndex(news => parseInt(news.id) === parseInt(elem.id))
                if (index === -1) {
                    arrNewsRandomUpdate.push(elem);
                    typeUp = 'khuyen-mai'
                }
            }
        }
        if (type && type === 'khuyen-mai') {
            while (arrNewsRandomUpdate.length <= 4) {
                let elem = news[Math.floor(Math.random() * news.length)];
                let index = arrNewsRandomUpdate.findIndex(news => parseInt(news.id) === parseInt(elem.id))
                if (index === -1) {
                    arrNewsRandomUpdate.push(elem);
                    typeUp = 'goc-dien-anh'
                }
            }
        }
        setArrNewsRandom({ arrNews: arrNewsRandomUpdate, type: typeUp });
    }
    return (
        <>
            <div style={{ paddingTop: '60px' }} className="news__detail">
                {
                    getParamId(location.pathname).id ?
                        newsDetail ?
                            <div className="news__detail--content">
                                <div className="news__detail--title">{newsDetail.title}</div>
                                <div dangerouslySetInnerHTML={{ __html: newsDetail.content }}></div>
                            </div> :
                            "" :
                        <Redirect to="/"></Redirect>
                }
            </div>
            <div className={`${classes.root} news__detail`}>
                <div className='line'>
                    <div><hr /></div>
                    <div>
                        {arrNewsRandom && arrNewsRandom.arrNews.length ?
                            arrNewsRandom.arrNews.map((news, index) => {
                                return (
                                    <div key={index} className='col--news--detail'>
                                        <div className="news--thumbail">
                                            <Link to={`/${arrNewsRandom.type}/${news.id}-${ToSlug(news.title)}`}>
                                                <img src={news.img} alt={news.img} />
                                            </Link>
                                        </div>
                                        <div className="news--info">
                                            <Link className="news--link" to={`/${arrNewsRandom.type}/${news.id}-${ToSlug(news.title)}`}>
                                                <p className="news--title">{news.title}</p>
                                            </Link>
                                            <p className="news--summary">{news.summary}</p>
                                        </div>
                                    </div>
                                )
                            }) :
                            ''
                        }

                    </div>
                </div>
            </div>
        </>

    )
}
