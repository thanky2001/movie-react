import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';

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
        '& .MuiFormLabel-root.Mui-disabled':{
            color: '#525252'
        }
    },
});
export default function Index() {
    const [values, setValues] = useState({
        taiKhoan: '',
        matKhau: '',
        nhapLai:'',
        maNhom: "GP01",
        maLoaiNguoiDung: "KhachHang",
        hoTen:'',
        email: '',
        soDT:'',
    })
    const [errors, setErrors] = useState({
        taiKhoan: '',
        matKhau: '',
        nhapLai:'',
        hoTen:'',
        email: '',
        soDT:'',
    })
    const handleChange=(e)=>{
        let {value, name} = e.target;
        let errorMessage= "";
        let valuesUp ={...values,[name]:value};
        if (name !== 'soDT' || name !== 'hoTen') {
            if(value.trim()===''){
                errorMessage = "Không được để trống";
            }
        }
        if(name ==='taiKhoan' && (value.length < 5 || value.length > 20)){
            errorMessage= "Tài khoản phải từ 5 đến 20 ký tự";
        }
        if (name === 'email') {
            let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
            if (!regex.test(value)) {
                errorMessage = 'Không đúng định dạng';
            }
        }
        if (name === 'soDT') {
            if(value.trim() !==''){
                let regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
                if (!regex.test(value)) {
                    errorMessage = 'Không đúng định dạng';
                }
            }else{
                errorMessage =''
            }
        }
        if (name === 'nhapLai') {
            if (value !== values['matKhau']) {
                errorMessage = 'Mật khẩu không trùng khớp';
            }
        }
        let errorsUp={...errors, [name]: errorMessage};
        setValues(valuesUp);
        setErrors(errorsUp);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        let valid = true;
        let errorMessage = {};
        for (let key in values) {
            if (values[key] === '') {
                valid = false;
                errorMessage = {...errorMessage, [key]: "Không được để trống",["hoTen"]: "",["soDT"]: ""}
             
            }
        }
        for (let key in errors) {
            if (errors[key] !== '') {
                valid = false;
                errorMessage = {...errorMessage, [key]: "Không được để trống"}
            }
        };
        if(valid){
            // this.props.dispatch(login(values));
        }else{
            setErrors(errorMessage);
        }
    }
    const classes = useStyle();
    return (
        <div id="register">
            <div className="login__wraper">
                <Link className='close--wraper' to="/"><div className="login--close"></div></Link>
                <div className="login--header"><Link to="/" ><img src="./img/group@2x.png" alt="group@2x.png" /></Link></div>
                <form onSubmit={handleSubmit} className={`${classes.root} login--form-group`}>
                    <TextField
                        error = {errors.taiKhoan && errors.taiKhoan.trim() !=='' ? true : false}
                        name = 'taiKhoan' 
                        onChange={handleChange}
                        onBlur={handleChange}
                        className="login--form"
                        helperText={errors.taiKhoan}
                        label="Tài Khoản" />
                    <TextField
                        error = {errors.matKhau && errors.matKhau.trim() !=='' ? true : false}
                        name = "matKhau"
                        onChange={handleChange}
                        onBlur={handleChange}
                        type="password"
                        helperText={errors.matKhau}
                        className="login--form"
                        label="Mật khẩu" />
                    <TextField
                        error = {errors.nhapLai && errors.nhapLai.trim() !=='' ? true : false}
                        type="password"
                        onBlur={handleChange}
                        onChange={handleChange}
                        name = 'nhapLai'
                        className="login--form"
                        helperText={errors.nhapLai}
                        disabled = {values.matKhau.trim() === '' }
                        label="Nhập lại mật khẩu" />
                    <TextField
                        name = "hoTen"
                        onChange={handleChange}
                        className="login--form"
                        label="Họ và tên" />
                    <TextField
                        error = {errors.email && errors.email.trim() !=='' ? true : false}
                        name= "email"
                        onBlur={handleChange}
                        onChange={handleChange}
                        className="login--form"
                        helperText={errors.email}
                        label="Email" />
                    <TextField
                        error = {errors.soDT && errors.soDT.trim() !=='' ? true : false}
                        name = "soDT"
                        onBlur={handleChange}
                        onChange={handleChange}
                        className="login--form"
                        helperText={errors.soDT}
                        label="Số điện thoại" />
                    <Button type='submit' variant="contained" className="btn--orange">Đăng Ký</Button>
                </form>
                <div className="link--register">
                    <p>Bạn đã có tài khoản? <Link to="/login">Đăng Nhập</Link></p>
                </div>
            </div>
        </div>
    )
}
