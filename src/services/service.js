import axios from "axios";
import cron from "node-cron";
import config from "../config/config.js";
import cryptoModel from "../model/cryptoModel.js"

const fetchData = async(coinId,storeData=false)=>{
    try{
        const response = await axios.get(
            `${config.COIN_GECKO_URL}/coins/${coinId}?x_cg_demo_api_key=${config.COIN_GECKO_API_KEY}`
        );
        
        if(storeData){
            const newCrypto = new cryptoModel({
                coinName: coinId,
                marketCap: response.data["market_data"]["market_cap"]["usd"],
                twentyFourHourChange: response.data["market_data"]["price_change_24h_in_currency"]["usd"],
                currentPrice: response.data["market_data"]["current_price"]["usd"]
            });
            await newCrypto.save();
        }else{
            const newCrypto = {
                price: response.data["market_data"]["current_price"]["usd"],
                marketCap: response.data["market_data"]["market_cap"]["usd"],
                "24hChange": response.data["market_data"]["price_change_24h_in_currency"]["usd"],
            }
            return newCrypto;
        }
    } catch (err) {
        let error = new Error();
        error.status = "400";
        error.message = 'Error fetching data:', err;
        throw error;
    }       
}

cron.schedule('0 */2 * * *',()=>{
    console.log("Fetching Data Market Data For Bit Coin")
    fetchData("bitcoin",true);
    console.log("Fetching Data Market Data For matic Network")
    fetchData("matic-network",true);
    console.log("Fetching Data Market Data For Ethereum")
    fetchData("ethereum",true);
})

const getLast100Records = async (coinId) => {
    try {
        const records = await cryptoModel.find({coinName: coinId})
            .sort({ _id: -1 })
            .limit(100);
        
        return records;
    } catch (err) {
        let error = new Error();
        error.status = "400";
        error.message = 'Error fetching records:'+ err;
        throw error;
        console.error();
    }
};

const calculateDeviation = (records) =>{
    if (!Array.isArray(records)) {
        let error = new Error();
        error.status = "400";
        error.message = "Records are not in an array";
        throw error;
    }
    if (records.length === 0) {
        let error = new Error();
        error.status = "400";
        error.message = "No record Found";
        throw error;
    }
    const prices = records.map(record => record.currentPrice);
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
    const standardDeviation = Math.sqrt(variance);
    return standardDeviation;
}

export {fetchData,getLast100Records,calculateDeviation};
