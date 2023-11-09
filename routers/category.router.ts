import {Router} from "express";
import {CategoryRecord} from "../records/category.record";

export const  CategoryRouter = Router()
    .get('/search/:id', async (req, res) => {
        const category = await CategoryRecord.getOne(req.params.id);

        res.json(category);
    })
    .get('/search', async (req, res)=> {
        const categoriesList = await CategoryRecord.findAll();

        res.json({
            categoriesList,
        });
    });
