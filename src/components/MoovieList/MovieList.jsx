import MovieListItem from "../MovieListItem/MovieListItem";
import './MovieList.css'
import { useState } from 'react'

const MovieList = ({ tvShowList, onClikcItem, tvVideo }) => {
    const setMoovieslide = useState(0)
    const nextSlide = () => {
        setMoovieslide((prev) => (prev === tvShowList - 1 ? 0 : prev + 1))
    }

    return (
        <div className="list" >

            {tvShowList.map(tvShow => {
                return (
                    <div key={tvShow?.id}>
                        <MovieListItem tvShow={tvShow} tvVideo={tvVideo}
                            nextSlide={nextSlide}
                            onClikcItem={onClikcItem}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default MovieList;