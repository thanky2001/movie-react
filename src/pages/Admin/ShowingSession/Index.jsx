import { Button, Grid, Hidden, InputBase, makeStyles, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, List, ListItem } from '@material-ui/core'
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


const height = getHeight();

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
        minWidth: 650,
        '& tr th, & tr td': {
            whiteSpace: 'nowrap',
        },
    },
    contentTable: {
        position: 'relative'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
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
    const [valueSearch, setValueSearch] = useState('');
    const [listDay, setListDay] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState(0);
    const { parentCinemas } = useSelector(state => state.cinemasReducer);
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
        options: listDay && listDay,
        getOptionLabel: (option) => option.dayName,
        onChange: (e, value) => setValueSearch(value && value.dayName)
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
    }, [location, parentCinemas]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleOpenModal = () => {
        setIsOpenModal(true)
    }
    const handleCloseModal = () => {
        setIsOpenModal(false)
    }
    const handleChangeValuesSearch = (e) => {
        setValueSearch(e.target.value);
        console.log(valueSearch);
    }
    return (
        <Grid container>
            <Grid item xs={12}>
                <div className='admin--title'>
                    <span> Lịch chiếu </span>
                    <Hidden xsDown>
                        <div style={{ position: 'relative' }}>
                            <Paper component="div" className={classes.root}>
                                <SearchIcon />
                                <InputBase
                                    onChange={handleChangeValuesSearch}
                                    className={classes.input}
                                    placeholder="Tìm kiếm..."
                                    inputProps={{ 'aria-label': 'Tìm kiếm...', ...getInputProps() }}
                                />
                            </Paper>
                            {groupedOptions.length > 0 ? (
                                <ul className={classes.listbox} {...getListboxProps()}>
                                    {groupedOptions.map((option, index) => (
                                        <li {...getOptionProps({ option, index })}>{option.dayName}</li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                        {/* <Paper component="form" onSubmit={handleSearch} className={classes.root}>
                            <InputBase
                                onChange={handleChangeValuesSearch}
                                className={classes.input}
                                placeholder="Tìm kiếm..."
                                inputProps={{ 'aria-label': 'Tìm kiếm...' }}
                            />
                            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper> */}
                    </Hidden>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={handleOpenModal}
                        endIcon={<AddIcon />}
                    >
                        <Hidden xsDown implementation="css">
                            Thêm
                        </Hidden>
                    </Button>
                </div>
            </Grid>
            <Cinemas date={listDay && listDay[selectedDay].date} setSelectedDay={setSelectedDay}/>
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
                    <TableContainer className={classes.contentTable}>
                        <Table className={classes.table} stickyHeader aria-label="caption table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Phim</TableCell>
                                    <TableCell align="right">Mã phim</TableCell>
                                    <TableCell align="right">Trailer</TableCell>
                                    <TableCell align="right">Nội dung</TableCell>
                                    <TableCell align="right">Ngày công chiếu</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {!isLoading ?
                                    listMovies && listMovies.items.length ? listMovies.items.map((row, index) => (
                                        <StyledTableRow key={index}>
                                            <TableCell scope="row">
                                                <div className='name--film'>
                                                    <div className='img--film'><img src={row.hinhAnh} alt='   ' /></div>
                                                    <StyledTooltip placement="bottom-start" title={row.tenPhim}>
                                                        <span className='hidden--text'>{row.tenPhim}</span>
                                                    </StyledTooltip>

                                                </div>
                                            </TableCell>
                                            <TableCell align="right">{row.maPhim}</TableCell>
                                            <TableCell className='hidden--text' align="right"><a target="_blank" rel="noreferrer" href={row.trailer} >{row.trailer}</a></TableCell>
                                            <TableCell className='hidden--text mw-250' align="right">
                                                <StyledTooltip placement="bottom-start" title={row.moTa}>
                                                    <span>
                                                        {row.moTa}
                                                    </span>
                                                </StyledTooltip>
                                            </TableCell>
                                            <TableCell align="right">{formatDateToVN(row.ngayKhoiChieu)}</TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    aria-label="more"
                                                    aria-controls="long-menu"
                                                    aria-haspopup="true"
                                                    onClick={(e) => handleClickAction(e, row)}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <StyledMenu
                                                    anchorEl={anchorEl}
                                                    keepMounted
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleCloseAction}
                                                >
                                                    <MenuItem onClick={handleOpenEditModal}>
                                                        <ListItemIcon>
                                                            <EditIcon fontSize="small" />
                                                        </ListItemIcon>
                                                        <ListItemText primary="Sửa" />
                                                    </MenuItem>
                                                    <MenuItem onClick={handleDeleteFilm}>
                                                        <ListItemIcon>
                                                            <DeleteIcon fontSize="small" />
                                                        </ListItemIcon>
                                                        <ListItemText primary="Xóa" />
                                                    </MenuItem>
                                                </StyledMenu>
                                            </TableCell>
                                        </StyledTableRow>
                                    )) :
                                        <TableRow>
                                            <TableCell style={{ textAlign: 'center', borderBottom: 0 }} colSpan={6}>Không có dữ liệu...</TableCell>
                                        </TableRow>
                                    :
                                    <TableRow>
                                        <TableCell style={{ padding: '0 50%', borderBottom: 0 }} colSpan={6}><ReactLoading type={"bars"} color={"#fb4226"} /></TableCell>
                                    </TableRow>
                                } */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <CreateCalendar open={isOpenModal} handleClose={handleCloseModal} />
            </Grid>
        </Grid>
    )
}
