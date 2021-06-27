import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, makeStyles } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Steps from '../Components/StepComponent/Steps'

//style css text field
const useStyle = makeStyles({
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
        '& .MuiInputBase-root':{
            color: '#fff',
        }
    },
  });
  
export default function Index() {
    const classes = useStyle();
    return (
        <div id="register">
            <div className="login__wraper">
                <Link to="/"><div className="login--close"></div></Link>
                <div className="login--header"><Link to="/" ><img src="./img/group@2x.png" alt="group@2x.png" /></Link></div>
                <form className={`${classes.root} login--form-group`}>
                    <Steps/>
                </form>
                <div className="login--social">
                    <p>Hoặc</p>
                    <div className="d-flex justify-content-center">
                        <Tooltip placement='top' title="Signup with Facebook">
                            <Avatar alt="fb" src="img/fb_login.png" />
                        </Tooltip>
                        <Tooltip placement='top' title="Signup with Zalo">
                            <Avatar alt="zalo" src="img/zalo.png" />
                        </Tooltip>
                        <Tooltip placement='top' title="Signup with Google">
                            <Avatar alt="gg" src="img/gg.png" />
                        </Tooltip>
                    </div>
                </div>
                <div className="link--register">
                    <p>Bạn đã có tài khoản? <Link to="/login">Đăng Nhập</Link></p>
                </div>
            </div>
        </div>
    )
}
