import axios from "axios";
import cron from "node-cron";
import config from "../config/config.js";
import cryptoModel from "../model/cryptoModel.js"

const fetchData = async(coinId)=>{
    try{
        const response = await axios.get(
            `${config.COIN_GECKO_URL}/coins/${coinId}?x_cg_demo_api_key=${config.COIN_GECKO_API_KEY}`
        );
    
        const newCrypto = new cryptoModel({
            coinName: coinId,
            marketCap: response.data["market_data"]["market_cap"]["usd"],
            twentyFourHourChange: response.data["market_data"]["price_change_24h_in_currency"]["usd"],
            currentPrice: response.data["market_data"]["current_price"]["usd"]
        });
    
        await newCrypto.save(); // Save to the database
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error if you want it to propagate
    }       
}

cron.schedule('0 */2 * * *',()=>{
    console.log("Fetching Data Market Data For Bit Coin")
    fetchData("bitcoin");
    console.log("Fetching Data Market Data For matic Network")
    fetchData("matic-network");
    console.log("Fetching Data Market Data For Ethereum")
    fetchData("ethereum");
})

export default fetchData;
