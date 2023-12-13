import { Link } from "react-router-dom"

const GamestopGame = ({ game }) => {
    return (
        game &&
        <div>
            <h3>{game.name}</h3>
            <Link>{game.url}</Link>
        </div>
    )
}

export default GamestopGame