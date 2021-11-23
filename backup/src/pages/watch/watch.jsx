import React, { memo, useLayoutEffect, useRef } from 'react';
import Plyr from 'plyr';
import Hls from 'hls.js';
import 'plyr/dist/plyr.css';
import './watch.scss'
import sub from './sub.vtt'

const Watch = ({handleSetLoading}) => {
    const videoPlayerRef = useRef(null);
    const playerInstance = useRef(null);

    useLayoutEffect(() => {
        const source = 'https://www.googleapis.com/drive/v3/files/1Xxv2UDS-HrRf3tCG3xWMs8iTwiB4zE7B?key=AIzaSyAMLhicKHJG0-jAnwlRaAkFrrZqxTMIeg4&alt=media';
        playerInstance.current = new Plyr(videoPlayerRef.current, {
            controls : ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'pip', 'airplay', 'fullscreen']
        });


        videoPlayerRef.current.plyr.on('canplay', () => {
            console.log("tải xong")
        })
        videoPlayerRef.current.plyr.on('timeupdate', () => {
            console.log("")// trả về dòng thời gian
        })

        videoPlayerRef.current.plyr.on('seeking', () => {
            console.log("tìm")
            handleSetLoading(true)
        })

        videoPlayerRef.current.plyr.on('seeked', () => {
            console.log("tìm xong")
            handleSetLoading(false)
        })

        

        
        const hls = new Hls();
        hls.loadSource(source);
        hls.attachMedia(videoPlayerRef.current);
        window.hls = hls;

        return () => {
            playerInstance.current.pause();
            playerInstance.current.src = "";
            playerInstance.current.destroy();
            hls.stopLoad()
        };
    }, [])


    return (
        <div>
            <video
                onLoadedMetadata={
                    function myFunction() {
                        alert("Meta data for video loaded");
                    }
                }
                ref={videoPlayerRef}
                autoPlay={true}
                preload="auto"
            >
                <track kind="captions" label="English" srcLang="en" src={sub} default />
            </video>
        </div>
    )
}

export default memo(Watch)
