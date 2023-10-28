import {Router} from "express";
import {EarningsRecord} from "../records/earnings.record";

export const EarningsRouter = Router()
    .get('/search', async (req, res)=> {
        const earnings = await EarningsRecord.findAll();

        res.json(earnings);
    })
    .get('/search/:startDate/:endDate', async (req, res)=> {
        const earnings = await EarningsRecord.findByDate(req.params.startDate, req.params.endDate);

        res.json(earnings);
    })
    .post('/', async (req, res)=> {
        const earning = new EarningsRecord(req.body);
        await earning.insert();
        res.json(earning);
    })