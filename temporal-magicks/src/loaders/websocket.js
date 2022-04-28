import FastifyWebsocket from "fastify-websocket";
import { SpellCircleModel } from "../data/index.js";

export default async function (app) {
    app.register(FastifyWebsocket);

    app.register(SpellCircleModel);
}