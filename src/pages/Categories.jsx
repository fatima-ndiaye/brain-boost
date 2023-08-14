import React from "react"
import {Link} from "react-router-dom"
import GKImg from '../assets/general_knowledge.jpg'
import sportsImg from '../assets/sports.jpg'
import bookImg from '../assets/litterature.jpg'
import filmImg from '../assets/film.jpg'

function Categories() {
    const [categories, setCategories] = React.useState([
        { name: "General Knowledge", id: 9, img:GKImg }, 
        { name: "Books", id: 10, img: bookImg },
        { name: "Film", id: 11, img: filmImg },
        { name: "Sports", id: 21, img: sportsImg}])
    const [loading, setLoading] = React.useState(true)
    
    React.useEffect(() => {
        // Simulate loading data (replace with actual data fetching logic)
        setTimeout(() => {
            setLoading(false); // Set loading to false once data is loaded
        }, 1500); // Simulating a 1.5-second loading time
    }, []);
    

    const categoryElements = categories.map(category => (
        <div key={category.id} className="category-tile">
            <Link to={`${category.id}`} className="flex">
                <img src={category.img} className='category-img' />
                <h3 className="fs-h3 secondary-text-clr fw-light">{category.name}</h3>
            </Link>
        </div>
    ))
    if (loading) {
        return <div className='loader-container flex'><div className="lds-dual-ring"></div></div>
    }

    return (
        <div className="category-list-container container flex">
            <h2 className="main-text-clr ff-secondary fs-h2">What subject do you want to improve today ?</h2>
            <Link
                to=".."
                relative="path"
                className="back-button main-text-clr"
            >&larr; <span>Back to Homepage</span></Link>
            <div className="category-list grid">
                {categoryElements}
            </div>
            
        
        </div>
        
    )

}
export default Categories