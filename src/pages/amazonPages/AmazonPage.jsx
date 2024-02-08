import { useState, useEffect } from "react"
import { get, post } from "../../services/authService"
import { Link } from "react-router-dom"

const AmazonPage = () => {

    const [allAmazonStores, setAllAmazonStores] = useState([])
    const [storeLink, setStoreLink] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmitStoreLink = (e) => {
        e.preventDefault()

        const body = {storeLink}
        post('/amazon/addnewlink', body)
        .then((response) => {
            setMessage('Store was successfully added.')
        })
        .catch(error => {
            const errorDescription = error.response.data.message;
            console.log(error)
            setMessage(errorDescription);
        })
    }

  return (
    <div>
        <h1>Amazon</h1>

        <form onSubmit={handleSubmitStoreLink}>
            <input
            placeholder="store link"
            type="text"
            name='storeLink'
            value={storeLink}
            onChange={(e) => setStoreLink(e.target.value)}
            required
            />

            <button type='submit'>Add store</button>
        </form>

        {message && <p>{message}</p>}

        <div>
            <Link to='/amazon/research'>Research</Link>
        </div>
        <div>
            <Link to='/amazon/statistics'>Statistics</Link>
        </div>
        <div>
            <Link to='/amazon/savedlistings'>Saved listings</Link>
        </div>
        {/* {
            allAmazonStores && 
            <div>
                {
                    allAmazonStores.map((store) => {
                        <div key={store._id}>
                            <Link to={store.storeLink}>{store.storeName}</Link>
                            {
                              allAmazonStores.items.map((item) => {
                                <div key={item._id}>

                                </div>
                              })  
                            }
                        </div>
                    })
                }
            </div>
        } */}
    </div>
  )
}

export default AmazonPage