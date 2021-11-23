import {Facebook} from '@material-ui/icons'
import './login.scss'

const Login = () => {
    return(
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
                    
                </div>
            </div>
            <div className="container">
                <h1>ĐĂNG NHẬP</h1>
                <div className="inputs">
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="password" />
                </div>
                <button>Đăng nhập</button>
                <div className="option">
                 
                    <div className="help">
                        <span>Bạn cần trợ giúp?</span>
                    </div>
                </div>
                <div className="moreLogin">
                    <Facebook/> <span>Đăng nhập bằng tài khoảng Facebook</span>
                </div>
                <div className="join">
                    <p className="joinNetfitl">
                        Bạn mới tham gia Netflix ?<span>Đăng ký Ngay</span>
                    </p>
                    <p className="term">
                    Trang này được Google reCAPTCHA bảo vệ để đảm bảo bạn không phải là robot
                    <br />
                    <span >Tìm hiểu ngay</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login