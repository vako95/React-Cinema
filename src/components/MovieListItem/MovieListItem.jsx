import { SMALL_IMG } from "../../config";
import './MovieListItem.css'


const MovieListItem = ({tvShow,onClikcItem,tvVideo}) => {
    return(
        <div className="item" >
            
          <div className="imgBlock" onClick={() => onClikcItem(tvShow)}>
          <img className="imgBox" width={200} src={SMALL_IMG + tvShow?.backdrop_path} alt={tvShow?.title} />
          <div  className="imgList"><p>{tvShow?.title.length > 25
          ? tvShow?.title.slice(0,25) + " ..."
          : tvShow?.title
          }</p></div>
          
          </div>
           </div>
    );
}

export default MovieListItem;