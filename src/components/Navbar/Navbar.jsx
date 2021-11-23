import { useEffect, useState, memo } from 'react'
import './Navbar.scss'
import {Search,MovieFilter,ArrowDropDown} from '@material-ui/icons'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {userSelect} from '../../store/reducer/userSlice'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/reducer/userSlice'
import useLocalStorage from '../../utils/useLocalStorage'
import _ from 'lodash'
const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [, setToken] = useLocalStorage("jwt", localStorage.getItem("jwt") || "");
    const user = useSelector(userSelect)
    const dispatch = useDispatch()
    useEffect(() =>{
        const hanhleScroll = () => {
            setIsScrolled(window.pageYOffset === 0 ? false : true)
        }
        window.addEventListener('scroll', hanhleScroll)

        return () => {
            window.removeEventListener('scroll', hanhleScroll)
        }
    },[])

    return(
        <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
            <div className="container">
                <div className="left">
                    <Link to='/'>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png" alt=""  />
                    </Link>
                </div>
                {
                    !user.membership &&
                    <marquee width="60%" direction="right" height="100%">
                        <h4 style={{color:'#D91921'}}>
                            Đăng ký gói thành viên để có được các dịch vụ cao cấp nhất chỉ với 200k/năm
                        </h4>
                    </marquee>
                }
                <div className="right">
                    {
                        !_.isEmpty(user) ? 
                            <>  
                                <Link to='/search'>
                                    <Search/>
                                </Link>
                                <img width="100%" src="http://localhost:8000/avata/Netflix-avatar.png" alt=""  />
                                {user.membership ? 
                                    <mark>{`${user.name && user.name}`}</mark>
                                                :
                                                <div style={{textAlign:'center'}}>
                                                    <h4>{`${user.name && user.name}`}</h4>      
                                                    <Link to="/membership">
                                                        <h6>(Đăng ký Thành viên nào)</h6>
                                                    </Link>
                                                </div>
                                }
                                <div className={`profile`}>
                                    <ArrowDropDown/>
                                    <div className="options">
                                        <span>
                                            <Link to="/myList">
                                                <MovieFilter/> My List
                                            </Link>
                                        </span>
                                        <span>Settings</span>
                                        <span onClick={() => {
                                            dispatch(logout())
                                            setToken('')  
                                        }}>logout</span>
                                        {
                                            user.isAdmin && 
                                            <>
                                            <Link to="/admin/manageMovie">
                                                <span>Quản lý phim</span>
                                            </Link>
                                            <Link to="/admin/manageUser">
                                                <span>Quản lý user</span>
                                            </Link>
                                            </>
                                        }
                                    </div>
                                </div>
                            </>
                            : 
                            <div className="profile">
                                <Link to={'/login'}>
                                    <button>Đăng nhập</button>
                                </Link>
                            </div>
                            

                    }
                </div>
            </div>
        </div>
    )
}

export default memo(Navbar)