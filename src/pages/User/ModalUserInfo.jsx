import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField } from '@material-ui/core';
import React, {useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserInfo} from '../../actions/user';
import { useLocation } from 'react-router-dom';
import { getParamId } from '../../utils/format';

const useStyles = makeStyles(() => ({
    root: {
        '& .MuiDialog-paper': {
            margin: '0 !important',
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
        '& .admin.change__password:hover':{
            color: '#3f51b5'
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
    const {userInfo} = useSelector(state => state.authReducer);
    const [type, setType] = useState(null)
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
    const location = useLocation()
    useEffect(() => {
        let type = getParamId(location.pathname).type
        if (type === 'admin') {
            handleChangeInfo()
            setType('admin');
        }else{
            setType(null);
        }
    }, [location]) // eslint-disable-line react-hooks/exhaustive-deps
    const handleChange=(e)=>{
        let {value, name} = e.target;
        let errorMessage= "";
        let valuesUp ={...values,[name]:value};
        if (name !== 'soDT' && name !== 'hoTen') {
            if(value.trim()===''){
                errorMessage = "Kh??ng ???????c ????? tr???ng";
            }
        }
        if(name ==='taiKhoan' && (value.length < 5 || value.length > 20)){
            errorMessage= "T??i kho???n ph???i t??? 5 ?????n 20 k?? t???";
        }
        if (name === 'email') {
            let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
            if (!regex.test(value)) {
                errorMessage = 'Kh??ng ????ng ?????nh d???ng';
            }
        }
        if (name === 'soDT') {
            if(value.trim() !==''){
                let regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
                if (!regex.test(value)) {
                    errorMessage = 'Kh??ng ????ng ?????nh d???ng';
                }
            }else{
                errorMessage =''
            }
        }
        if (name === 'nhapLai') {
            if (value !== values['matKhauMoi']) {
                errorMessage = 'M???t kh???u kh??ng tr??ng kh???p';
            }
        }
        let errorsUp={...errors, [name]: errorMessage};
        setValues(valuesUp);
        setErrors(errorsUp);
    }
    const handleChangeInfo=()=>{
        setIsChangeInfo(true);
        !isCheck ?
        setValues({...currentUser,maLoaiNguoiDung: userInfo && userInfo.maLoaiNguoiDung,}) :
        setValues({...values,maLoaiNguoiDung: userInfo && userInfo.maLoaiNguoiDung,})
        setIsCheck(true);

    }
    const handleCloseChange=(e)=>{
        e.preventDefault();
        type !== 'admin' && setIsChangeInfo(false);
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
        setValues({...currentUser,maLoaiNguoiDung: userInfo && userInfo.maLoaiNguoiDung,nhapLai:"",matKhauMoi:""}) :
        setValues({...values,maLoaiNguoiDung: userInfo && userInfo.maLoaiNguoiDung,nhapLai:"",matKhauMoi:""})
        setIsCheck(true);
    }
    const handleCloseChangPassword=()=>{
        setIsChangePassword(false);
        setValues({...currentUser,maLoaiNguoiDung: userInfo && userInfo.maLoaiNguoiDung,hoTen: values.hoTen, soDT: values.soDT})
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
                    errorMessage = {...errorMessage, [key]: "Kh??ng ???????c ????? tr???ng","hoTen": "","soDT": ""}
                 
                }
            }
        }
        for (let key in errors) {
            if (errors[key] !== '') {
                valid = false;
                errorMessage = {...errorMessage, [key]: "Kh??ng ???????c ????? tr???ng"}
            }
        };
        if(values.matKhauMoi && values.matKhauMoi.trim() !== ''){
           value = {...value, matKhau: values.matKhauMoi};
        }
        if(valid){
            dispatch(changeUserInfo(value,currentUser.matKhau));
            type !== 'admin' && setIsChangeInfo(false);
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
                    {type === 'admin' ? 'S???a th??ng tin c?? nh??n' : 'Th??ng tin c?? nh??n'}
                    <Fab className={isChangeInfo ? 'd-none' : 'd-block'} onClick={handleChangeInfo} size="small" aria-label="edit">
                        <EditIcon />
                    </Fab>
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            disabled
                            margin="dense"
                            label="T??i kho???n"
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
                            label="H??? v?? T??n"
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
                            label="S??? ??i???n tho???i"
                            onChange={handleChange}
                            onBlur={handleChange}
                            helperText={errors.soDT}
                            name='soDT'
                            defaultValue={currentUser && currentUser.soDT}
                            fullWidth
                        />
                        <p onClick={handleChangPassword} className={`${ isChangePassword ? 'd-none' : 'd-flex' } ${type === 'admin' ? 'admin' : ''} change__password`}> ?????i m???t kh???u</p>
                        <div className={isChangePassword ? 'd-block' : 'd-none'}>
                            <TextField
                                error = {errors.matKhauMoi && errors.matKhauMoi.trim() !=='' ? true : false}
                                margin="dense"
                                label="M???t kh???u m???i"
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
                                label="Nh???p l???i m???t kh???u m???i"
                                onChange={handleChange}
                                onBlur={handleChange}
                                helperText={errors.nhapLai}
                                value={values.nhapLai || ''}
                                name='nhapLai'
                                type='password'
                                fullWidth
                            />
                        </div>
                        <p onClick={handleCloseChangPassword} className={`${ isChangePassword ? 'd-flex' : 'd-none' } ${type === 'admin' ? 'admin' : ''} change__password`}> H???y ?????i m???t kh???u</p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseChange} color= 'primary' variant="contained" className={type==='admin' ? '' : "btn--orange"}>
                            ????ng
                        </Button>
                        <Button type='submit' variant="contained" color= 'primary' className={` ${!isChangeInfo && !isChangePassword ? 'd-none' : 'd-block'} ${type === 'admin' ? '' : 'btn--orange'}`} >
                            Thay ?????i
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>:
            <div className="loading--component"><ReactLoading type = {"bars"} color = { "#fb4226" } /></div>
            }
        </div>
    )
}
