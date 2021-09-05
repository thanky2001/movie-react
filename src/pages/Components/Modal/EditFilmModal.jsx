import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, TextField } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { formatDate, ToSlug } from '../../../utils/format';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useDispatch } from 'react-redux';
import { editFilm } from '../../../actions/movies';

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
        '& .upload--img .show--img':{
            height: '68px',
            width: '60px',
        },
        '& .upload--img .MuiIconButton-root':{
            padding: 0
        },
        '& .icon--upload':{
            margin: '38px 20px 0',
            '& .MuiSvgIcon-root':{
                width: '30px',
                height: '30px'
            }
        },
        '& .title--img':{
            color: 'rgb(117, 117, 117)',
            fontSize: '16px',
        }
    },
    textArea: {
        paddingTop: '10px',
        '& textarea': {
            width: '100%'
        },
        '& label': {
            color: 'rgb(117, 117, 117)',
            fontSize: '16px',
        },
        '& textarea:focus-visible': {
            outline: 'unset'
        }
    },
    input:{
        display: 'none'
    }
}));
export default function EditFilmModal(props) {
    const classes = useStyles();
    const [isBlur, setIsBlur] = useState(null);
    const [image, setImage] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date())
    const dispatch = useDispatch();
    const { info } = props;
    useEffect(() => {
        if (info) {
            formik.setValues({ ...info});
            setSelectedDate(info.ngayKhoiChieu)
        }
    }, [info]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (selectedDate) {
            let d = formatDate(selectedDate);
            formik.setValues({ ...formik.values, ngayKhoiChieu: d });
        }
    }, [selectedDate]) // eslint-disable-line react-hooks/exhaustive-deps
    const validationSchema = yup.object({
        tenPhim: yup
            .string('')
            .required('Không được để trống'),
        trailer: yup
            .string('')
            .required('Không được để trống'),
        moTa: yup
            .string('')
            .required('Không được để trống')
    });
    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            biDanh: '',
            trailer: '',
            hinhAnh: {},
            moTa: '',
            maNhom: 'GP14',
            ngayKhoiChieu: '',
            danhGia: 8,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let frm = new FormData();
            for (let key in values) {
                frm.append(key, values[key]);
            }
            dispatch(editFilm(frm, handleCloseEditModal));
        }
    });
    const handleCloseEditModal = () => {
        props.handleClose();
        setIsBlur(null);
        setImage(null);
    }
    const onFileChange = (e) => {
        let img = e.target.files[0];
        if (img) {
            formik.setValues({ ...formik.values, hinhAnh: img });
            setImage(img);
        }
    }
    return (
        <div >
            <Dialog
                className={classes.root}
                maxWidth='lg'
                open={props.open}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Sửa phim
                </DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            fullWidth
                            name="tenPhim"
                            label="Tên phim"
                            value={formik.values.tenPhim}
                            onBlur={() => { setIsBlur('tenPhim'); formik.setValues({ ...formik.values, biDanh: ToSlug(formik.values.tenPhim) }) }}
                            onChange={formik.handleChange}
                            error={(formik.touched.tenPhim && Boolean(formik.errors.tenPhim)) || (isBlur === 'tenPhim' && Boolean(formik.errors.tenPhim)) || (Boolean(formik.values.tenPhim) && Boolean(formik.errors.tenPhim))}
                            helperText={(formik.touched.tenPhim && formik.errors.tenPhim) || (isBlur === 'tenPhim' && formik.errors.tenPhim) || (Boolean(formik.values.tenPhim) && formik.errors.tenPhim)}
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                className='custom-input mr-3'
                                ampm={true}
                                name="ngayKhoiChieu"
                                label="Ngày khởi chiếu"
                                format="dd/MM/yyyy"
                                onChange={setSelectedDate}
                                value={selectedDate}
                            />
                        </MuiPickersUtilsProvider>
                        <TextField
                            className='custom-input ml-3'
                            name="trailer"
                            label="Trailer"
                            placeholder='Ex: https://www.youtube.com/watch?v=mCDjM8hvG2o'
                            value={formik.values.trailer}
                            onBlur={() => setIsBlur('trailer')}
                            onChange={formik.handleChange}
                            error={(formik.touched.trailer && Boolean(formik.errors.trailer)) || (isBlur === 'trailer' && Boolean(formik.errors.trailer)) || (Boolean(formik.values.trailer) && Boolean(formik.errors.trailer))}
                            helperText={(formik.touched.trailer && formik.errors.trailer) || (isBlur === 'trailer' && formik.errors.trailer) || (Boolean(formik.values.trailer) && formik.errors.trailer)}
                        />
                        <span className='title--img'>Hình ảnh</span>
                        <div className='upload--img'>
                            <div style={image || formik.values.hinhAnh ? { display: 'block' } : { display: 'none' }} className='show--img'>
                                <img src={image ? URL.createObjectURL(image): formik.values.hinhAnh} alt='  ' />
                            </div>
                            <input accept="image/*" onChange = {onFileChange} className={classes.input} id="image" type="file" />
                            <label htmlFor="image" className='icon--upload'>
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                            <label className='icon--upload mx-0 d-flex align-items-center'>{formik.values.hinhAnh && formik.values.hinhAnh.name ? formik.values.hinhAnh.name.replace('http://movie0706.cybersoft.edu.vn/hinhanh/',''): 'Không có tệp nào được chọn'}</label>
                        </div>
                        <div className={`${classes.textArea} ${(formik.touched.moTa && Boolean(formik.errors.moTa)) || (isBlur === 'moTa' && Boolean(formik.errors.moTa)) || (Boolean(formik.values.moTa) && Boolean(formik.errors.moTa)) ? 'error' : ''}`}>
                            <label>Nội dung: </label>
                            <TextareaAutosize
                                name='moTa'
                                onBlur={() => setIsBlur('moTa')}
                                onChange={formik.handleChange}
                                value={formik.values.moTa}
                                minRows={5}
                                maxRows={8}
                            />
                            <p style={{ color: 'rgb(244, 67, 54)' }}>{(formik.touched.moTa && formik.errors.moTa) || (isBlur === 'moTa' && formik.errors.moTa) || (Boolean(formik.values.moTa) && formik.errors.moTa)}</p>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => handleCloseEditModal(props.handleClose)}
                            color='primary'
                            variant="contained" >
                            Đóng
                        </Button>
                        <Button type='submit' variant="contained" color='primary'  >
                            Sửa
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}