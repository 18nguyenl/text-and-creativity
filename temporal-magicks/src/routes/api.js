export function API(fastify, options, done) {
    fastify.register((fastify, options, done) => {
        fastify.get("/words-:num", async (req, rep) => {
            const { rows } = await fastify.dbGetNWords(req.params.num);
            rep.send(JSON.stringify(rows));
        })

        fastify.post("/add/words", async (req, rep) => {
            console.log("received " + req.body);
            if (req.body !== undefined) {
                await fastify.dbInsertWords(req.body);
                rep.send("Words Inserted");
            }
        })

        done();
    })

    fastify.register((fastify, options, done) => {
        const connections = [];
        fastify.get("/circle/initialize", async (req, rep) => {
            const CurrentCircle = await fastify.getCurrentCircle();

            rep.send({ data: CurrentCircle.objects });
        })

        fastify.get("/circle", { websocket: true }, (connection, req) => {
            connections.push(connection);
            connection.socket.on('message', async message => {
                const msg = JSON.parse(message);
                console.log("MESSAGE RECEIVED");
                console.log(msg)
                await fastify.addSpellAction(msg.data);
                connections.forEach(con => {
                    con.socket.send(JSON.stringify({ action: msg.action, data: msg.data }))
                })
            })
        })

        done();
    })
    done();
}