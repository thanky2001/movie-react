import React, { useEffect, useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Grid, makeStyles } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import { changeHttpIntoHttps, formatDate, getEmbedId, ToSlug } from '../../../../utils/format';
import { useDispatch } from 'react-redux';
import { getListMoviesByDate } from '../../../../actions/movies';
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import Trailer from '../../../Components/TrailerFilm/Trailer';
import { scrollToTarget } from '../../../../Layouts/AppLayout/AppLayout';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      className="tab__panel"
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <div className='tab--child'>
          <Grid container spacing={3}>
            {children}
          </Grid>
        </div>
      )}
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '80px',
    width: '100%',
    '& .MuiTabs-flexContainer': {
      justifyContent: 'center',
    },
    '& .MuiButtonBase-root': {
      color: 'black',
      fontSize: '20px',
      fontWeight: '500',
      [theme.breakpoints.down('xs')]: {
        fontSize: '15px',
        fontWeight: 'bold'
      }
    },
    '& .MuiTab-textColorPrimary.Mui-selected': {
      color: '#fa5238'
    },
    '& .play__trailer': {
      top: '50%',
      left: '50%',
      width: '50px',
      right: 'unset'

    },
    '& .MuiGrid-item': {
      cursor: 'pointer'
    },
    '& .MuiGrid-item .show--hover': {
      visibility: 'hidden',
      opacity: '0',
      transition: 'all .2s',
    },
    '& .MuiGrid-item:hover .show--hover': {
      visibility: 'visible',
      opacity: '1',
    },
    '& .play__trailer:hover': {
      opacity: '.7 !important',
    },
    '& .MuiGrid-item:hover .hide--hover': {
      visibility: 'hidden',
      opacity: '0',
    },
    '& .MuiRating-root': {
      fontSize: '10px',
      top: '0',
      color: '#fa5238'
    },
    '& .MuiRating-iconEmpty': {
      color: 'rgba(238, 238, 238, 0.71)'
    },
    '& .MuiPagination-root': {
      display: 'flex',
      justifyContent: 'center',
      padding: '20px 0'
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: '#fb4226',
      color: '#fff'
    },
  },
}));
export default function Movies() {
  const [value, setValue] = useState('one');
  const [index, setIndex] = useState('one')
  const [page, setPage] = useState(1);
  const { isLoading, listMoviesByDate, pageCountNow, pageCountUpComming} = useSelector(state => state.moviesReducer);
  const [isShowTrailer, setIsShowTrailer] = useState(false);
  const [embedId, setEmbedId] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    getMoviesByDate();
  }, [page, index]) // eslint-disable-line react-hooks/exhaustive-deps
  const handleChangePage = (event, value) => {
    setPage(value);
    scrollToTarget('#lich-chieu')
  };
  const classes = useStyles()
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setIndex(newValue)
    setPage(1);
  };
  const handleOpenTrailer=(url, e)=>{
    e.preventDefault(); 
    setIsShowTrailer(true)
    setEmbedId(getEmbedId(url))
  }
  const getMoviesByDate = () => {
    let paramGetMovie = '';
    if (index === 'one') {
      let fromDate = formatDate(new Date(), -1);
      let toDate = formatDate(new Date());
      paramGetMovie = `maNhom=GP14&soTrang=${page}&soPhanTuTrenTrang=8&tuNgay=${fromDate}&denNgay=${toDate}`;
    }
    else if (index === 'two') {
      let fromDate = formatDate(new Date());
      let toDate = formatDate(new Date(), 1);
      paramGetMovie = `maNhom=GP14&soTrang=${page}&soPhanTuTrenTrang=8&tuNgay=${fromDate}&denNgay=${toDate}`;
    }
    dispatch(getListMoviesByDate(paramGetMovie))
  }
  const renderMovies = () => {
    if (index === 'one') {
      return (
        isLoading ?
          <div className="loading--component" style={{ paddingBottom: '80%' }}><ReactLoading type={"bars"} color={"#fb4226"} /></div>
          :
          listMoviesByDate && listMoviesByDate.length > 0 ? listMoviesByDate.map((movie, index) => {
            return (
              <Grid key={index} item xs={12} sm={4} md={3}>
                <Link to={`/phim/${movie.maPhim}-${ToSlug(movie.tenPhim)}`}>
                  <div className="box--card" style={{ backgroundImage: `url(${movie.hinhAnh && changeHttpIntoHttps(movie.hinhAnh)}), url("../img/default-film.webp")` }}>
                    <div className="hover--info show--hover">
                      <button onClick={(e)=>handleOpenTrailer(movie.trailer,e)} className='play__trailer'>
                        <img width={50} src="../img/play-video.png" alt="play" />
                      </button>
                    </div>
                    <span className="avg__point">
                      <p>{movie.danhGia}</p>
                      <p><Rating name="half-rating-read" defaultValue={parseFloat(movie.danhGia) / 2} precision={0.5} readOnly /></p>
                    </span>
                  </div>
                </Link>
                <div className="info">
                  <div className="name__film hide--hover">
                    <span>{movie.tenPhim}</span>
                  </div>
                  <div className="info__film hide--hover">{movie.moTa}</div>
                  <div className="show--hover">
                    <Link to={`/phim/${movie.maPhim}-${ToSlug(movie.tenPhim)}`} className="buy__now">MUA VÉ</Link>
                  </div>
                </div>
              </Grid>
            )
          }) :
            <div className="loading--component" style={{ paddingBottom: '80%' }}>Không có phim đang được chiếu</div>
      )
    } else if (index === 'two') {
      let listMovies = listMoviesByDate && listMoviesByDate.filter((movie) => {
        return (
          new Date(movie.ngayKhoiChieu).getDate() !== new Date().getDate()
          || new Date(movie.ngayKhoiChieu).getMonth() !== (new Date().getMonth()+1)
          || new Date(movie.ngayKhoiChieu).getFullYear() !== new Date().getFullYear()
        )
      })
      return (
        isLoading ?
          <div className="loading--component" style={{ paddingBottom: '80%' }}><ReactLoading type={"bars"} color={"#fb4226"} /></div>
          :
          listMovies && listMovies.length > 0 ? listMovies.map((movie, index) => {
            return (
              <Grid key={index} item xs={12} sm={4} md={3}>
                <Link to={`/phim/${movie.maPhim}-${ToSlug(movie.tenPhim)}`}>
                  <div className="box--card" style={{ backgroundImage: `url(${movie.hinhAnh && changeHttpIntoHttps(movie.hinhAnh)}), url("../img/default-film.webp")` }}>
                    <div className="hover--info show--hover">
                      <button className='play__trailer' onClick={(e)=>handleOpenTrailer(movie.trailer,e)}>
                        <img width={50} src="../img/play-video.png" alt="play" />
                      </button>
                    </div>
                  </div>
                </Link>
                <div className="info">
                  <div className="name__film">
                    <span>{movie.tenPhim}</span>
                  </div>
                  <div className="info__film">{movie.moTa}</div>
                </div>
              </Grid>
            )
          }) :
            <div className="loading--component" style={{ paddingBottom: '80%' }}>Sắp tới không có phim được chiếu</div>
      )
    }
  }
  return (
    <div id="lich-chieu" className={classes.root}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        <Tab value="one" label="Đang Chiếu" />
        <Tab value="two" label="Sắp Chiếu" />
      </Tabs>
      <TabPanel value={value} index={index}>
        {renderMovies()}
      </TabPanel>
      <Trailer open={isShowTrailer} embedId={embedId} onClose={()=>{setIsShowTrailer(false)}}/>
      <Pagination className={!isLoading && listMoviesByDate ? 'd-flex' : 'd-none'} count={ index==='one' ? pageCountNow : pageCountUpComming} page={page} onChange={handleChangePage} variant="outlined" shape="rounded" />
    </div>
  )
}
