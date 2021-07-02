import { BrowserRouter, Switch, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ReactLoading from 'react-loading';
import AppLayout from "./Layouts/AppLayout/AppLayout";

//Pages
const Home = lazy(() => import('./pages/App/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
function App() {
  return (
    <Suspense fallback = {<div className="loading--component"><ReactLoading type = {"bars"} color = { "black" } /></div>}>
        <BrowserRouter>
          <Switch>
              {/* Login */}
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/register">
                <Register/>
              </Route>
              {/* App */}
              <Route path="/">
                  <AppLayout>
                    <Switch>
                      <Route path="/" exact>
                        <Home/>
                      </Route>
                    </Switch>
                  </AppLayout>
              </Route>
          </Switch>
        </BrowserRouter>
    </Suspense>
  );
}

export default App;
