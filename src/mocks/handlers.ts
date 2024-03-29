import { http } from "msw";
import coffeeCafes from "./data";

export const handlers = [
  http.get(`/api/coffeecafes/all/1`, ({ request }) => {
    return new Response(JSON.stringify(coffeeCafes));
  }),
  http.get(`/api/coffeecafes/detail/:id`, ({ request }) => {
    return new Response(JSON.stringify(coffeeCafes[0]));
  }),
];
