import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField } from '@material-ui/core';
import React, {useState } from 'react';
import ReactLoading from 'react-loading';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserInfo} from '../../actions/user';

const useStyles = makeStyles(() => ({
    root: {
        '& .MuiDialog-paper': {
            margin: '0 !important',
            minWidth: '400px',
        },
        '& .MuiDialogContent-root:first-child':{
            paddingTop: '0'
        },
        '& .MuiPaper-rounded': {
            borderRadius: '0',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, .45)'
        },
        '& .MuiTypography-h6':{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        '& .MuiFab-root':{
            color: '#949494',
            border: '1px solid #949494',
            boxShadow: 'unset',
            backgroundColor: '#fff'
        },
        '& .MuiFab-root:hover':{
            backgroundColor: '#fb4226',
            border: '1px solid #fb4226',
            color: '#fff'
        },
        '& .MuiButton-contained':{
            color: '#fff !important'
        },
        '& .change__password':{
            float: 'right',
            marginBottom: '0',
            cursor: 'pointer',
            paddingTop:'5px',
        },
        '& .change__password:hover':{
            color: '#fb4226'
        },
        '& .btn--orange':{
            marginTop: '0 !important'
        },
        '& .MuiDialogActions-root':{
            padding: '16px',
        }
    },
}));
export default function ModalUserInfo(props) {
    const dispatch = useDispatch();
    const {currentUser, isLoading} = useSelector(state => state.userReducer);
    const classes = useStyles();
    const [isChangeInfo, setIsChangeInfo] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [isCheck, setIsCheck] = useState(false)
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({
        matKhau: '',
        nhapLai:'',
        matKhauMoi:'',
        email: '',
        soDT:'',
    });
    const handleChange=(e)=>{
        let {value, name} = e.target;
        let errorMessage= "";
        let valuesUp ={...values,[name]:value};
        if (name !== 'soDT' && name !== 'hoTen') {
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
            if (value !== values['matKhauMoi']) {
                errorMessage = 'Mật khẩu không trùng khớp';
            }
        }
        let errorsUp={...errors, [name]: errorMessage};
        setValues(valuesUp);
        setErrors(errorsUp);
    }
    const handleChangeInfo=()=>{
        setIsChangeInfo(true);
        !isCheck ?
        setValues({...currentUser,maLoaiNguoiDung: "KhachHang",}) :
        setValues({...values,maLoaiNguoiDung: "KhachHang",})
        setIsCheck(true);

    }
    const handleCloseChange=(e)=>{
        e.preventDefault();
        setIsChangeInfo(false);
        props.handleClose();
        handleCloseChangPassword();
        setIsCheck(false);
        setErrors({
            nhapLai:'',
            matKhauMoi:'',
            hoTen:'',
            email: '',
            soDT:'',
        })
    }
    const handleChangPassword=()=>{
        setIsChangePassword(true);
        !isCheck ?
        setValues({...currentUser,maLoaiNguoiDung: "KhachHang",nhapLai:"",matKhauMoi:""}) :
        setValues({...values,maLoaiNguoiDung: "KhachHang",nhapLai:"",matKhauMoi:""})
        setIsCheck(true);
    }
    const handleCloseChangPassword=()=>{
        setIsChangePassword(false);
        setValues({...currentUser,maLoaiNguoiDung: "KhachHang",hoTen: values.hoTen, soDT: values.soDT})
        setErrors({...errors,nhapLai:"",matKhauMoi:""})
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        let valid = true;
        let errorMessage = {...errors};
        let value = {...values};
        for (let key in values) {
            if(key !== 'hoTen' && key !== 'soDT'){
                if (values[key] === '') {
                    valid = false;
                    errorMessage = {...errorMessage, [key]: "Không được để trống","hoTen": "","soDT": ""}
                 
                }
            }
        }
        for (let key in errors) {
            if (errors[key] !== '') {
                valid = false;
                errorMessage = {...errorMessage, [key]: "Không được để trống"}
            }
        };
        if(values.matKhauMoi && values.matKhauMoi.trim() !== ''){
           value = {...value, matKhau: values.matKhauMoi};
        }
        if(valid){
            dispatch(changeUserInfo(value,currentUser.matKhau));
            setIsChangeInfo(false);
            props.handleClose();
            handleCloseChangPassword();
            setIsCheck(false);
            setErrors({
                nhapLai:'',
                matKhauMoi:'',
                hoTen:'',
                email: '',
                soDT:'',
            })
        }else{
           setErrors(errorMessage)
        }
    }
    return (
        <div>
            {!isLoading ?
            <Dialog
                className={classes.root}
                maxWidth='xs'
                open={props.open}
                onClose={!isChangeInfo && !isChangePassword ? handleCloseChange : props.showModalUserInfo}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Thông tin cá nhân
                    <Fab className={isChangeInfo ? 'd-none' : 'd-block'} onClick={handleChangeInfo} size="small" aria-label="edit">
                        <EditIcon />
                    </Fab>
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            disabled
                            margin="dense"
                            label="Tài khoản"
                            name='taiKhoan'
                            defaultValue={currentUser && currentUser.taiKhoan}
                            fullWidth
                        />
                        <TextField
                            disabled
                            margin="dense"
                            label="Email"
                            name='email'
                            defaultValue={currentUser && currentUser.email}
                            fullWidth
                        />
                        <TextField
                            disabled = {!isChangeInfo}
                            margin="dense"
                            label="Họ và Tên"
                            onChange={handleChange}
                            onBlur={handleChange}
                            name='hoTen'
                            defaultValue={currentUser && currentUser.hoTen}
                            fullWidth
                        />
                        <TextField
                            error = {errors.soDT && errors.soDT.trim() !=='' ? true : false}
                            disabled = {!isChangeInfo}
                            margin="dense"
                            label="Số điện thoại"
                            onChange={handleChange}
                            onBlur={handleChange}
                            helperText={errors.soDT}
                            name='soDT'
                            defaultValue={currentUser && currentUser.soDT}
                            fullWidth
                        />
                        <p onClick={handleChangPassword} className={`${ isChangePassword ? 'd-none' : 'd-flex' } change__password`}> Đổi mật khẩu</p>
                        <div className={isChangePassword ? 'd-block' : 'd-none'}>
                            <TextField
                                error = {errors.matKhauMoi && errors.matKhauMoi.trim() !=='' ? true : false}
                                margin="dense"
                                label="Mật khẩu mới"
                                onChange={handleChange}
                                onBlur={handleChange}
                                helperText={errors.matKhauMoi}
                                name='matKhauMoi'
                                value={values.matKhauMoi || ''}
                                type='password'
                                fullWidth
                            />
                            <TextField
                                error = {errors.nhapLai && errors.nhapLai.trim() !=='' ? true : false}
                                disabled ={values.matKhauMoi === '' }
                                margin="dense"
                                label="Nhập lại mật khẩu mới"
                                onChange={handleChange}
                                onBlur={handleChange}
                                helperText={errors.nhapLai}
                                value={values.nhapLai || ''}
                                name='nhapLai'
                                type='password'
                                fullWidth
                            />
                        </div>
                        <p onClick={handleCloseChangPassword} className={`${ isChangePassword ? 'd-flex' : 'd-none' } change__password`}> Hủy đổi mật khẩu</p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseChange} variant="contained" className="btn--orange">
                            Đóng
                        </Button>
                        <Button type='submit' variant="contained" className={` ${!isChangeInfo && !isChangePassword ? 'd-none' : 'd-block'} btn--orange`} >
                            Thay đổi
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>:
            <div className="loading--component"><ReactLoading type = {"bars"} color = { "#fb4226" } /></div>
            }
        </div>
    )
}
