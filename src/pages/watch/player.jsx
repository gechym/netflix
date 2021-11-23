import React, { memo, useLayoutEffect, useRef, useState } from 'react';
import Plyr from 'plyr';
import Hls from 'hls.js';
import 'plyr/dist/plyr.css';
import './player.scss'
import {toast} from 'react-toastify'
import axios from 'axios';

var hls = new Hls({
    maxBufferLength: 120,//! test
});

const Watch = ({handleSuccess, handleSetLoading, id}) => {
    let dataFilm = null
    const videoPlayerRef = useRef(null);
    const playerInstance = useRef(null);
    const [poster,setPoster] = useState('')
    const [sub,setSub] = useState('')
    useLayoutEffect(() => {
        async function fetchData() {
            await axios.get(`http://localhost:8000/api/v1/film/${id}`)
                .then((res) => {
                    console.log(res)
                    if(!res.data.film){
                       return dataFilm = null
                    }
                    setPoster(res.data.film.backdrop_path)
                    setSub(res.data.film.sub)
                    dataFilm = res.data.film
            })
            console.log(dataFilm)
            let source = dataFilm ? dataFilm.link : 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
            playerInstance.current = new Plyr(videoPlayerRef.current, {
                controls : ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'airplay', 'fullscreen']
            });
            handleSuccess(100)
            
            // // console.log([videoPlayerRef.current])
            // // videoPlayerRef.current.plyr.on('error', (e) => {
            // //     console.log("Lỗi Rồi" , e)
            // // })
            videoPlayerRef.current.plyr.on('canplay', () => {
                console.log("tải xong")
            })
            // // videoPlayerRef.current.plyr.on('timeupdate', () => {
            // //     console.log("")// trả về dòng thời gian
            // // })
            videoPlayerRef.current.plyr.on('seeking', () => {
                console.log("tìm")
                handleSetLoading(true)
            })
            videoPlayerRef.current.plyr.on('seeked', () => {
                console.log("tìm xong")
                handleSetLoading(false)
            })
            
            hls.loadSource(source);
            hls.attachMedia(videoPlayerRef.current);
            window.hls = hls;
        }
        fetchData()

        


        return () => {
            playerInstance.current.pause();
            playerInstance.current.src = "";
            playerInstance.current.destroy();
            hls.stopLoad()
        };
    }, [handleSuccess, handleSetLoading, id, dataFilm])


    return (
        <div>
            <video
                crossOrigin="anonymous"
                onLoadedMetadata={
                    function myFunction() {
                        toast.success('Chúc bạn xem phim vui vẻ', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            icon : '😂'
                        });
                        handleSetLoading(false)
                        // alert("Meta data for video loaded");
                    }
                }
                ref={videoPlayerRef}
                autoPlay={true}
                preload="auto"
                data-poster={`https://image.tmdb.org/t/p/original${poster}`}
            >
                <track kind="captions" label="English" srcLang="en" src={`http://localhost:8000/sub/${sub}`} or default />
            </video>
        </div>
    )
}

export default memo(Watch)
