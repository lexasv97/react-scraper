import { useState, useEffect } from "react"
import { get, post } from "../../services/authService"
import { Link } from "react-router-dom"
import { SyncLoader } from 'react-spinners'

const AmazonPage = () => {

    const [allAmazonStores, setAllAmazonStores] = useState([])
    const [storeLink, setStoreLink] = useState('')
    const [listingLink, setListingLink] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleSubmitStoreLink = (e) => {
        e.preventDefault()

        const body = { storeLink }
        setIsLoading(true)
        post('/amazon/addnewlink', body)
            .then((response) => {
                setIsLoading(false)
                setMessage('Store was successfully added.')
            })
            .catch(error => {
                const errorDescription = error.response.data.message;
                console.log(error)
                setIsLoading(false)
                setMessage(errorDescription);
            })
    }

    const handleSubmitItemLink = (e) => {
        e.preventDefault()

        const body = { listingLink }
        setIsLoading(true)
        post('/amazon/getSellersOfItem', body)
            .then((response) => {
                setIsLoading(false)
                setMessage('Scanning completed successfully')
            })
            .catch(error => {
                const errorDescription = error.response.data.message;
                console.log(error)
                setIsLoading(false)
                setMessage(errorDescription)
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

            <form onSubmit={handleSubmitItemLink}>
                <input
                    placeholder="item link"
                    type="text"
                    name='listingLink'
                    value={listingLink}
                    onChange={(e) => setListingLink(e.target.value)}
                    required
                />

                <button type='submit'>Scan listing</button>
            </form>

            {
                isLoading && <SyncLoader color="#36d7b7" margin={5} />
            }

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
        </div>
    )
}

export default AmazonPage