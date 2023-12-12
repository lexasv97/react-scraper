import { useState, useEffect } from "react"
import { post, get } from "../services/authService";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [linkOfAllGamestopGAmes, setLinkOfAllGamestopGAmes] = useState('')
    const [linkOfClearenceGamestop, setLinkOfClearenceGamestop] = useState('')
    const [numberOfPages, setNumberOfPages] = useState(0)
    const [data, setData] = useState([])
    const navigate = useNavigate()

    const allGamestopGamesLinkSubmit = (e) => {
        e.preventDefault()

        const body = { linkOfAllGamestopGAmes, numberOfPages }

        post('/gamestop/new', body)
            .then((response) => {
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const gamestopClearenceLinkSubmit = (e) => {
        e.preventDefault()

        const body = { linkOfClearenceGamestop }
    }
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
                <h1>Gamestop Clearence link</h1>
                <form onSubmit={gamestopClearenceLinkSubmit}>
                    <input
                        type="text"
                        placeholder="link"
                        name='linkOfClearenceGamestop'
                        value={linkOfClearenceGamestop}
                        onChange={(e) => setLinkOfClearenceGamestop(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div> {data && <div>
            {
                data.map((game) => {
                    <div key={game._id}>
                        <p>{game}</p>
                        {/* <p>{game.link}</p> */}
                    </div>
                })
            }
            </div>
            }
            </div>
        </div>
    )
}

export default HomePage