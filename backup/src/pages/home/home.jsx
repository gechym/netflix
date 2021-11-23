import Navbar from '../../components/Navbar/Navbar'
import List from '../../components/list/List'
import Featured from '../../components/featured/Featured'
import './home.scss'


import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper.scss'; // core Swiper
import './effect-fade.scss'
// import '../components/list/navigation.scss';
// import '../components/list/pagination.scss';



import SwiperCore, {
  Autoplay,EffectFade
} from 'swiper';
SwiperCore.use([Autoplay,EffectFade]);

const Home = () => {


    return (
        <div className="home">
            <Navbar/>
            <Swiper 
                spaceBetween={0} 
                centeredSlides={true} 
                effect={'fade'}
                autoplay={
                    {
                        "delay": 4500,
                        "disableOnInteraction": false
                    }
                }
                 pagination={
                    {
                        "clickable": true
                    }
                } 
                navigation={false} 
                className="mySwiper">
                    <SwiperSlide>
                        <Featured img={"https://ca-times.brightspotcdn.com/dims4/default/3c98aaf/2147483647/strip/true/crop/3200x2140+0+0/resize/1486x994!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fd3%2F30%2F2426583d4190be0ec2b1be2ce3d6%2Fla-et-mn-animation-is-film-01a.jpg"} />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Featured img={"https://www.awn.com/sites/default/files/styles/original/public/image/featured/he-manandthemastersoftheuniverse_season1_episode10_00_11_09_23-1280.jpg?itok=RtMsYz30"} />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Featured img={"https://downtowndetroitparks.com/wp-content/uploads/2021/05/Raya_Feature.jpeg"} />
                    </SwiperSlide>

            </Swiper>
            <List/>
            <List/>
            <List/>
        </div>
    )
}

export default Home