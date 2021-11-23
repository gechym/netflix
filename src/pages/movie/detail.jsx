import './Movie.scss'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar'
import {Star} from '@material-ui/icons'
import SectionSlider from '../../pages/home/sections/SectionSlider'
import {useParams, Link} from 'react-router-dom'
import ReactModal from 'react-modal';
import {toast} from 'react-toastify'
// import {useSelector} from 'react-redux'
// import {userSelect} from '../../store/reducer/userSlice'

ReactModal.setAppElement('#root');


const ModalFilm = ({id,show, handleShowModal}) => {

    const onRequestClose = () => {
        handleShowModal()
    }

    return(
        <div className="modalTrailer">
            <ReactModal 
                isOpen={show}
                onRequestClose={onRequestClose}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(24, 24, 24, 0.8)'
                    },
                    content: {
                        backgroundColor: '#181818',
                        color: 'lightsteelblue',
                        width:'1000px',
                        height:'600px',
                        margin:'0px auto',
                        zIndex: '100',
                        border:'none',
                        display:"flex",
                        flexDirection:"column",
                        gap:"20px",
                        alignItems:"center"
                    }
                }}
            >
                <h3>Trailer</h3>
                {/* <iframe 
                    width="560" 
                    height="315" 
                    src={`https://www.youtube.com/embed/${id}?controls=0`} 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe> */}
                <iframe width="100%" height="100%"  src={`https://www.2embed.ru/embed/tmdb/movie?id=${id}`} title="Iframe Example"></iframe>
            </ReactModal>
      </div>
    )


    
}


const ModalTrailer = ({idTrailer,show, handleShowModal}) => {

    const onRequestClose = () => {
        handleShowModal()
    }

    return(
        <div className="modalTrailer">
            <ReactModal 
                isOpen={show}
                onRequestClose={onRequestClose}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(24, 24, 24, 0.8)'
                    },
                    content: {
                        backgroundColor: '#181818',
                        color: 'lightsteelblue',
                        width:'600px',
                        height:'400px',
                        margin:'100px auto',
                        zIndex: '100',
                        border:'none',
                        display:"flex",
                        flexDirection:"column",
                        gap:"20px",
                        alignItems:"center"
                    }
                }}
            >
                <h3>Trailer</h3>
                <iframe 
                    width="560" 
                    height="315" 
                    src={`https://www.youtube.com/embed/${idTrailer}?controls=0`} 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
                {/* <iframe width="100%" height="100%"  src={`https://www.2embed.ru/embed/tmdb/movie?id=${idTrailer}`} title="Iframe Example"></iframe> */}
            </ReactModal>
      </div>
    )


    
}



const Detail = () => {
    const [data, setData] = useState(null)
    const [showFilm, setShowFilm] = useState(false)
    const [showTrailer, setShowTrailer] = useState(false)
    let params = useParams() 
    // let user = useSelector(userSelect)
   

    const handleShowModal = () => {
        setShowFilm(!showFilm)
    }

    const handleShowModalTrailer = () => {
        setShowTrailer(!showTrailer)
    }

    useEffect(  () => {
        async function fetchData() {
            const res =  axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=6d9553f6d964292a13b91bf8b1fbbf74&append_to_response=videos,images,credits`)
                .then(function (res) {
                    const valuefilter = ['backdrop_path' ,'id' ,'original_title' ,'overview' ,'poster_path' ,'release_date','genres', 'homepage','vote_average', ]
                    const film = res.data
                    const newFilm = {}

                    valuefilter.forEach(value => {
                        newFilm[value] = film[value]
                    });
                    
                    newFilm['cast'] = film.credits.cast.slice(0,8)
                    newFilm['trailer'] = film.videos.results[3] || film.videos.results[0]  || {key : 'dQw4w9WgXcQ'}
                    setData(newFilm)
                    window.scrollTo({top: 0, left: 0, behavior: 'smooth' });

                    
                })
                
            toast.promise(
                res,
                {
                    pending: 'Loading ...',
                    success: 'Tải thông tin phim thành công.',
                    error: 'Oh! có thể mạng đang có vấn đề'
                }
            )
        }
        fetchData();
    },[params.id]) //! note
    return(
        <>
            <ModalFilm handleShowModal={handleShowModal} show={showFilm} id={data && data.id}/>
            <ModalTrailer handleShowModal={handleShowModalTrailer} show={showTrailer} idTrailer={data && data.trailer.key}/>
            <div className="background">
                <Navbar/>
                <img className="background-mv" src={`https://image.tmdb.org/t/p/original${data && data.backdrop_path}`} alt="" />
            </div>
            <div className="detail">
                <div className="left">
                    <div className="poter">
                        <img src={`https://image.tmdb.org/t/p/w300${data && data.poster_path}`} alt="" />
                    </div>
                </div>
                <div className="right">
                    
                    <div className="info-movie">
                        <h1>{data && data.original_title}</h1>
                        <p className="desc-info">
                        {data && data.overview}
                        </p>
                        <span className="release">
                            Release Date: {data && data.release_date}
                        </span>
                        <div className="genres">
                            {
                              data && data.genres.map((genre) => {
                                return <span >{genre.name}</span>
                              })  
                            }
                        </div>
                        <p className="Stars">
                            {
                                data &&
                                [1,2,3,4,5,6,7,8,9,10].map((number) => {
                                    if(number < data.vote_average){
                                        return (
                                            <span class="vote">
                                                <Star/>
                                            </span>
                                        )
                                    }else{
                                        return(
                                            <span>
                                                <Star/>
                                            </span>
                                        )
                                    }
                                })
                            }
                        </p>
                    </div>
                    <div className="buttons-detail">
                        <Link to={`/watch/${data && data.id}`}>
                            <button>Xem HD</button>
                        </Link>
                        <button
                            onClick={handleShowModal}
                        >Xem thường</button>
                        <button
                            onClick={handleShowModalTrailer}
                        >Xem Trailer</button>
                    </div>
                </div>
            </div>
            <div className="more-info">
                <h3>Official website:<a href={data && data.homepage} style={{color:'#D91921'}}>{data && data.homepage}</a></h3>
                <h1>Casts</h1>
                <div className="casts">
                    {
                        data && data.cast.map((cast) => {
                            return(
                                <div className="cast">
                                    <img src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`} alt="" />
                                    <h3>{cast.character}</h3>
                                    <span style={{color:'#D91921'}}>{cast.name}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="slider-Similar">
                <SectionSlider
                    title="Phim cùng chủ đề"
                    url={`https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=6d9553f6d964292a13b91bf8b1fbbf74&language=en-US&page=1`} 
                />
                <SectionSlider
                    title="Đề cử cho bạn "
                    url={`https://api.themoviedb.org/3/movie/${params.id}/recommendations?api_key=6d9553f6d964292a13b91bf8b1fbbf74&language=en-US&page=1`} 
                />
            </div>
        </>
    )
}

export default Detail