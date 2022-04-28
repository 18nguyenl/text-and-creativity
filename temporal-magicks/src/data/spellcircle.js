import fastifyPlugin from "fastify-plugin"
import crypto from "crypto";

export default fastifyPlugin(async (fastify, options, done) => {
    let CURRENT_CIRCLE = {
        id: crypto.randomUUID(),
        objects: []
    }

    async function getCurrentCircle() {
        return CURRENT_CIRCLE;
    }
    fastify.decorate("getCurrentCircle", getCurrentCircle);

    async function addSpellAction(data) {
        CURRENT_CIRCLE.objects.push(data)

        console.log("OBJECT ADDED");
        console.log(CURRENT_CIRCLE.objects);
    }
    fastify.decorate("addSpellAction", addSpellAction);

    done();
})