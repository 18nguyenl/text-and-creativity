// Require the framework and instantiate it
import Fastify from "fastify";
import Initializer from "./loaders/index.js";
import fs from "fs";
import path from "path";

const fastify = Fastify({ logger: true })

// Run the server!
const start = async () => {
    try {
        Initializer(fastify)

        await fastify.listen(process.env.PORT || 3000, "0.0.0.0")
        console.log("Server listening on port", process.env.PORT || 3000);
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()