import './Movie.scss'
import {Routes, Route} from 'react-router-dom'
import Detail from './detail'
import Home from '../home/home'

const Movie = () => {
    return(
        <>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path=":id" element={<Detail/>}/>
            </Routes>
        </>
    )
}

export default Movie