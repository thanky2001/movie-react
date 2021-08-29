import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../actions/user';
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
export default function AddUserModal(props) {
    const classes = useStyles();
    const [isBlur, setIsBlur] = useState(null);
    const [isChooseType, setIsChooseType] = useState(false)
    const { typeUser } = useSelector(state => state.userReducer);
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
        soDt: yup
            .number('Chỉ được nhập số'),
    });
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            hoTen: '',
            maNhom: 'GP14',
            email: '',
            soDt: '',
            maLoaiNguoiDung: '0',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
            if (values.maLoaiNguoiDung === '0' || (formik.values.soDt !== '' && !regex.test(formik.values.soDt))) {
                setIsChooseType(true);
            } else {
                setIsChooseType(false);
                dispatch(addUser(values, handleCloseAddModal));
            }
        },
    });
    function validateNumberPhone() {
        let regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        if (formik.values.soDt !== '' && !regex.test(formik.values.soDt)) {
            let error = 'Không đúng định dạng';
            return error;
        }
    }
    const handleCloseAddModal = () => {
        props.handleClose();
        formik.handleReset();
        setIsBlur(null);
        setIsChooseType(false);
    }
    const handleChangeTypeUser = (e) => {
        if (e.target.value === '0') {
            setIsChooseType(true);
        } else {
            setIsChooseType(false);
        }
        formik.handleChange(e)
    }
    return (
        <div >
            <Dialog
                className={classes.root}
                maxWidth='xs'
                open={props.open}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Thêm người dùng
                </DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            fullWidth
                            name="hoTen"
                            label="Họ và tên"
                            value={formik.values.hoTen}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            fullWidth
                            name="taiKhoan"
                            label="Tài khoản"
                            value={formik.values.taiKhoan}
                            onBlur={() => setIsBlur('taiKhoan')}
                            onChange={formik.handleChange}
                            error={(formik.touched.taiKhoan && Boolean(formik.errors.taiKhoan)) || (isBlur === 'taiKhoan' && Boolean(formik.errors.taiKhoan)) || (Boolean(formik.values.taiKhoan) && Boolean(formik.errors.taiKhoan))}
                            helperText={(formik.touched.taiKhoan && formik.errors.taiKhoan) || (isBlur === 'taiKhoan' && formik.errors.taiKhoan) || (Boolean(formik.values.taiKhoan) && formik.errors.taiKhoan)}
                        />
                        <TextField
                            fullWidth
                            id="password"
                            name="matKhau"
                            label="Mật khẩu"
                            type="password"
                            value={formik.values.password}
                            onBlur={() => setIsBlur('matKhau')}
                            onChange={formik.handleChange}
                            error={(formik.touched.matKhau && Boolean(formik.errors.matKhau)) || (isBlur === 'matKhau' && Boolean(formik.errors.matKhau)) || (Boolean(formik.values.matKhau) && Boolean(formik.errors.matKhau))}
                            helperText={(formik.touched.matKhau && formik.errors.matKhau) || (Boolean(formik.errors.matKhau) && formik.errors.matKhau)}
                        />
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onBlur={() => setIsBlur('email')}
                            onChange={formik.handleChange}
                            error={(formik.touched.email && Boolean(formik.errors.email)) || (isBlur === 'email' && Boolean(formik.errors.email)) || (Boolean(formik.values.email) && Boolean(formik.errors.email))}
                            helperText={(formik.touched.email && formik.errors.email) || (isBlur === 'email' && formik.errors.email) || (Boolean(formik.values.email) && formik.errors.email)}
                        />
                        <TextField
                            className='custom-input mr-3'
                            name="soDt"
                            label="Số điện thoại"
                            value={formik.values.soDt}
                            onBlur={() => setIsBlur('soDt')}
                            onChange={formik.handleChange}
                            error={(formik.touched.soDt && Boolean(validateNumberPhone())) || (Boolean(formik.values.soDt) && Boolean(validateNumberPhone()))}
                            helperText={(formik.touched.soDt && validateNumberPhone()) || (Boolean(formik.values.soDt) && validateNumberPhone())}
                        />
                        <TextField
                            id="standard-select-currency-native"
                            className='custom-input ml-3'
                            select
                            label="Chức vụ"
                            name="maLoaiNguoiDung"
                            value={formik.values.maLoaiNguoiDung}
                            onChange={handleChangeTypeUser}
                            SelectProps={{
                                native: true,
                            }}
                            error={isChooseType}
                            helperText={isChooseType ? 'Vui lòng chọn chức vụ' : ''}
                        >
                            <option value='0' >Chọn...</option>
                            {
                                typeUser && typeUser.map((type, index) => {
                                    return (
                                        <option key={index} value={type.maLoaiNguoiDung}>
                                            {type.tenLoai}
                                        </option>
                                    )
                                })
                            }
                        </TextField>
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
