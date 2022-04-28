import { InstructionData } from "../data/index.js"

export default function async(fastify, options, done) {
    fastify.get("/", async (req, rep) => {
        rep.view("/src/views/index.pug", {
            title: "Temporal Magicks"
        })
    })

    fastify.get("/instruction", async (req, rep) => {
        rep.view("/src/views/instruction.pug", {
            title: "How do I Cast a Spell?",
            articles: InstructionData.articles,
        })
    })

    fastify.get("/prompt", async (req, rep) => {
        rep.view("/src/views/prompt.pug", {
            title: "Imagine.",
            subtitle: "Channel yourself in the image"
        })
    })

    fastify.get("/canvas", async (req, rep) => {
        rep.view("/src/views/canvas.pug", {

        })
    })

    done();
}