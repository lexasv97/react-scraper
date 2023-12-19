import 'react-data-grid/lib/styles.css';
import { Link } from 'react-router-dom';
import DataGrid from 'react-data-grid';
import { useEffect, useState } from 'react';
import { get, put } from '../../services/authService';

const AmazonStatisticsPage = () => {

  const [data, setData] = useState([])
  const [deactivatedStates, setDeactivatedStates] = useState({})
  const [deactivatedStores, setDeactivatedStores] = useState([]); // State to store deactivated stores
  const [searchField, setSearchField] = useState('')
  const [filteredData, setFilteredData] = useState([]); // New state for filtered data

  const columns = [
    { key: 'storeName', name: 'Store name' },
    { key: 'storeLink', name: 'Store link' },
    { key: "numberOfOffers", name: 'Offers #' },
    { key: 'newLinksFound', name: 'New links' },
    { key: 'purchaseOrderCompletedNumber', name: 'Purchased count' },
    { key: "purchasePercantage", name: 'Purchase %' },
    { key: "checkbox", name: 'Deactivate' }
  ]

  const handleChange = (e) => {
    setSearchField(e.target.value);
    const filtered = data.filter((store) => {
      return (
        store.storeLink.toLowerCase().includes(searchField.toLowerCase()) ||
        store.storeName.toLowerCase().includes(searchField.toLowerCase())
      )
    })
    setFilteredData(filtered); // Update filtered data state instead of directly setting 'data'
  }

  const getAllActiveStores = async () => {
    try {
      const res = await get('/amazon/getAllActiveStores');
      setData(res.data);
      // Initialize deactivatedStates with store IDs and their default deactivated state (usually false)
      const initialState = res.data.reduce((acc, store) => {
        acc[store._id] = store.deactivated || false;
        return acc;
      }, {});
      setDeactivatedStates(initialState);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllActiveStores()
  }, [])

  const handleCheckboxChange = (storeId) => {
    setDeactivatedStates(prevState => ({
      ...prevState,
      [storeId]: !prevState[storeId], // Toggle the deactivated state for the specific store
    }));

    // Add or remove store from deactivatedStores array based on the checkbox state
    setDeactivatedStores(prevStores => {
      if (deactivatedStates[storeId]) {
        // Remove store if already deactivated
        return prevStores.filter(store => store !== storeId);
      } else {
        // Add store if not deactivated
        return [...prevStores, storeId];
      }
    });
  };

  const handleSave = () => {
    console.log(deactivatedStores)
    put('/amazon/deactivateStores', deactivatedStores)
      .then(() => {
        //console.log(res);
        getAllActiveStores()
      })
      .catch(err => {
        console.log(err);
      })
  }

  const rowsData = (searchField !== '' ? filteredData : data).map(store => {
    const countOrdered = store.listings.reduce((count, listing) => {
      return count + (listing.purchaseOrderCompleted ? 1 : 0);
    }, 0);

    return {
      storeName: store.storeName,
      storeLink: (
        <Link to={store.storeLink} target="_blank">{store.storeLink}</Link>
      ),
      numberOfOffers: store.numberOfOffers,
      newLinksFound: store.newLinksFound,
      purchaseOrderCompletedNumber: countOrdered,
      purchasePercantage: (countOrdered / store.newLinksFound * 100).toFixed(1) || 0,
      deactivated: deactivatedStates[store._id] || false,
      checkbox: (
        <input
          type="checkbox"
          checked={deactivatedStates[store._id] || false}
          onChange={() => handleCheckboxChange(store._id)}
        />
      )
    }
  })

  //console.log("dara: ", data)

  return (
    <div>
      <div>
        <h1>Amazon Statistics Page</h1>
      </div>
      <div >
        <input
          placeholder="Search for..."
          type="text"
          onChange={handleChange}
        />
      </div>
      <div>
        <button onClick={handleSave}>Save</button>
      </div>
      <div style={{ height: '650px', overflow: 'auto' }}>
        <DataGrid columns={columns} rows={rowsData} style={{ height: '100%' }} />
      </div>
    </div>
  )
}

export default AmazonStatisticsPage
