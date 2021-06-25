import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { lazy, Suspense } from "react";
import ReactLoading from 'react-loading'
import AppLayout from "./Layouts/AppLayout/AppLayout";

//Pages
const Home = lazy(() => import('./pages/App/Home'));
function App() {
  return (
    <Suspense Suspense fallback = {<div><ReactLoading type = {"bars"} color = { "white" } /></div>}>
        <BrowserRouter>
          <Switch>
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
