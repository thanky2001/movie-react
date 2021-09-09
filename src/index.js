import React from 'react';
import ReactDOM from 'react-dom';
import './styles/Layout/Header.css';
import './styles/Layout/Content.css';
import './styles/Layout/Footer.css';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import App from './App';
import reportWebVitals from './reportWebVitals';
// setup Store
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from './reducers/index';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import ReactLoading from 'react-loading';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { viVN } from '@material-ui/core/locale';
import { createTheme } from '@material-ui/core';
//tạo store tổng của redux
const middleware = applyMiddleware(thunk);
const enhancer = compose(
  middleware, //middleware
  //redux devtools
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const store = createStore(rootReducer, enhancer);
// theme material
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
  },
}, viVN);
ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <Suspense fallback = {<div className="loading--component"><ReactLoading type = {"bars"} color = { "#fb4226" } /></div>}>
          <BrowserRouter >
            <ThemeProvider theme={theme} >
              <App /> 
            </ThemeProvider>
        </BrowserRouter>
      </Suspense>
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
