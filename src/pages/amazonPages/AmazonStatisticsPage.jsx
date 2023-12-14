import 'react-data-grid/lib/styles.css';

import DataGrid from 'react-data-grid';

const AmazonStatisticsPage = () => {

  const columns = [
    { key: 'storeName', name: 'Store name' },
    { key: 'storeLink', name: 'Store link' },
    { key: "offersNumber", name: 'Offers #' },
    { key: "departments", name: 'Departs' },
    { key: 'newLinks', name: 'New links' },
    { key: 'purchased', name: 'purchased?' },
  ];

  const rows = [
    { storeName: 0, storeLink: 'Example', offersNumber: 1, departments: 1, newLinks: 'link', purchased: "true"},
    { storeName: 0, storeLink: 'Example', offersNumber: 1, departments: 1, newLinks: 'link', purchased: "true"},
    { storeName: 0, storeLink: 'Example', offersNumber: 1, departments: 1, newLinks: 'link', purchased: "true"},
    { storeName: 0, storeLink: 'Example', offersNumber: 1, departments: 1, newLinks: 'link', purchased: "true"},
  ];

  return (
    <DataGrid columns={columns} rows={rows} />
  )
}

export default AmazonStatisticsPage