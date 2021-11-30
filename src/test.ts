{items.map(storePage => (
    <ul>

      <h1>{storePage.store.brand} : {storePage.store.address.city},  {storePage.store.address.street} </h1>


      {storePage.clearances.map(item => (
        <ul>
          <li><strong>{item.product.description}  </strong></li> - Spar: {item.offer.discount} Original Pris: {item.offer.originalPrice} : Tilbuds Pris {item.offer.newPrice}
          {item.offer.percentDiscount > 49.99 && <strong class="red"> 50%! </strong>}




        </ul>
      ))}


    </ul>

  ))
}