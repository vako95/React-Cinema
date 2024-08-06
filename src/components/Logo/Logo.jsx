import './Logo.css'




const Logo = ({img}) => {

    return(
        
  <div className="logo">
        <img src={img} width={200} alt="" />
        </div>    
    )
}

export default Logo