import './SearchBar.css'


const SearchBar = ({onSubmit}) => {

    function movieSearch(e) {
        if(e.key === "Enter" && e.target.value.trim() !== ""){
            onSubmit(e.target.value)
        }
    
    }
    return(
        <div className="search">
<div className="flexSeacrh">


<div class="container">

<input   placeholder="Search..." className="search-input" width={250} onKeyUp={(e) => movieSearch(e)} type="text" />
 

<div class="search"></div>
        </div>
        </div>
        </div>
    )
}

export default SearchBar;