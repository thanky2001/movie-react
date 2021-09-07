import { Button, Grid, Hidden, InputBase, makeStyles, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, List, ListItem, Tooltip } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Cinemas from './Cinemas';
import '../admin.css';
import '../../../styles/Layout/Content.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getShowtimeByParentCinemas } from '../../../actions/getShowtimeByParentCinema';
import { getHeight } from '../../../utils/size';
import { dayOfWeeks } from '../../../utils/dayOfWeeks';
import CreateCalendar from '../../Components/Modal/CreateCalendar';
import { useAutocomplete } from '@material-ui/lab';
import { getListMovies } from '../../../actions/movies';
import { withStyles } from '@material-ui/styles';
import { StyledTableRow } from '../../Components/CustomElement/StyledTableRow';
import { splitDateString } from '../../../utils/format';
import ReactLoading from 'react-loading';


const height = getHeight();

const StyledTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 240,
        fontSize: theme.typography.pxToRem(14),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '4px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 300,
        '& .MuiSvgIcon-root': {
            fill: '#a2a2a2'
        },
        '& .MuiIconButton-root': {
            padding: '4px 12px'
        },
        '& .day-of-week': {

        },
        '& MuiListItem-root.Mui-selected, & .MuiListItem-root.Mui-selected:hover': {
            color: 'red',
            backgroundColor: 'unset'
        }
    },
    select: {
        fontWeight: 600,
        '&.MuiListItem-root.Mui-selected, &.MuiListItem-root.Mui-selected:hover': {
            color: 'red',
            backgroundColor: 'unset'
        }
    },
    height: {
        height: `${height - 56}px`,
        [theme.breakpoints.down('xs')]: {
            height: `${height - 194}px`,
        }
    },
    tableHeight: {
        height: `${height - 122}px`,
        [theme.breakpoints.down('xs')]: {
            height: `${height - 260}px`,
        }
    },
    button: {
        textTransform: 'unset',
        [theme.breakpoints.down('xs')]: {
            padding: 0,
            '& .MuiButton-endIcon': {
                margin: 0
            }
        }
    },
    table: {
        minWidth: 300,
        '& tr th, & tr td': {
            whiteSpace: 'nowrap',
        },
    },
    contentTable: {
        position: 'relative',
        '& .custom--table-cell': {
            padding: '6px 16px'
        }
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    searchDel: {
        cursor: 'pointer',
        width: '20px'
    },
    listbox: {
        width: 300,
        margin: 0,
        padding: 0,
        zIndex: 999,
        position: 'absolute',
        listStyle: 'none',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        maxHeight: 200,
        border: '1px solid rgba(0,0,0,.25)',
        '& li[data-focus="true"]': {
            backgroundColor: '#4a8df6',
            color: 'white',
            cursor: 'pointer',
        },
        '& li:active': {
            backgroundColor: '#2977f5',
            color: 'white',
        },
    },
}));
export default function Index() {
    const classes = useStyles();
    const [valueSearch, setValueSearch] = useState(null);
    const [listDay, setListDay] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState(0);
    const { parentCinemas, isLoading } = useSelector(state => state.cinemasReducer);
    const { ListMoviesByParentCinemas, isReload } = useSelector(state => state.moviesReducer);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const {
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
    } = useAutocomplete({
        id: 'use-autocomplete-demo',
        options: ListMoviesByParentCinemas ? ListMoviesByParentCinemas : [{ tenPhim: '', maPhim: '' }],
        getOptionLabel: (option) => option.tenPhim,
        onChange: (e, value) => setValueSearch(value && value.maPhim),
        getOptionSelected: (option, value) => option.maPhim === value.maPhim
    });
    useEffect(() => {
        setListDay(dayOfWeeks());
        dispatch(getListMovies())
    }, [new Date().getDate()]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        const idCi = location.pathname.split('/')[3];
        if (location.pathname === '/admin/quan-ly-lich-chieu' && parentCinemas) {
            history.push(`/admin/quan-ly-lich-chieu/${parentCinemas[0].maHeThongRap}`)
        }
        idCi && dispatch(getShowtimeByParentCinemas(idCi));
        setSelectedDay(0)
    }, [location, parentCinemas, isReload]) // eslint-disable-line react-hooks/exhaustive-deps
    const handleOpenModal = () => {
        setIsOpenModal(true)
    }
    const handleCloseModal = () => {
        setIsOpenModal(false)
    }
    return (
        ! isLoading ?
            <Grid container >
                <Grid item xs={12}>
                    <div className='admin--title'>
                        <span> Lịch chiếu </span>
                        <Hidden xsDown>
                            <div style={{ position: 'relative' }}>
                                <Paper component="div" className={classes.root}>
                                    <SearchIcon />
                                    <InputBase
                                        className={classes.input}
                                        placeholder="Tìm kiếm..."
                                        inputProps={{ 'aria-label': 'Tìm kiếm...', ...getInputProps() }}
                                    />
                                </Paper>
                                {groupedOptions.length > 0 ? (
                                    <ul className={classes.listbox} {...getListboxProps()}>
                                        {groupedOptions.map((option, index) => (
                                            <li className='text--name' {...getOptionProps({ option, index })}>{option.tenPhim}</li>
                                        ))}
                                    </ul>
                                ) : null}
                            </div>
                        </Hidden>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={handleOpenModal}
                            endIcon={<AddIcon />}
                        >
                            <Hidden xsDown implementation="css">
                                Tạo lịch
                            </Hidden>
                        </Button>
                    </div>
                </Grid>
                <Cinemas date={listDay && listDay[selectedDay].date} setSelectedDay={setSelectedDay} valueSearch={valueSearch} />
                <Grid item xs={12} sm={9}>
                    <Paper className={classes.height} >
                        <TableContainer className={classes.contentTable}>
                            <Table className={classes.table} stickyHeader aria-label="caption table">
                                <TableBody>
                                    {/* <TableRow> */}
                                    <List component='tr'>
                                        {listDay && listDay.map((day, index) => {
                                            return (
                                                <TableCell className='btn' component='td' key={index}>
                                                    <ListItem className={classes.select} disableGutters={true} onClick={() => setSelectedDay(index)} selected={selectedDay === index}>{day.dayName} <br /> {day.date}</ListItem>
                                                </TableCell>
                                            )
                                        })}
                                    </List>
                                    {/* </TableRow> */}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TableContainer className={`${classes.contentTable} ${classes.tableHeight}`}>
                            <Table className={classes.table} stickyHeader aria-label="caption table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Phim</TableCell>
                                        <TableCell >Rạp</TableCell>
                                        <TableCell >Thời gian chiếu</TableCell>
                                        <TableCell >Giá vé(VNĐ) </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ListMoviesByParentCinemas && ListMoviesByParentCinemas.length ? ListMoviesByParentCinemas.map((film, index) => (
                                        <StyledTableRow key={index}>
                                            <TableCell scope="row">
                                                <div className='name--film'>
                                                    <div className='img--film'><img src={film.hinhAnh} alt='   ' /></div>
                                                    <StyledTooltip placement="bottom-start" title={film.tenPhim}>
                                                        <span className='hidden--text'>{film.tenPhim}</span>
                                                    </StyledTooltip>
                                                </div>
                                            </TableCell>
                                            <TableCell className='px-0 py-2'>
                                                <Table>
                                                    <TableBody>
                                                        {
                                                            film.lstLichChieuTheoPhim && film.lstLichChieuTheoPhim.map((st, i) => {
                                                                return (
                                                                    <TableRow key={i}>
                                                                        <TableCell className='custom--table-cell'>{st.tenRap}</TableCell>
                                                                    </TableRow>
                                                                )
                                                            })
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableCell>
                                            <TableCell className='p-0'>
                                                <Table>
                                                    <TableBody>
                                                        {
                                                            film.lstLichChieuTheoPhim && film.lstLichChieuTheoPhim.map((st, i) => {
                                                                return (
                                                                    <TableRow key={i}>
                                                                        <TableCell className='custom--table-cell'>{splitDateString(st.ngayChieuGioChieu)[1]}</TableCell>
                                                                    </TableRow>
                                                                )
                                                            })
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableCell>
                                            <TableCell className='p-0'>
                                                <Table>
                                                    <TableBody>
                                                        {
                                                            film.lstLichChieuTheoPhim && film.lstLichChieuTheoPhim.map((st, i) => {
                                                                return (
                                                                    <TableRow key={i}>
                                                                        <TableCell className='custom--table-cell'>{st.giaVe.toLocaleString('it-IT')}</TableCell>
                                                                    </TableRow>
                                                                )
                                                            })
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableCell>
                                        </StyledTableRow>
                                    )) :
                                        <TableRow>
                                            <TableCell style={{ textAlign: 'center', borderBottom: 0 }} colSpan={6}>Không có dữ liệu...</TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    <CreateCalendar open={isOpenModal} handleClose={handleCloseModal} />
                </Grid>
            </Grid > :
            <div className="loading--component"><ReactLoading type={"bars"} color={"#fb4226"} /></div>
    )
}
