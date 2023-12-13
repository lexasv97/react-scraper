import { Link } from "react-router-dom"

const GamestopGame = ({ game }) => {
    return (
        game ?
        <div key={game._id}>
            <Link to={game.url}>{game.name}</Link>
            <p>{game.price}</p>
        </div>
        :
        <div></div>
    )
}

export default GamestopGame

