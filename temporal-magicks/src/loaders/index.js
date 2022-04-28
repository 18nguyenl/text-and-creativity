import init from "./init.js";
import views from "./views.js";
import websocket from "./websocket.js";

export default async function (app) {
    await websocket(app);
    await init(app);
    await views(app);
}