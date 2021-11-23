import { useEffect, useState } from 'react'
import './Navbar.scss'
import {Search,Notifications,ArrowDropDown} from '@material-ui/icons'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
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
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png" alt=""  />
                    <span>Homepage</span>
                    <span>Series</span>
                    <span>Movies</span>
                    <span>New And Popular</span>
                    <span>My list</span>
                </div>
                <div className="right">
                    <Search/>
                    <Notifications/>
                    <span>Bảo</span>
                    <img width="100%" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt=""  />
                    <div className="profile">
                        <ArrowDropDown/>
                        <div className="options">
                            <span>Settings</span>
                            <span>logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar