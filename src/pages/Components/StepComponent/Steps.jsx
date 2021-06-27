import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

//Style Steps
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& .MuiPaper-root': {
      backgroundColor: 'unset'
    },
    '& .MuiStepper-root': {
      padding: '0'
    },
    '& .MuiStepLabel-label':{
      color:'#bdbdbd',
    },
    '& .MuiStepLabel-label.MuiStepLabel-completed':{
      color: '#fff'
    },
    '& .MuiStepIcon-root.MuiStepIcon-completed':{
      color: '#fb4226',
    },
    '& .MuiStepIcon-root.MuiStepIcon-active':{
      color:'#fd6638d4'
    },
    '& .MuiStepIcon-root':{
      color: 'rgba(255, 150, 99, 0.54)'
    }

  },
}));
function getSteps() {
  return ['Đăng Ký', 'Thông tin'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (
        <>
          <TextField
            className="login--form"
            label="Tài Khoản" />
          <TextField
            type="password"
            className="login--form"
            label="Mật khẩu" />
          <TextField
            type="password"
            className="login--form"
            label="Nhập lại mật khẩu" />
        </>
      );
    case 1:
      return (
        <>
          <TextField
            className="login--form"
            label="Họ và tên" />
          <TextField
            className="login--form"
            label="Email" />
          <TextField
            className="login--form"
            label="Số điện thoại" />
        </>
      )
    default:
      return 'Unknown stepIndex';
  }
}

export default function Steps() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>
          <div className={classes.instructions}>{getStepContent(activeStep)}</div>
          {activeStep === steps.length - 1 ?
          <div>
            <Button variant="contained" className="btn--orange" onClick={() => { alert('clicked') }}>Đăng Ký</Button>
          </div>:
          <div className="steps--button">
            <Button variant="contained" className="btn--orange" onClick={handleNext}> Tiếp theo</Button>
          </div>
          }
        </div>
      </div>
    </div>
  );
}
