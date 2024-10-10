import { config } from "dotenv";
import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema;

const cryptoSchema = new schema({
    coinName: {
        type: String
    },
    marketCap: {
        type: String
    },
    twentyFourHourChange: {
        type: String
    },
    currentPrice: {
        type: String
    }
},{timestamps:true}
)

const cryptoModel = mongoose.model('cryptoModel',cryptoSchema);

export default cryptoModel;