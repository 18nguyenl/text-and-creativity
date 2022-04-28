// Require the framework and instantiate it
import Fastify from "fastify";
import Initializer from "./loaders/index.js";

const fastify = Fastify()

// Run the server!
const start = async () => {
    try {
        Initializer(fastify)

        await fastify.listen(process.env.PORT || 3000, "0.0.0.0")
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()