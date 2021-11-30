import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const token = "fb055a75-54b7-485e-8231-bac428ca8263";

  useEffect(() => {
    fetch('https://api.sallinggroup.com/v1/food-waste/?zip=5260', {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
       
          {items.map(storePage => (
          <ul>
            
              <h1>{storePage.store.brand} : {storePage.store.address.city},  {storePage.store.address.street} </h1>
            
           
             {storePage.clearances.map(item => (
               <ul>
               <li><strong>{item.product.description}  </strong></li> - Spar: {item.offer.discount} Original Pris: {item.offer.originalPrice} : Tilbuds Pris {item.offer.newPrice}
                {item.offer.percentDiscount > 49.99 && <strong class="red"> 50%! </strong> }
                
                

                
                </ul>
             ))}
           
       
            </ul> 

          ))}
    
        
      </div>

    );
  }
}

export default App;
