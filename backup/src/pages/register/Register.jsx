import { useRef, useState } from 'react'
import './Register.scss'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailRef = useRef()
    const passwordRef = useRef()

    const handleStart = () => {
        setEmail(emailRef.current.value)
    }

    const handleFinish = () => {
        setPassword(passwordRef.current.value)
    }

    return(
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
                    <button className="loginButton">
                        Sign In
                    </button>
                </div>
            </div>
            <div className="container">
                <h1>
                Chương trình truyền hình, phim không giới hạn và nhiều nội dung khác.
                </h1>
                <h2>
                Xem ở mọi nơi. Hủy bất kỳ lúc nào.
                </h2>
                <p>
                Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư cách thành viên của bạn.
                </p>
                {
                    email === '' ? 
                        <div className="input">
                            <input value={email} ref={emailRef} type="email" placeholder="email address" name="" id="" />
                            <button 
                                onClick={() => {handleStart()}}
                            >
                                Get started!
                            </button>
                        </div> : 
                        <div className="input">
                            <input value={password} ref={passwordRef} type="password" placeholder="password" name="" id="" />
                            <button 
                                onClick={() => {handleFinish()}}
                            >
                                Get started!
                            </button>
                        </div>
                }
            </div>
        </div>
    )
}

export default Register