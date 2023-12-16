import { get } from "../../services/authService"
import { useState } from "react"
import AmazonStore from "../../components/AmazonStore"
import { Link } from "react-router-dom"
import DataGrid from 'react-data-grid';

const AmazonResearchPage = () => {

    const [newData, setNewData] = useState([])

    const handleClick = () => {

        get('/amazon/getnewlistings')
            .then((response) => {
                setNewData(response.data)
                console.log(newData)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <h1>Amazon Research Page</h1>

            <button onClick={handleClick}>Start button</button>
            <div>
                {newData.length > 0 ?
                    <div>
                        {
                            newData.map((store) => {
                                return (
                                    <div>
                                        <hr />
                                        <Link to={store.storeLink}>{store.storeName}</Link>
                                        <hr />
                                        {
                                            store.listOfLinks.length > 0 ?
                                                <div>
                                                    {store.listOfLinks.map((link) => {
                                                        return (
                                                            <div>
                                                                <Link to={link.link} key={link._id}>{link.name}</Link>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                :
                                                <div></div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    :
                    <div></div>
                }

                {/* <button>Save</button> */}
            </div>
        </div>
    )
}

export default AmazonResearchPage