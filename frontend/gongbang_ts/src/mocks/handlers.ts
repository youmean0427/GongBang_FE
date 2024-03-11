import { http } from "msw";
import coffeeCafes from "./data";

export const handlers = [
  http.get(`/api/coffeecafes/1`, ({ request }) => {
    return new Response(JSON.stringify(coffeeCafes));
  }),
  http.get(`/api/coffeecafe/:id`, ({ request }) => {
    return new Response(JSON.stringify(coffeeCafes[0]));
  }),
];
