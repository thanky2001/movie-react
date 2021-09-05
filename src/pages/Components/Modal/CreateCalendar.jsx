import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
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
    const [isBlur, setIsBlur] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [isChooseType, setIsChooseFilm] = useState(false)
    const { listFilmsCreateCalendar } = useSelector(state => state.moviesReducer);
    const dispatch = useDispatch();
    const validationSchema = yup.object({
        taiKhoan: yup
            .string('Nhập tài khoản')
            .min(5, 'Tài khoản phải từ 5 đến 20 ký tự')
            .max(20, 'Tài khoản phải từ 5 đến 20 ký tự')
            .required('không được để trống'),
        matKhau: yup
            .string('Nhập mật khẩu')
            .required('Không được để trống'),
        email: yup
            .string('Nhập email')
            .email('Không đúng định dạng')
            .required('Không được để trống'),
        giaVe: yup
            .number('Chỉ được nhập số'),
    });
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            hoTen: '',
            maNhom: 'GP14',
            email: '',
            giaVe: '',
            maPhim: '0',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
            if (values.maLoaiNguoiDung === '0' || (formik.values.giaVe !== '' && !regex.test(formik.values.giaVe))) {
                setIsChooseFilm(true);
            } else {
                setIsChooseFilm(false);
            }
        },
    });
    function validateNumberPhone() {
        let regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        if (formik.values.giaVe !== '' && !regex.test(formik.values.giaVe)) {
            let error = 'Không đúng định dạng';
            return error;
        }
    }
    const handleCloseAddModal = () => {
        props.handleClose();
        formik.handleReset();
        setIsBlur(null);
        setIsChooseFilm(false);
    }
    const handleChangeFilm = (e) => {
        if (e.target.value === '0') {
            setIsChooseFilm(true);
        } else {
            setIsChooseFilm(false);
        }
        formik.handleChange(e)
    }
    console.log(formik.values.maPhim);
    return (
        <div >
            <Dialog
                className={classes.root}
                maxWidth='sm'
                open={props.open}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Thêm người dùng
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
                            error={isChooseType}
                            helperText={isChooseType ? 'Vui lòng chọn phim' : ''}
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
                            value={formik.values.maHeThongRap}
                            onChange={handleChangeFilm}
                            SelectProps={{
                                native: true,
                            }}
                            error={isChooseType}
                            helperText={isChooseType ? 'Vui lòng chọn hệ thống rạp' : ''}
                        >
                            <option value='0' >Chọn...</option>
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
                            className='custom-input ml-3'
                            id="standard-select-currency-native"
                            select
                            label="Cụm rạp"
                            name="maCumRap"
                            value={formik.values.maCumRap}
                            onChange={handleChangeFilm}
                            SelectProps={{
                                native: true,
                            }}
                            error={isChooseType}
                            helperText={isChooseType ? 'Vui lòng chọn cụm rạp' : ''}
                        >
                            <option value='0' >Chọn...</option>
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
                            label="Rạp"
                            name="maRap"
                            value={formik.values.maRap}
                            onChange={handleChangeFilm}
                            SelectProps={{
                                native: true,
                            }}
                            error={isChooseType}
                            helperText={isChooseType ? 'Vui lòng chọn rạp' : ''}
                        >
                            <option value='0' >Chọn...</option>
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
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                                className='custom-input ml-3'
                                ampm={true}
                                format="dd/MM/yyyy'T'HH:mm:ss"
                                name="ngayKhoiChieu"
                                label="Ngày khởi chiếu"
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
                            onBlur={() => setIsBlur('giaVe')}
                            onChange={formik.handleChange}
                            error={(formik.touched.giaVe && Boolean(validateNumberPhone())) || (Boolean(formik.values.giaVe) && Boolean(validateNumberPhone()))}
                            helperText={(formik.touched.giaVe && validateNumberPhone()) || (Boolean(formik.values.giaVe) && validateNumberPhone())}
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
                            Thêm
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}
