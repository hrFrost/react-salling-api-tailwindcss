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
            <div>

              <h1>{storePage.store.brand} : {storePage.store.address.city},  {storePage.store.address.street} </h1>
              <div class="bg-white">
            
            <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

              {storePage.clearances.map(item => (
               
              <div class="group relative">
                <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                {item.product.image && <img src={item.product.image} alt="N/A" class="w-full h-full object-center object-cover lg:w-full lg:h-full" />}
                  
                </div>
                <div class="mt-4 flex justify-between">
                  <div>
                    <h3 class="text-sm text-gray-700">
                      <a href="#">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        {item.product.description}
                      </a>
                    </h3>
                    {item.offer.percentDiscount > 49.99 && <p class="mt-1 text-xl text-red-500">{item.offer.percentDiscount}% Spar {item.offer.discount} !</p>}
                    
                  </div>
                  <p class="text-sm font-medium text-gray-900">{item.offer.newPrice} DKK - Normalpris: {item.offer.originalPrice}</p>
   


            </div>
                 




                </div>
              ))}
</div></div>

          </div>

          ))
        }
     
      </div>

      
     




       
          
    
        
    

    );
    
  }
}

export default App;
