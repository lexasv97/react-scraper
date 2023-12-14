import { useState, useEffect } from "react"
import { get } from "../../services/authService"

const AmazonPage = () => {

    const [allAmazonStores, setAllAmazonStores] = useState([])
    const [storeLink, setStoreLink] = useState('')
    const [responseMessage, setResponseMessage] = useState('')

    const getAllStores = () => {
        get('/amazon/stores')
        .then((response) => {
            setAllAmazonStores(response.data)
        })
        .catch((err) => {
            console.log(err)
          })
    }

    const handleSubmitStoreLink = (e) => {
        e.preventDefault()

        const body = {storeLink}
        post('/amazon/newlink', body)
        .then((response) => {
            setResponseMessage(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAllStores()
    }, [])

  return (
    <div>
        <h1>Amazon</h1>

        <form onSubmit={handleSubmitStoreLink}>
            <input
            placeholder="store link"
            type="text"
            name='storeLink'
            value={storeLink}
            onChange={(e) => setStoreLink}
            required
            />

            <button type='submit'>Add store</button>
        </form>

        {responseMessage && <p>{responseMessage}</p>}
        
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