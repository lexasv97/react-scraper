import { get, put } from "../../services/authService"
import { useEffect, useState, useReducer } from "react"
import AmazonStore from "../../components/AmazonStore"
import { Link } from "react-router-dom"
import 'react-data-grid/lib/styles.css';

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

    const columns = [
        { key: 'name', name: 'Name' },
        { key: 'link', name: 'Link' },
        { key: 'bsr', name: 'BSR' },
        { key: 'bsr1%', name: 'BSR1%' },
        { key: 'Amazon', name: 'Amazon' },
        { key: "checkbox1", name: 'Purchase Order Completed' },
        { key: "checkbox2", name: 'Save For Later' },
        { key: "checkbox3", name: 'Deactivate' }
    ]

    const handleStart = () => {
        get('/amazon/getnewlistings')
            .then((response) => {
                console.log("New listings after start: ", response.data)
                dispatch({ type: 'SET_NEW_DATA', payload: response.data });
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const getNewListings = () => {
        get('/amazon/newlistings')
            .then((response) => {
                //console.log("response.data:", response.data)
                dispatch({ type: 'SET_DATA', payload: response.data });
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const handleCheckboxChange = (listingId, checkboxName) => {
        const updatedData = state.data.map(listing => {
            if (listing._id === listingId) {
                return {
                    ...listing,
                    purchaseOrderCompleted: checkboxName === 'purchaseOrderCompleted',
                    savedForLater: checkboxName === 'savedForLater',
                    deactivated: checkboxName === 'deactivated'
                };
            }
            return {
                ...listing,
                purchaseOrderCompleted: false,
                savedForLater: false,
                deactivated: false
            };
        });

        dispatch({ type: 'SET_DATA', payload: updatedData });
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

    const rowsData = state.data.map(listing => {
        return {
            _id: listing._id,
            name: listing.name,
            link: (
                <Link to={listing.link} target="_blank">{listing.link}</Link>
            ),
            purchaseOrderCompleted: listing.purchaseOrderCompleted,
            savedForLater: listing.savedForLater,
            deactivated: listing.deactivated,
            checkbox1: (
                <input
                    type="checkbox"
                    checked={listing.purchaseOrderCompleted}
                    onChange={() => handleCheckboxChange(listing._id, 'purchaseOrderCompleted')}
                />
            ),
            checkbox2: (
                <input
                    type="checkbox"
                    checked={listing.savedForLater}
                    onChange={() => handleCheckboxChange(listing._id, 'savedForLater')}
                />
            ),
            checkbox3: (
                <input
                    type="checkbox"
                    checked={listing.deactivated}
                    onChange={() => handleCheckboxChange(listing._id, 'deactivated')}
                />
            )
        }
    })

    console.log("state.data: ", state.data)

    return (
        <div>
            <h1>Amazon Research Page</h1>
            <div>
                <button onClick={handleStart}>Start button</button>
            </div>
            <div style={{ width: '100%' }}>
                <DataGrid columns={columns} rows={rowsData} />
            </div>
            <div>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}

export default AmazonResearchPage