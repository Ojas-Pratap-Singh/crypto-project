import axios from "axios";

export const getCoinPRices = (id,day,priceType)=>{
   const prices =  axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${day}&interval=daily`, { crossDomain: true } )
    .then((response) =>{
      console.log("price >>",response.data.prices)
      return response.data[priceType];

    }).catch((error) => {
      console.log("error", error);
    });
    return prices;
}