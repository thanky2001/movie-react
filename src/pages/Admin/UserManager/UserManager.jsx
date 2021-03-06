import React, { useEffect, useState } from 'react';
import { getHeight } from '../../../utils/size';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Hidden, IconButton, Menu, MenuItem, TablePagination, withStyles, ListItemIcon, ListItemText, InputBase } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import '../admin.css'
import { getListUser } from '../../../actions/getListUser';
import EditIcon from '@material-ui/icons/Edit';
import ReactLoading from 'react-loading';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import AddUserModal from '../../User/AddUserModal';
import EditUserModal from '../../User/EditUserModal';
import { getListTypeUser } from '../../../actions/getListTypeUser';
import SearchIcon from '@material-ui/icons/Search';
import Swal from 'sweetalert2';
import { deleteUser } from '../../../actions/user';
import { debounce } from 'lodash';
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
    table: {
        minWidth: 650,
        '& tr th, & tr td': {
            whiteSpace: 'nowrap',
        }
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
    button: {
        textTransform: 'unset',
        [theme.breakpoints.down('xs')]: {
            padding: 0,
            '& .MuiButton-endIcon': {
                margin: 0
            }
        }
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    }
}));
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
export default function UserManager() {
    const classes = useStyles();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [valueSearch, setValueSearch] = useState('');
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [info, setInfo] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch()
    const { listUser, isLoading, isReload } = useSelector(state => state.userReducer);
    useEffect(() => {
        dispatch(getListUser(rowsPerPage, page, valueSearch))
    }, [rowsPerPage, page, isReload, valueSearch]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        dispatch(getListTypeUser());
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
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
    const handleDeleteUser = () => {
        handleCloseAction();
        Swal.fire({
            title: '<span style="font-size: 20px">B???n c?? ch???c ch???n x??a ng?????i d??ng n??y</span>',
            confirmButtonText: 'X??a',
            confirmButtonColor: '#fa5238',
            showCancelButton: true,
            cancelButtonText: 'H???y b???',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUser(info.taiKhoan))
            }
        })
    }
    const delaySearch = debounce((search) => {setValueSearch(search);setPage(1);}, 500)
    const handleChangeValuesSearch = (e) => {
        delaySearch(e.target.value);
    }
    return (

        <div>
            <div className='admin--title'>
                <span> Ng?????i d??ng </span>
                <Hidden xsDown>
                    <Paper component="form" className={classes.root}>
                        <SearchIcon />
                        <InputBase
                            onChange={handleChangeValuesSearch}
                            className={classes.input}
                            placeholder="T??m ki???m..."
                            inputProps={{ 'aria-label': 'T??m ki???m...' }}
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
                        Th??m
                    </Hidden>
                </Button>
            </div>
            <Paper style={{ height: `${height}px` }}>
                <TableContainer className={classes.contentTable}>
                    <Table className={classes.table} stickyHeader aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell>T??i kho???n</TableCell>
                                <TableCell align="right">T??n ng?????i d??ng</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">S??? ??i???n tho???i</TableCell>
                                <TableCell align="right">Ch???c v???</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {!isLoading ?
                                listUser && listUser.items.length ? listUser.items.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {row.taiKhoan}
                                        </TableCell>
                                        <TableCell align="right">{row.hoTen}</TableCell>
                                        <TableCell align="right">{row.email}</TableCell>
                                        <TableCell align="right">{row.soDt}</TableCell>
                                        <TableCell align="right">{row.maLoaiNguoiDung}</TableCell>
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
                                                    <ListItemText primary="S???a" />
                                                </MenuItem>
                                                <MenuItem onClick={handleDeleteUser}>
                                                    <ListItemIcon>
                                                        <DeleteIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText primary="X??a" />
                                                </MenuItem>
                                            </StyledMenu>
                                        </TableCell>
                                    </StyledTableRow>
                                )) :
                                    <TableRow>
                                        <TableCell style={{ textAlign: 'center', borderBottom: 0 }} colSpan={6}>Kh??ng c?? d??? li???u...</TableCell>
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
                    listUser ?
                        <TablePagination
                            className={classes.paginationTable}
                            rowsPerPageOptions={[10, 20, 50]}
                            component="div"
                            count={listUser.totalCount}
                            rowsPerPage={rowsPerPage}
                            page={page - 1}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        /> :
                        ''
                }
            </Paper>
            <AddUserModal open={isOpenAddModal} handleClose={handleCloseAddModal} />
            <EditUserModal open={isOpenEditModal} handleClose={handleCloseEditModal} infoEdit={info} />
        </div>
    )
}
