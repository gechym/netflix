import Home from './pages/home/home'
import Watch from './pages/watch/watch'
import Register from './pages/register/Register';
import Login from './pages/login/login';
import Movie from './pages/movie/Movie'
import Admin from './pages/home/admin/admin';
import Card from './pages/card/card'
import Search from './pages/search/search'
import './app.scss'
// import Skeleton from './skeleton'
import RouterProtected from './utils/RouterProtected'
import IsMenbership from './utils/isMenbership'
import IsLoginNavigagate from './utils/isLoginNavigagate'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import useLocalStorage from '../src/utils/useLocalStorage'
import {login} from '../src/store/reducer/userSlice'
import {useDispatch} from 'react-redux'
import MyList from './pages/myList/myList';
function App() {


  const [token, setToken] = useLocalStorage("jwt", localStorage.getItem("jwt") || "");
  const dispatch = useDispatch() 
  useEffect(() => {
    try {
      const decoded = jwt.verify(token, 'nguyenducbao1662002jqk0789440709');
      axios.get(`http://localhost:8000/api/v1/users/${decoded.id}`)
      .then((res) => {
        dispatch(login(res.data.user))
      }).catch((error) => {
        // console.log(error.response);
      })
    } catch(err) {
      setToken('')
      // console.log(err)
    }
  },[dispatch, token, setToken])

  return (
    <>
      <div className="App" id="app">
        <Router>
          <Routes>
            <Route path="/">
              {/* //TODO home */}
              <Route index element={<Home />}/>
              <Route path="home*"   element={<Home />}/>
              <Route path="search"   element={<Search />}/>


              {/* //TODO detail Movie */}
              <Route 
                path="movie/*" 
                element={
                  <RouterProtected>
                    <Movie/>
                  </RouterProtected>
                }
              />

              {/* //TODO watch movide */}
              <Route 
                path="watch/:id" 
                element={
                          <RouterProtected>
                            <IsMenbership>
                              <Watch/>
                            </IsMenbership>
                          </RouterProtected>
                }
              />

              <Route 
                path="admin/*" 
                element={
                  <RouterProtected>
                    <Admin/>
                  </RouterProtected>
                }
              />

              <Route 
                path="login" 
                element={
                  <IsLoginNavigagate>
                    <Login/>
                  </IsLoginNavigagate>
                }
              />
              <Route 
                path="register" 
                element={
                  <IsLoginNavigagate>
                    <Register/>
                  </IsLoginNavigagate>
                }
              />

              <Route 
                path="myList" 
                element={<RouterProtected><MyList/></RouterProtected>}
              />

              <Route 
                path="membership" 
                element={
                  <RouterProtected>
                    <Card/>
                  </RouterProtected>
                }
              />
            
            </Route>
          </Routes>
        </Router>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme='dark'
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
}

export default App;



// Lu???ng ????ng nh???p ?????ng nh???p -> db tr??? v??? token() v?? info  -> l??u info v?? redux v?? token v??o localstorage
// Lu???ng ????nng nh???p r???i -> check token b???ng c??ch jwwt verify v?? l???y id check ??? db n???u oke th?? l??u info v??o redux c??n ko th?? x??a info trong redux c?? ??i
//  ????ng xu???t th?? x??a token v?? info trong redux 


// ????ng k?? 
