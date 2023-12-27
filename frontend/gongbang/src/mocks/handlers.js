import { rest } from 'msw';
import {coffeeCafe, studyCafe } from "./data";

export const handlers = [
    rest.get('/api/coffeecafes', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(coffeeCafe));
    }),
    
    rest.get(`/api/coffeecafe/:id`, (req, res, ctx) => {
        const { id } = req.params;
        const cafeDetail = coffeeCafe.find(item => item.id === parseInt(id));
        
        if (cafeDetail) {
            return res(ctx.status(200), ctx.json(cafeDetail));
        } else {
            return res(ctx.status(404));
        }
    })

]