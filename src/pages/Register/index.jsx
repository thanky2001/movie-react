import React, { useEffect, useState } from 'react';
import { Link, Prompt, useHistory } from 'react-router-dom';
import { CircularProgress, makeStyles, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/auth';

//style css text field
const useStyle = makeStyles({
    root: {
        '& label.Mui-focused': {
            color: '#fff',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#fff',
        },
        '& .MuiFormLabel-root': {
            color: '#bdbdbd'
        },
        '& .MuiInput-underline::before': {
            borderBottom: '1px solid #bdbdbd'
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled)::before': {
            borderBottom: '2px solid #a1a0a0'
        },
        '& .MuiInputBase-root': {
            color: '#fff',
        },
        '& .MuiFormLabel-root.Mui-disabled': {
            color: '#525252'
        }
    },
});
export default function Index() {
    const [values, setValues] = useState({
        taiKhoan: '',
        matKhau: '',
        nhapLai: '',
        maNhom: "GP14",
        maLoaiNguoiDung: "KhachHang",
        hoTen: '',
        email: '',
        soDT: '',
    })
    const [errors, setErrors] = useState({
        taiKhoan: '',
        matKhau: '',
        nhapLai: '',
        hoTen: '',
        email: '',
        soDT: '',
    })
    const dispatch = useDispatch();
    const { userInfo, errorRegister, isLoading } = useSelector((state) => state.authReducer);
    const history = useHistory();
    useEffect(() => {
        if (userInfo) {
            history.push('/login')
        }
    }, [userInfo]) // eslint-disable-line react-hooks/exhaustive-deps
    const handleChange = (e) => {
        let { value, name } = e.target;
        let errorMessage = "";
        let valuesUp = { ...values, [name]: value };
        if (name !== 'soDT' && name !== 'hoTen') {
            if (value.trim() === '') {
                errorMessage = "Kh??ng ???????c ????? tr???ng";
            }
        }
        if (name === 'taiKhoan' && (value.length < 5 || value.length > 20)) {
            errorMessage = "T??i kho???n ph???i t??? 5 ?????n 20 k?? t???";
        }
        if (name === 'email') {
            let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
            if (!regex.test(value)) {
                errorMessage = 'Kh??ng ????ng ?????nh d???ng';
            }
        }
        if (name === 'soDT') {
            if (value.trim() !== '') {
                let regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
                if (!regex.test(value)) {
                    errorMessage = 'Kh??ng ????ng ?????nh d???ng';
                }
            } else {
                errorMessage = ''
            }
        }
        if (name === 'nhapLai') {
            if (value !== values['matKhau']) {
                errorMessage = 'M???t kh???u kh??ng tr??ng kh???p';
            }
        }
        let errorsUp = { ...errors, [name]: errorMessage };
        setValues(valuesUp);
        setErrors(errorsUp);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;
        let errorMessage = {};
        for (let key in values) {
            if (key !== 'hoTen' && key !== 'soDT') {
                if (values[key] === '') {
                    valid = false;
                    errorMessage = { ...errorMessage, [key]: "Kh??ng ???????c ????? tr???ng", "hoTen": "", "soDT": "" }

                }
            }
        }
        for (let key in errors) {
            if (errors[key] !== '') {
                valid = false;
                errorMessage = { ...errorMessage, [key]: "Kh??ng ???????c ????? tr???ng" }
            }
        };
        if (valid) {
            dispatch(register(values));
        } else {
            setErrors(errorMessage);
        }
    }
    const checkValue=()=>{
        if (!userInfo) {
            for (let key in values) {
                if (values[key] === '') {
                    return false
                }else{
                    return true;
                }
            }
        }else{
            return false
        }
    }
    const blockReload=()=>{
            if (checkValue()) {
                window.onbeforeunload = function () {
                    return true;
                }
            }else{
                window.onbeforeunload = null;
            }
    }
    blockReload()
    const classes = useStyle();
    return (
        <div id="register">
            <div className="login__wraper">
                <Link className='close--wraper' to="/"><div className="login--close"></div></Link>
                <div className="login--header"><Link to="/" ><img src="../img/group@2x.png" alt="group@2x.png" /></Link></div>
                <form onSubmit={handleSubmit} className={`${classes.root} login--form-group`}>
                    <TextField
                        error={errors.taiKhoan && errors.taiKhoan.trim() !== '' ? true : false}
                        name='taiKhoan'
                        onChange={handleChange}
                        onBlur={handleChange}
                        className="login--form"
                        helperText={errors.taiKhoan}
                        label="T??i Kho???n" />
                    <TextField
                        error={errors.matKhau && errors.matKhau.trim() !== '' ? true : false}
                        name="matKhau"
                        onChange={handleChange}
                        onBlur={handleChange}
                        type="password"
                        helperText={errors.matKhau}
                        className="login--form"
                        label="M???t kh???u" />
                    <TextField
                        error={errors.nhapLai && errors.nhapLai.trim() !== '' ? true : false}
                        type="password"
                        onBlur={handleChange}
                        onChange={handleChange}
                        name='nhapLai'
                        className="login--form"
                        helperText={errors.nhapLai}
                        disabled={values.matKhau.trim() === ''}
                        label="Nh???p l???i m???t kh???u" />
                    <TextField
                        name="hoTen"
                        onChange={handleChange}
                        className="login--form"
                        label="H??? v?? t??n" />
                    <TextField
                        error={errors.email && errors.email.trim() !== '' ? true : false}
                        name="email"
                        onBlur={handleChange}
                        onChange={handleChange}
                        className="login--form"
                        helperText={errors.email}
                        label="Email" />
                    <TextField
                        error={errors.soDT && errors.soDT.trim() !== '' ? true : false}
                        name="soDT"
                        onBlur={handleChange}
                        onChange={handleChange}
                        className="login--form"
                        helperText={errors.soDT}
                        label="S??? ??i???n tho???i" />
                    {errorRegister ? <p style={{ color: '#f44336', fontSize: '0.75rem', marginBottom: '0', marginTop: '3px' }}>{errorRegister}</p> : ''}
                    <Button type='submit' variant="contained" className={`${isLoading ? 'loading' : ''} btn--orange`}>{isLoading ? <CircularProgress size={20} color='inherit' /> : '????ng K??'}</Button>
                </form>
                <div className="link--register">
                    <p>B???n ???? c?? t??i kho???n? <Link to="/login">????ng Nh???p</Link></p>
                </div>
            </div>
            <Prompt
                when={checkValue()}
                message={
                    `B???n th???c s??? mu???n r???i kh???i trang n??y?`
                } />
        </div>
    )
}
