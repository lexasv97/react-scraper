import { get, put } from "../../services/authService"
import { useEffect, useState, useReducer } from "react"
import AmazonStore from "../../components/AmazonStore"
import { Link } from "react-router-dom"
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';

const initialState = {
    data: [],
    changedListings: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CHANGED_LISTINGS':
            return { ...state, changedListings: action.payload };
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

const AmazonStatisticsPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [errorMessage, setErrorMessage] = useState('')

    const columns = [
        { key: 'name', name: 'Name' },
        { key: 'link', name: 'Link' },
        { key: 'bsr', name: 'BSR' },
        { key: 'bsr1%', name: 'BSR1%' },
        { key: 'Amazon', name: 'Amazon' },
        { key: "checkbox1", name: 'Purchase Order Completed' },
        { key: "checkbox3", name: 'Deactivate' }
    ]

    const getSavedListings = () => {
        get('/amazon/savedlistings')
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
                    [checkboxName]: !listing[checkboxName]
                };
            }
            return listing;
        });
    
        dispatch({ type: 'SET_DATA', payload: updatedData });
    
        const changedListing = updatedData.find(listing => listing._id === listingId);
        const index = state.changedListings.findIndex(item => item._id === listingId);
    
        if (index === -1 && (changedListing.purchaseOrderCompleted || changedListing.deactivated)) {
            dispatch({ type: 'TOGGLE_CHECKBOX', payload: changedListing });
        } else if (index !== -1 && !(changedListing.purchaseOrderCompleted || changedListing.deactivated)) {
            const filteredListings = state.changedListings.filter(item => item._id !== listingId);
            dispatch({ type: 'SET_CHANGED_LISTINGS', payload: filteredListings });
        }
    };

    const handleSave = () => {
        if (state.changedListings.length === 0) {
            setErrorMessage('No changes to save.')
            return
        }
        // Perform axios.put request using state.changedListings
        console.log("Changed Listings: ", state.changedListings);
        put('/amazon/updatelistings', state.changedListings)
            .then((response) => {
                console.log(response)
                getSavedListings()
            })
            .catch((err) => {
                console.log(err)
            })
    };

    useEffect(() => {
        getSavedListings()
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
                    name={`purchaseOrderCompleted_${listing._id}`}
                    checked={listing.purchaseOrderCompleted}
                    onChange={() => handleCheckboxChange(listing._id, 'purchaseOrderCompleted')}
                />
            ),
            checkbox3: (
                <input
                    type="checkbox"
                    name={`deactivated_${listing._id}`}
                    checked={listing.deactivated}
                    onChange={() => handleCheckboxChange(listing._id, 'deactivated')}
                />
            )
        }
    })

    //  console.log("state.data: ", state.data)

    return (
        <div>
            <h1>Amazon Saved Listings</h1>
            {errorMessage && <p>{errorMessage}</p>}
            <div>
                <button onClick={handleSave}>Save</button>
            </div>
            <div>
                <DataGrid columns={columns} rows={rowsData} />
            </div>
        </div>)
}

export default AmazonStatisticsPage