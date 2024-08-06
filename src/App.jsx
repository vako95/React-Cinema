import MoovieShow from "./services/movie-show";
import MoovieDetail from "./components/MoovieDetail/MoovieDetail";
import MovieList from "./components/MoovieList/MovieList";
import SearchBar from "./components/SearchBar/SearchBar";

import { useEffect, useState } from "react";
import { BACKDROP_IMG } from "./config";

import Logo from "./components/Logo/Logo";
import LogoImg from './assets/img/logo.svg'
import { Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import s from './style.module.css'
import cinema from './assets/img/cinema.jpg'


function App() {
  const [currentMoovie, setCurrentMoovie] = useState({});
  const [tvShowRecomendations, setTvShowRecomendations] = useState([])
  const [tvVideos, setTvVideos] = useState([])

  async function fetVideo(id) {
    try {
      const responser = await MoovieShow.fetVideo(id);
      if (responser && responser.data.results.length > 0) {
        // console.log(responser.data.results[0].key);
        setTvVideos(responser.data.results[0].key);
      } else {
        console.log("No VIDEO");
        setTvVideos(null);
      }
    } catch (error) {
      console.error("Error:", error);
      setTvVideos(null);
    }
  }
  async function fetchSearch(title) {
    try {
      const responser = await MoovieShow.fetchSearch(title);
      console.log(responser)
      setCurrentMoovie(responser)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (currentMoovie?.id ?? 533535) {
      fetVideo(currentMoovie?.id ?? 533535);
    }
    return () => {
      setTvVideos([])

    }
  }, [currentMoovie, setTvVideos])



  async function fetchData() {
    try {
      const responser = await MoovieShow.fetchMoovie()
      setCurrentMoovie(responser)
    } catch (err) {
      console.log(err)
    }
  }

  async function fetchRecomendations(id) {
    try {
      const responser = await MoovieShow.fetchRecomendations(id)
      setTvShowRecomendations(responser.data.results.splice(0, 6))

    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    fetchData();
    return () => {
      setCurrentMoovie({});
    }
  }, []);


  function updatecurrentMoovie(tvShow) {
    setCurrentMoovie(tvShow);
  }

  useEffect(() => {

    if (currentMoovie?.id) {
      fetchRecomendations(currentMoovie?.id);
    }
    return () => {
      setTvShowRecomendations([])
    }
  }, [currentMoovie?.id]);



  return (
    <Container fluid className="mb-1">
      <Row>
        <Logo img={LogoImg} />
        <SearchBar onSubmit={fetchSearch} />
        <div className={s.imgr} style={{
          overflow: 'hidden',
          background: currentMoovie
            ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
               url("${BACKDROP_IMG}${currentMoovie.backdrop_path}") no-repeat center / cover `
            : `url('${cinema}') no-repeat center / cover `,
            width: currentMoovie ? 'auto' : '100vw',
            height: currentMoovie ? 'auto' : '100vh',
        
            // `url('${cinema}') no-repeat center / cover `
        }}>
          {currentMoovie?.id ? (
            <>
              <MoovieDetail tvVideo={tvVideos} tvShow={currentMoovie} />
              <MovieList
                tvVideo={tvVideos}
                tvShowList={tvShowRecomendations}
                onClikcItem={updatecurrentMoovie}
              />
            </>
          ) : (
            <div className={s.cinema}>
              <div id={s.error404}>
              <h1><span>4</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" fill="none" stroke-linecap="round" r="40" stroke-width="8" stroke="#1B1B1B" stroke-dasharray="60 60">
                  <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.5s" begin="0s" repeatCount="indefinite"></animateTransform>
                </circle>
                <circle cx="50" cy="50" fill="none" stroke-linecap="round" r="30" stroke-width="8" stroke="#222222" stroke-dasharray="50 50" stroke-dashoffset="50">
                  <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;-360 50 50" keyTimes="0;1" dur="1.5s" begin="0s" repeatCount="indefinite"></animateTransform>
                </circle></svg><span>4</span>
              </h1>
              <p className={s.subtitle}>Page Not Found</p>
            </div>
            </div>
          )}

        </div>


      </Row>

    </Container>



  )
}

export default App;