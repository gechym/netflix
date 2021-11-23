import './Featured.scss'
import { PlayArrow,InfoOutlined } from '@material-ui/icons'
const Featured = ({type, img}) => {
    return(
        <div className="featured">
            {
                type && (
                    <div className="category">
                        <span>{type === 'movies' ? 'Movies' : 'Series'}</span>
                        <select name="genre" id="genre">
                            <option>Genre</option>
                            <option value="adventure">Adventure</option>
                            <option value="comedy">Comedy</option>
                            <option value="crime">Crime</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="historical">Historical</option>
                            <option value="horror">Horror</option>
                            <option value="romance">Romance</option>
                            <option value="dci-fi">Dci-fi</option>
                            <option value="thriller">Thriller</option>
                            <option value="western">Western</option>
                            <option value="animation">Animation</option>
                            <option value="drama">Drama</option>
                            <option value="documentary">Documentary</option>
                        </select>
                    </div>
                )
            }
            <img 
                width="100%" 
                src={img} 
                alt="" 
            />
            <div className="info">
                <img src="https://occ-0-58-64.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABVlv2JhGLd092mM4aTp6_NM3mmHPCiXqsSiqZOkrPSe0E5OlHVPIMy-S935aHxKngffmDqku2Y5tFcRUXPEF9S-JZfXO17khvxf0eBA31rvqNE64Y1F8Kno8QFoi0rDXubpB9J3HtVIjIoTr7Fka_IiwVsAWS_f_PvXqXX6PpQ_h3g.png?r=eb5" alt=""/>
                <span className="desc">
                [Khóa 2021] Thông báo V/v nộp minh chứng chứng chỉ tiếng Anh để được miễn học tiếng Anh - 01-11-2021 
                KHOA KHTM VÀ CÔNG TY AGILITYIO PHỐI HỢP TỔ CHỨC SEMINAR VỀ QUẢN LÝ DỰ ÁN PHẦN MỀM - 27-10-2021
                Thông báo về việc hoàn thành học phí học kỳ 1 năm học 2021-2022 đối với sinh viên hệ Cao đẳng (bao gồm trường hợp học ghép lớp với hệ Đại học) - 27-10-2021
                </span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow/>
                        <span>Play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined/>
                        <span>More </span>
                    </button>
                </div>
            </div>
        
        </div>
        
    )
}

export default Featured