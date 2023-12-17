import { get, put } from "../../services/authService"
import { useEffect, useState, useReducer } from "react"
import AmazonStore from "../../components/AmazonStore"
import { Link } from "react-router-dom"
import DataGrid from 'react-data-grid';

const initialState = {
    newData: [],
    data: [],
    changedListings: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_NEW_DATA':
            return { ...state, newData: action.payload };
        case 'SET_DATA':
            return { ...state, data: action.payload };
        case 'TOGGLE_CHECKBOX':
            const changedListing = action.payload;
            const index = state.changedListings.findIndex(item => item._id === changedListing._id);
            let updatedList = [];

            if (index !== -1) {
                updatedList = [
                    ...state.changedListings.slice(0, index),
                    changedListing,
                    ...state.changedListings.slice(index + 1)
                ];
            } else {
                updatedList = [...state.changedListings, changedListing];
            }

            return { ...state, changedListings: updatedList };
        default:
            return state;
    }
};

const AmazonResearchPage = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleStart = () => {
        get('/amazon/getnewlistings')
            .then((response) => {
                dispatch({ type: 'SET_NEW_DATA', payload: response.data });
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const getNewListings = () => {
        get('/amazon/newlistings')
            .then((response) => {
                dispatch({ type: 'SET_DATA', payload: response.data });
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const handleCheckboxChange = (listing) => {
        dispatch({ type: 'TOGGLE_CHECKBOX', payload: listing });
    };
    const handleSave = () => {
        // Perform axios.put request using state.changedListings
        console.log("Changed Listings: ", state.changedListings);
        put('/amazon/updatelistings', state.changedListings)
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
    };
    useEffect(() => {
        getNewListings()
    }, [])

    return (
        <div>
            <h1>Amazon Research Page</h1>

            <button onClick={handleStart}>Start button</button>
            {/* <div>
                {state.newData.length > 0 ?
                    <div>
                        {
                            state.newData.map((store) => {
                                return (
                                    <div key={store._id}>
                                        <hr />
                                        <Link to={store.storeLink}>{store.storeName}</Link>
                                        <hr />
                                        {
                                            store.listOfLinks.length > 0 ?
                                                <div>
                                                    {store.listOfLinks.map((link) => {
                                                        return (
                                                            <div key={link._id}>
                                                                <Link to={link.link}>{link.name}</Link>
                                                                <input
                                                                    type="checkbox"
                                                                    name="purchaseOrderCompleted"
                                                                    value={purchaseOrderCompleted}
                                                                    onChange={(e) => setPurchaseOrderCompleted(e.target.value)} />
                                                                <input
                                                                    type="checkbox"
                                                                    name="savedForLater"
                                                                    value={savedForLater}
                                                                    onChange={(e) => setSavedForLater(e.target.value)} />
                                                                <input
                                                                    type="checkbox"
                                                                    name="deactivated"
                                                                    value={deactivated}
                                                                    onChange={(e) => setDeactivated(e.target.value)} />
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
            </div>
            <hr /> */}
            <div>
                {state.data.length > 0 ?
                    <div>
                        {
                            state.data.map((store) => {
                                return (
                                    <div key={store._id}>
                                        <hr />
                                        <Link to={store.storeLink}>{store.storeName}</Link>
                                        <hr />
                                        {
                                            store.listings.length > 0 ?
                                                <div>
                                                    {store.listings.map((listing) => {
                                                        return (
                                                            <div key={listing._id}>
                                                                <Link to={listing.listing}>{listing.name}</Link>
                                                                <input
                                                                    type="checkbox"
                                                                    name={`purchaseOrderCompleted`} // _${listing._id}
                                                                    checked={state.changedListings.some(item => item._id === listing._id && item.purchaseOrderCompleted)}
                                                                    onChange={() => handleCheckboxChange({
                                                                        ...listing,
                                                                        purchaseOrderCompleted: !listing.purchaseOrderCompleted
                                                                    })}
                                                                />
                                                                <input
                                                                    type="checkbox"
                                                                    name={`savedForLater`} // _${listing._id}
                                                                    checked={state.changedListings.some(item => item._id === listing._id && item.savedForLater)}
                                                                    onChange={() => handleCheckboxChange({
                                                                        ...listing,
                                                                        savedForLater: !listing.savedForLater
                                                                    })}
                                                                />
                                                                <input
                                                                    type="checkbox"
                                                                    name={`deactivated`} // _${listing._id}
                                                                    checked={state.changedListings.some(item => item._id === listing._id && item.deactivated)}
                                                                    onChange={() => handleCheckboxChange({
                                                                        ...listing,
                                                                        deactivated: !listing.deactivated
                                                                    })}
                                                                />
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
            </div>
            <div>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}

export default AmazonResearchPage