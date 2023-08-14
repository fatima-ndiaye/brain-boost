import React from "react"
import { Link } from "react-router-dom"

function Home() 
{
    return(
        <div className="home-container flex container">
            <h1 className="homepage__title fs-h1 ff-secondary letter-spacing-1">Brain Boost</h1>
            <p className="homepage__desc">
                Boost your knowledge and have fun with our quiz app!
                Challenge yourself with diverse topics.
                Play now and give your brain a workout!
            </p>
            <Link to="categories" className="homepage__btn link-btn letter-spacing-3">Start Quiz</Link>
        </div>
    )

}
export default Home