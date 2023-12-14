import 'react-data-grid/lib/styles.css';

import DataGrid from 'react-data-grid';

const AmazonDeactivatePage = () => {

    const columns = [
        { key: 'storeName', name: 'Store name' },
        { key: 'storeLink', name: 'Store link' },
        { key: "offersNumber", name: 'Offers #' },
        { key: "departments", name: 'Departs' },
        { key: 'listingsFound', name: 'Listings Found' },
        { key: 'listingsPurchased', name: 'Listings Purchased' },
        { key: 'deactivate', name: 'deactivate' }
    ];

    const rows = [
        { storeName: 'name', storeLink: 'Example', offersNumber: 19, departments: 1, listingsFound: 5, listingsPurchased: 2, deactivate: "false" },
        { storeName: 'name', storeLink: 'Example', offersNumber: 19, departments: 1, listingsFound: 5, listingsPurchased: 2, deactivate: "false" },
        { storeName: 'name', storeLink: 'Example', offersNumber: 19, departments: 1, listingsFound: 5, listingsPurchased: 2, deactivate: "false" },
        { storeName: 'name', storeLink: 'Example', offersNumber: 19, departments: 1, listingsFound: 5, listingsPurchased: 2, deactivate: "false" },
    ];

    return (
        <div>
            <h1>Amazon Deactivate Page</h1>

            <div>
                <form>
                    <input
                        type="text"
                        placeholder="store link / name"
                        name='storeLink'
                        // value={}
                        // onChange={(e) => set}
                        required
                    />

                    <button type='submit'>Find</button>
                </form>

                <div style={{ width: "100%" }}>
                    <DataGrid columns={columns} rows={rows} />
                </div>

            </div>
        </div>
    )
}

export default AmazonDeactivatePage