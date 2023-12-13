import { useState, useEffect } from "react"
import { post, get } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import GamestopGame from "../components/GamestopGame";

const HomePage = () => {
    const [linkOfAllGamestopGAmes, setLinkOfAllGamestopGAmes] = useState('https://www.gamestop.com/video-games/new?prefn1=platform&prefv1=Nintendo%7CNintendo%20Switch%7CPlayStation%204%7CPlayStation%205%7CSuper%20Nintendo%7CXbox%20One%7CXbox%20Series%20S%7CXbox%20Series%20X&view=new&hybrid=true')
    const [linkOfClearenceGamestop, setLinkOfClearenceGamestop] = useState('https://www.gamestop.com/search/new/?prefn1=platform&prefv1=Nintendo%7CNintendo%20Switch%7CPlayStation%204%7CPlayStation%205%7CSuper%20Nintendo%7CXbox%20One%7CXbox%20Series%20S%7CXbox%20Series%20X&view=new')
    const [numberOfPages, setNumberOfPages] = useState(1)
    const [data, setData] = useState([])
    const navigate = useNavigate()

    const allGamestopGamesLinkSubmit = (e) => {
        e.preventDefault()

        const body = { linkOfAllGamestopGAmes, numberOfPages }

        post('/gamestop/new', body)
            .then((response) => {
                setData(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getAllGamestopGames = () => {
        get('/gamestop')
            .then((response) => {
                setData(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // useEffect(() => {
    //     getAllGamestopGames()
    // }, [])
    return (
        <div>
            <div>
                <h1>All Gamestop Games link</h1>
                <form onSubmit={allGamestopGamesLinkSubmit}>
                    <input
                        type="text"
                        placeholder="link"
                        name='linkOfAllGamestopGAmes'
                        value={linkOfAllGamestopGAmes}
                        onChange={(e) => setLinkOfAllGamestopGAmes(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="number"
                        name='numberOfPages'
                        value={numberOfPages}
                        onChange={(e) => setNumberOfPages(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                <p>https://www.gamestop.com/search/new/?prefn1=platform&prefv1=Nintendo%7CNintendo%20Switch%7CPlayStation%204%7CPlayStation%205%7CSuper%20Nintendo%7CXbox%20One%7CXbox%20Series%20S%7CXbox%20Series%20X&view=new</p>
            </div>
            
            <div>
                {data.length &&
                    <div>
                        {
                            data.map((game) => {
                                return (<GamestopGame key={game._id} game={game} />)
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default HomePage