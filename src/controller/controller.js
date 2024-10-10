import express from "express";
import {fetchData,getLast100Records,calculateDeviation} from "../services/service.js";

const statsRoute = express.Router();
const deviationRoute = express.Router();

statsRoute.get("/stats",async (req,res,next)=>{
    const coin = req.query.coin;
    try{
        const data = await fetchData(coin);
        return res.status(200).send({data:data});
    }catch(error){
        return next(error);
    }
})

deviationRoute.get("/deviation",async(req,res,next)=>{
    const coin = req.query.coin;
    try{
        const records = await getLast100Records(coin);
        const deviation = calculateDeviation(records);
        return res.status(200).send({deviation: deviation});
    }catch(error){
        return next(error);
    }
})

export {statsRoute,deviationRoute};