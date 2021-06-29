import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import {Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import CircularProgress from '@material-ui/core/CircularProgress';

//style css textfield
const styles = theme => ({
    root: {
        '& label.Mui-focused': {
            color: '#fff',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#fff',
        },
        '& .MuiFormLabel-root':{
            color: '#bdbdbd'
        },
        '& .MuiInput-underline::before':{
            borderBottom: '1px solid #bdbdbd'
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled)::before':{
            borderBottom: '2px solid #a1a0a0'
        },
        '& .MuiButton-label':{
            width: '95px',
        }
    }
  });
class Index extends Component {
    constructor(props) {
        super(props);
        this.state={
            values:{
                taiKhoan:'',
                matKhau:''
            },
            errors:{
                taiKhoan:'',
                matKhau:''
            }

        }
    }
    handleChange=(e)=>{
        let {value, name} = e.target;
        let errorMessage= "";
        if(value.trim()===''){
            errorMessage = "Không được để trống";
        }
        if(name ==='taiKhoan' && (value.length < 5 || value.length > 20)){
            errorMessage= "Tài khoản phải từ 5 đến 20 ký tự";
        }
        this.setState({
            ...this.state,
            errors: {...this.state.errors,[name]:errorMessage},
            values: {...this.state.values,[name]:value},
        
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        let valid = true;
        let {values, errors} = this.state;
        let errorMessage = {};
        for (let key in values) {
            if (values[key] === '') {
                valid = false;
                errorMessage = {...errorMessage, [key]: "Không được để trống"}
            }
        }
        for (let key in errors) {
            if (errors[key] !== '') {
                valid = false;
                errorMessage = {...errorMessage, [key]: "Không được để trống"}
            }
        };
        if(valid){
            this.props.dispatch(login(values));
        }else{
            this.setState({
                errors: errorMessage
            })
        }
    }
    render() {
        let {userInfo, isLoading, error} = this.props;
        if (userInfo && userInfo.maLoaiNguoiDung ==="QuanTri") {
            return <Redirect to="/admin"/>
        }
        if (userInfo && userInfo.maLoaiNguoiDung ==="KhachHang") {
            return <Redirect to="/"/>
        }
        const { classes } = this.props;
        return (
            <div id="login">
                <div className="login__wraper">
                    <Link to="/"><div className="login--close"></div></Link>
                    <div className="login--header"><Link to="/" ><img src="./img/group@2x.png" alt="group@2x.png" /></Link></div>
                    <div className="login--message">
                        Đăng nhập để được nhiều ưu đãi, mua vé <br/>
                        và bảo mật thông tin!
                    </div>
                    <form onSubmit={this.handleSubmit} className={`${classes.root} login--form-group`}>
                        <TextField 
                            error={this.state.errors.taiKhoan !== ''}
                            onBlur={this.handleChange}
                            onChange={this.handleChange}
                            name="taiKhoan"
                            className="login--form"
                            helperText={this.state.errors.taiKhoan}
                            label="Tài Khoản" />
                        <TextField
                            error={this.state.errors.matKhau !==''}
                            onBlur={this.handleChange}
                            onChange={this.handleChange}
                            name="matKhau"
                            type="password"
                            className="login--form"
                            helperText={this.state.errors.matKhau}
                            label="Mật khẩu" />
                        {error ? <p style={{color: '#f44336', fontSize:'0.75rem', marginBottom:'0', marginTop:'3px'}}>{error}</p> : ''}
                        <Button type='submit' variant="contained" className="btn--orange"> {isLoading ? <CircularProgress size={20} color='inherit' /> : 'Đăng Nhập'}</Button>
                    </form>
                    <div className="link--register">
                        <p>Bạn chưa có tài khoản? <Link to="/register">Đăng Ký</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps =(state)=>{
    return{
        userInfo: state.authReducer.userInfo,
        isLoading: state.authReducer.isLoading,
        error: state.authReducer.errors,
    }
}
export default withStyles(styles, { withTheme: true })(
    withRouter(connect(mapStateToProps)(Index))
)