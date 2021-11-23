import { useState, useCallback, useEffect } from 'react';
import Home from './pages/home/home'
import Watch from './pages/watch/watch'
import {ArrowBack} from '@material-ui/icons'
import Loading from './components/loading/loading'
// import Register from './pages/register/Register';
// import Login from './pages/login/login';
import './app.scss'
import Skeleton from './skeleton'
import LoadingBar from 'react-top-loading-bar'

function App() {
  const [isPlay,setIsPlay] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(prev => prev + 50)
    setProgress(prev => prev + 20)
    setProgress(prev => prev + 30)
  },[isPlay])
  
  const handleSetLoading = useCallback((bolean) => {
    setIsLoading(bolean)
  }, [])

  console.log("render lại")

  return (
    <>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
          

      <div className="App">
        {
          isLoading &&
          <div className="loadingComponent">
              <Loading/>
          </div>
        }
        <div 
          className="back-icon"
          onClick={() => {
            setIsPlay(!isPlay)
            setIsLoading(false)
          }}
        >
          <ArrowBack/>
          
          </div>
        {isPlay ? <Watch handleSetLoading={handleSetLoading}/> :<Home/>} 
        {/* <Register/> */}
        {/* <Login/> */}


        <Skeleton/>
      </div>
      <button onClick={() => setProgress(progress + 10)}>Add 10%</button>
      <button onClick={() => setProgress(progress + 20)}>Add 20%</button>
      <button onClick={() => setProgress(100)}>Complete</button>
    </>
  );
}

export default App;
