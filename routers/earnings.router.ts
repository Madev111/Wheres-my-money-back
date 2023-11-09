import {Router} from "express";
import {EarningsRecord} from "../records/earnings.record";
import {ValidationError} from "../utils/errors";

export const EarningsRouter = Router()

    .get('/:earningId', async (req, res) => {
        const earning = await EarningsRecord.getOne(req.params.earningId);

        res.json(earning);
    })
    .get('/', async (req, res) => {
        const earningsList = await EarningsRecord.findAll();

        res.json({
            earningsList,
        });
    })
    .get('/search/:startDate/:endDate', async (req, res) => {
        const earningsList = await EarningsRecord.findByDate(req.params.startDate, req.params.endDate);

        res.json({
            earningsList,
        });
    })
    .post('/', async (req, res) => {
        const earning = new EarningsRecord(req.body);
        await earning.insert();
        res.json(earning);
    })
    .delete('/:id', async (req, res) => {

        const earning = await EarningsRecord.getOne(req.params.id)

        if (!earning) {
            throw new ValidationError('This earning does not exist.')
        }

        await earning.delete()

        res.end();

    })