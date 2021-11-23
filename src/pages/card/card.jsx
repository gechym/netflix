import Navbar from '../../components/Navbar/Navbar'
import './card.scss'
import {userSelect} from '../../store/reducer/userSlice'
import {useSelector} from 'react-redux'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Card = () => {
    const user = useSelector(userSelect)
    const [link, setLink] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/users/getCheckOutSession/${user.id}`)
        .then((res) => {
            setLink(res.data.url)
        })
    },[user])

    return (
        <>
        <Navbar/>
        <div className="card">
            <div id="container">	
                    <div class="product-details">
                        <h1>Membership </h1>
                        <span class="hint-star star">
                        </span>
                        <p class="information">
                            
                            Đăng ký Gói Thành viên 
                            <br/>
                            Xem mọi nội dung bạn muốn. Không có quảng cáo.
                            <br/>
                            Đề xuất dành riêng cho bạn.
                            <br/>
                            Thay đổi hoặc hủy gói dịch vụ của bạn bất cứ khi nào.
                        </p>
                        <div class="control">
                            <button class="btn">
                                <span class="price">200$ / year</span>
                                <span class="buy">
                                    <a href={link}>
                                        Buy Now
                                    </a>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div class="product-image">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXGSQGjqbiD2JUvd3jZKJhC2JhiWYkw-UunA&usqp=CAU" alt="Omar Dsoky"/>
                        <div class="info">
                            <h2>Đặc Quyền</h2>
                            <ul>
                                <li><strong>Xem Phim: </strong>Full sub, 4k</li>
                                <li><strong>Đa thiết bị: </strong>TV, SmartPhone, samsung TV</li>
                                <li><strong>Nội dung đa dạng: </strong>Xem trước phim mới</li>
                                <li><strong>Quảng cáo: </strong>Không có bất kỳ QC nào xuất hiện</li>
                            </ul>
                        </div>
                    </div>
            </div>
        </div>
        </>
    )
}


export default Card