import { Switch, Route, useLocation } from "react-router-dom";
import { lazy, useEffect} from "react";
import AppLayout from "./Layouts/AppLayout/AppLayout";
import { Capitalize, getParamId } from "./utils/format";
import AdminLayout from "./Layouts/AdminLayout/AdminLayout";

//Pages
const Home = lazy(() => import('./pages/App/Home'));
const DetailNews = lazy(() => import('./pages/App/Home/News/DetailNews'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const DetailMovies = lazy(() => import('./pages/App/Home/Movies/MoviesDetail'));
const BookingTicket = lazy(()=>import('./pages/App/Home/BookingTicket/BookingTicket'));
const Dashboard = lazy(()=>import('./pages/Admin/Dashboard/Index'));
const UserInfo = lazy(()=>import('./pages/Admin/UserInfo/UserInfo'));
const UserManager = lazy(()=>import('./pages/Admin/UserManager/UserManager'));
const FilmsManager = lazy(()=>import('./pages/Admin/FilmsManager/FilmsManager'));
const ShowingSession = lazy(()=>import('./pages/Admin/ShowingSession/Index'))
function App() {
  const location = useLocation();
  useEffect(() => {
    let type = getParamId(location.pathname).type
    if (type === 'admin') {
      let tt = location.pathname.split('/')[2] ? location.pathname.split('/')[2] : location.pathname.split('/')[1];
      document.title = 'Admin - '+ Capitalize(tt);
    }else if(type === ''){
      document.title = 'Movie - Trang Chu';
    }else{
      document.title = 'Movie - ' + Capitalize(type);
    }
  }, [location])
  return (
    <Switch>
        {/* Login */}
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/admin">
          <AdminLayout>
            <Switch>
            <Route path='/admin/quan-ly-lich-chieu'>
                <ShowingSession/>
              </Route>
              <Route path='/admin/thong-tin-tai-khoan'>
                <UserInfo/>
              </Route>
              <Route path='/admin/quan-ly-nguoi-dung'>
                <UserManager/>
              </Route>
              <Route path='/admin/quan-ly-phim'>
                <FilmsManager/>
              </Route>
              <Route path='/admin'>
                <Dashboard/>
              </Route>
            </Switch>
          </AdminLayout>
        </Route>
        {/* App */}
        <Route path="/">
            <AppLayout>
              <Switch>
                <Route path="/goc-dien-anh">
                  <DetailNews/>
                </Route>
                <Route path="/review">
                  <DetailNews/>
                </Route>
                <Route path="/khuyen-mai">
                  <DetailNews/>
                </Route>
                <Route path="/phim">
                  <DetailMovies/>
                </Route>
                <Route path="/checkout">
                  <BookingTicket/>
                </Route>
                <Route path="/">
                  <Home/>
                </Route>
              </Switch>
            </AppLayout>
        </Route>
    </Switch>
  );
}

export default App;
