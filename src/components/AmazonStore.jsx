
const AmazonStore = (store) => {
  return (
    <div>
      <h3>{store.storeName}</h3>
      {/* {
        store.listOfLinks.length > 0 ?
          <div>
            {store.listOfLinks.map((link) => {
              return (
                <div key={link._id}>{link.link}</div>)
            })}
          </div>
          :
          <div></div>
      } */}
    </div>
  )
}

export default AmazonStore