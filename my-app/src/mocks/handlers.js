import { rest } from 'msw';
import {coffeeCafe, studyCafe } from "./data";

export const handlers = [
    rest.get('/coffeecafes', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(coffeeCafe));
    }),

    rest.get('/studycafes', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(studyCafe))
    })
]