import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { getListCinemasBySystem } from '../../../actions/cinemas';
import { formatDateTime } from '../../../utils/format';
import { createFilmSchedule } from '../../../actions/createFilmSchedule';
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiButton-label': {
            color: '#fff '
        },
        '& .MuiTextField-root.custom-input': {
            width: 'calc(50% - 1rem)',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                margin: '0 !important'
            }
        },
    }
}));
export default function CreateCalendar(props) {
    const classes = useStyles();
    const [listRooms, setListRooms] = useState(null)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isChooseFilm, setIsChooseFilm] = useState(false);
    const [isChooseRoom, setIsChooseRoom] = useState(false);
    const [idSystemCinema, setIdSystemCinema] = useState('0');
    const [idCinema, setIdCinema] = useState('0');
    const { listFilmsCreateCalendar } = useSelector(state => state.moviesReducer);
    const { parentCinemas, listCinemasBySystem } = useSelector(state => state.cinemasReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        let date = formatDateTime(selectedDate);
        formik.setValues({ ...formik.values, ngayChieuGioChieu: date })
    }, [selectedDate]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        dispatch(getListCinemasBySystem(idSystemCinema))
    }, [idSystemCinema]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        let rooms = listCinemasBySystem && listCinemasBySystem.filter(ci=>ci.maCumRap === idCinema);
        rooms && rooms.length ? setListRooms(rooms[0].danhSachRap) : setListRooms(null);
    }, [idCinema]) // eslint-disable-line react-hooks/exhaustive-deps
    const validationSchema = yup.object({
        giaVe: yup
            .number()
            .required('Không được để trống')
    });
    const formik = useFormik({
        initialValues: {
            ngayChieuGioChieu: '',
            maRap: '0',
            giaVe: 0,
            maPhim: '0',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (values.maPhim === '0' && values.maPhim === '0') {
                setIsChooseFilm(true);
                setIsChooseRoom(true);
            }else if (values.maRap === '0'){
                setIsChooseRoom(true)
            }else if(values.maPhim === '0') {
                setIsChooseFilm(true);
            }else {
                setIsChooseRoom(false);
                setIsChooseFilm(false);
                dispatch(createFilmSchedule(values, handleCloseAddModal))
            }
        },
    });
    const handleCloseAddModal = () => {
        props.handleClose();
        formik.handleReset();
        setIsChooseFilm(false);
        setIsChooseRoom(false);
        setIdCinema('0');
        setIdSystemCinema('0');
        setListRooms(null);
    }
    const handleChangeFilm = (e) => {
        if (e.target.value === '0') {
            setIsChooseFilm(true);
        } else {
            setIsChooseFilm(false);
        }
        formik.handleChange(e)
    }
    const handleChangeRoom = (e) => {
        if (e.target.value === '0') {
            setIsChooseRoom(true);
        } else {
            setIsChooseRoom(false);
        }
        formik.handleChange(e)
    }
    const handleChangePrice=(e)=>{
        const {value} = e.target;
        const price = parseFloat(value);
        if (!Number.isNaN(price)) {
            formik.setValues({...formik.values, giaVe: price});
        }else{
            formik.setValues({...formik.values, giaVe: 0})
        }
    }
        return (
        <div >
            <Dialog
                className={classes.root}
                maxWidth='sm'
                open={props.open}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Tạo lịch chiếu
                </DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            fullWidth
                            id="standard-select-currency-native"
                            select
                            label="Phim"
                            name="maPhim"
                            value={formik.values.maPhim}
                            onChange={handleChangeFilm}
                            SelectProps={{
                                native: true,
                            }}
                            error={isChooseFilm}
                            helperText={isChooseFilm ? 'Vui lòng chọn phim' : ''}
                        >
                            <option value='0' >Chọn phim...</option>
                            {
                                listFilmsCreateCalendar && listFilmsCreateCalendar.map((film, index) => {
                                    return (
                                        <option key={index} value={film.maPhim}>
                                            {film.tenPhim}
                                        </option>
                                    )
                                })
                            }
                        </TextField>
                        <TextField
                            className='custom-input mr-3'
                            id="standard-select-currency-native"
                            select
                            label="Hệ thống rạp"
                            name="maHeThongRap"
                            value={idSystemCinema}
                            onChange={(e) => setIdSystemCinema(e.target.value)}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value='0' >Chọn...</option>
                            {
                                parentCinemas && parentCinemas.map((ci, index) => {
                                    return (
                                        <option key={index} value={ci.maHeThongRap}>
                                            {ci.tenHeThongRap}
                                        </option>
                                    )
                                })
                            }
                        </TextField>
                        <TextField
                            className='custom-input ml-3'
                            id="standard-select-currency-native"
                            select
                            label="Cụm rạp"
                            name="maCumRap"
                            value={idCinema}
                            onChange={(e)=>setIdCinema(e.target.value)}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value='0' >Chọn...</option>

                            {
                                listCinemasBySystem ? listCinemasBySystem.map((ci, index) => {
                                    return (
                                        <option key={index} value={ci.maCumRap}>
                                            {ci.tenCumRap}
                                        </option>
                                    )
                                }) :
                                    <option value='0'>Vui lòng chọn hệ thống rạp</option>
                            }
                        </TextField>
                        <TextField
                            className='custom-input mr-3'
                            id="standard-select-currency-native"
                            select
                            label="Rạp"
                            name="maRap"
                            value={formik.values.maRap}
                            onChange={handleChangeRoom}
                            SelectProps={{
                                native: true,
                            }}
                            error={isChooseRoom}
                            helperText={isChooseRoom ? 'Vui lòng chọn rạp' : ''}
                        >
                            <option value='0' >Chọn...</option>
                            {
                                listRooms ? listRooms.map((room, index) => {
                                    return (
                                        <option key={index} value={room.maRap}>
                                            {room.tenRap}
                                        </option>
                                    )
                                }):
                                <option value='0' >Vui lòng chọn hệ thống rạp, cụm rạp</option>
                            }
                        </TextField>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                                className='custom-input ml-3'
                                ampm={true}
                                format="dd/MM/yyyy'T'HH:mm:ss"
                                name="ngayChieuGioChieu"
                                label="Thời gian chiếu"
                                onChange={setSelectedDate}
                                value={selectedDate}
                                error={false}
                                helperText=''
                            />
                        </MuiPickersUtilsProvider>
                        <TextField
                            fullWidth
                            name="giaVe"
                            label="Giá vé"
                            value={formik.values.giaVe}
                            onChange={handleChangePrice}
                            error={(formik.touched.giaVe && (Boolean(formik.errors.giaVe))) || (Boolean(formik.values.giaVe) && (Boolean(formik.errors.giaVe)))}
                            helperText={(formik.touched.giaVe && formik.errors.giaVe) || (Boolean(formik.values.giaVe) && formik.errors.giaVe)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => handleCloseAddModal(props.handleClose)}
                            color='primary'
                            variant="contained" >
                            Đóng
                        </Button>
                        <Button type='submit' variant="contained" color='primary'  >
                            Tạo lịch
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}
