import {
    Button, Hidden, makeStyles, InputBase, Paper, TableContainer, Table, TableHead, TableRow,
    TableBody, IconButton, TableCell, TablePagination, MenuItem, ListItemText, ListItemIcon, Menu,
    withStyles, Tooltip
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getHeight } from '../../../utils/size';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import { debounce } from 'lodash-es';
import ReactLoading from 'react-loading';
import '../admin.css';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFilm, getPagingListMovies } from '../../../actions/movies';
import { formatDateToVN } from '../../../utils/format';
import AddFilmModal from '../../Components/Modal/AddFilmModal';
import EditFilmModal from '../../Components/Modal/EditFilmModal';
import { StyledTableRow } from '../../Components/CustomElement/StyledTableRow';
const useStyles = makeStyles((theme) => ({
    root: {
        padding: '4px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 300,
        '& .MuiSvgIcon-root': {
            fill: '#a2a2a2'
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
        height: 'calc(100% - 52px)',
        position: 'relative'
    },
    paginationTable: {
        overflow: 'hidden',
        boxShadow: '0 -1px 5px #2625251c',
        [theme.breakpoints.down('xs')]: {
            '& .MuiTablePagination-actions': {
                margin: 0
            },
            '& .MuiTablePagination-input': {
                marginRight: '8px'
            },
            '& .MuiTablePagination-toolbar': {
                paddingLeft: 0
            }
        }
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
}));

const StyledTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 240,
        fontSize: theme.typography.pxToRem(14),
        border: '1px solid #dadde9',
    },
}))(Tooltip);
const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
        '& .MuiListItemIcon-root': {
            minWidth: '40px'
        }
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
));
const height = getHeight() - 56;
export default function FilmsManager() {
    const classes = useStyles();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [valueSearch, setValueSearch] = useState('');
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [info, setInfo] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch()
    const { listMovies, isLoading, isReload } = useSelector(state => state.moviesReducer);

    useEffect(() => {
        dispatch(getPagingListMovies(rowsPerPage, page, valueSearch))
    }, [rowsPerPage, page, isReload, valueSearch]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(1);
    };
    const handleClickAction = (event, info) => {
        setInfo(info);
        setAnchorEl(event.currentTarget);
    };
    const handleCloseAction = () => {
        setAnchorEl(null);
    };
    const handleOpenAddModal = () => {
        setIsOpenAddModal(true)
    }
    const handleCloseAddModal = () => {
        setIsOpenAddModal(false)
    }
    const handleOpenEditModal = () => {
        handleCloseAction();
        setIsOpenEditModal(true);
    }
    const handleCloseEditModal = () => {
        setIsOpenEditModal(false)
    }
    const handleDeleteFilm = () => {
        handleCloseAction();
        Swal.fire({
            title: '<span style="font-size: 20px">Bạn có chắc chắn xóa phim này</span>',
            confirmButtonText: 'Xóa',
            confirmButtonColor: '#fa5238',
            showCancelButton: true,
            cancelButtonText: 'Hủy bỏ',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteFilm(info.maPhim))
            }
        })
    }
    const delaySearch = debounce((search) => { setValueSearch(search); setPage(1); }, 500)
    const handleChangeValuesSearch = (e) => {
        delaySearch(e.target.value);
    }
    return (
        <div>
            <div className='admin--title'>
                <span> Phim </span>
                <Hidden xsDown>
                    <Paper component="form" className={classes.root}>
                        <SearchIcon />
                        <InputBase
                            onChange={handleChangeValuesSearch}
                            className={classes.input}
                            placeholder="Tìm kiếm..."
                            inputProps={{ 'aria-label': 'Tìm kiếm...' }}
                        />
                    </Paper>
                </Hidden>
                <Button
                    onClick={handleOpenAddModal}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    endIcon={<AddIcon />}
                >
                    <Hidden xsDown implementation="css">
                        Thêm
                    </Hidden>
                </Button>
            </div>
            <Paper style={{ height: `${height}px` }}>
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
                            {!isLoading ?
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
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                {
                    listMovies ?
                        <TablePagination
                            className={classes.paginationTable}
                            rowsPerPageOptions={[10, 20, 50]}
                            component="div"
                            count={listMovies.totalCount}
                            rowsPerPage={rowsPerPage}
                            page={page - 1}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        /> :
                        ''
                }
            </Paper>
            <AddFilmModal open={isOpenAddModal} handleClose={handleCloseAddModal} />
            <EditFilmModal open={isOpenEditModal} handleClose={handleCloseEditModal} info={info} />
        </div>
    )
}
