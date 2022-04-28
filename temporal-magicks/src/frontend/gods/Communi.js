import { God } from "@18nguyenl/artificer";

export default class Communi extends God {
    constructor() {
        super("Communi");

        let websocketPrefix = "ws";
        if (process.env.NODE_ENV === "production") {
            const websocketPrefix = "wss";
        }
        this.telepathy = new WebSocket(`${websocketPrefix}://${window.location.host}/circle`)

        this.telepathy.addEventListener("message", (ev) => {
            console.log(ev.data);
            const data = JSON.parse(ev.data)

            if (!!data.action) {
                this.manifest(data.action, data.data);
            }
        })

        this.initialize()
    }

    initialize() {
        fetch("/circle/initialize").then(res => res.json()).then(data => {
            data.data.forEach(action => {
                this.manifest(action.type, action);
            })
        })
    }

    communeWords(message) {
        this.telepathy.send(JSON.stringify({ message: message }))
    }

    communeIdea(action, idea) {
        this.telepathy.send(JSON.stringify({ action: action, data: idea }))
    }

    manifest(action, data) {
        this.world.pantheon["Visio"].act((god) => {
            switch (action) {
                case "circle":
                    const circle = god.createCircle([data.position.x, data.position.y]);
                    circle.data = data;
                    break;
                case "line":
                    const line = god.createLine(data.positions.start, data.positions.end);
                    line.data = data;
                    break;
                case "outline":
                    const outline = god.createOutlineFromPoint(data.position);
                    outline.data = data;
                    break;
                case "label":
                    const tempPath = god.createPathFromJSON(data.path);
                    god.createAlignedText(data.label, tempPath, { fontSize: 10 }, data.scale);

                    tempPath.remove();
                    break;
            }
        })
    }
}