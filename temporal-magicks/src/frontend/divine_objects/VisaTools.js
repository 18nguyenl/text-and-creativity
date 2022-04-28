import Paper from "paper";

export function hitTestItem(evt) {
    return Paper.project.getItems({
        // ...keep those containing event point...
        match: function (item) {
            return item.contains(evt.point);
        }
        // ...and retrieve the last one (the more on top)
    }).pop();
}

export default function VisaTools() {
    const selected = [];
    // Setup Spell Actions
    const CircleAction = new Paper.Tool();
    const CircleActionButton = document.getElementById("CircleAction");
    CircleActionButton.addEventListener("click", (evt) => {
        console.log("Casting Circle Spell Action...");
        cleanSelected()
        CircleAction.activate();
    })
    CircleAction.on("mouseup", evt => {
        const circle = this.createCircle([evt.point.x, evt.point.y]);

        this.world.pantheon["Communi"].act((god) => {
            god.communeIdea("circle", {
                position: {
                    x: circle.position.x,
                    y: circle.position.y,
                },
                ...circle.data
            })
        })

        circle.remove();
    })
    const LineAction = new Paper.Tool();
    const LineActionButton = document.getElementById("LineAction");
    LineActionButton.addEventListener("click", evt => {
        console.log("Casting Line Spell Action...");
        cleanSelected()
        LineAction.activate();
    })
    LineAction.on("mouseup", evt => {
        const item = hitTestItem(evt)

        if (!!item && selected.length < 2 && (item.data.type === "outline" || item.data.type === "circle") && !item.data.selected) {
            item.strokeWidth = 5
            item.data.selected = true;
            selected.push(item)
        }

        if (selected.length === 2) {
            const line = this.createLineFromCircles(selected[0], selected[1])
            this.world.pantheon["Communi"].act((god) => {
                god.communeIdea("line", {
                    positions: {
                        start: [line.firstSegment.point.x, line.firstSegment.point.y],
                        end: [line.lastSegment.point.x, line.lastSegment.point.y]
                    },
                    ...line.data
                })
            })

            line.remove()
            cleanSelected()
        }
    })
    const OutlineAction = new Paper.Tool();
    const OutlineActionButton = document.getElementById("OutlineAction");
    OutlineActionButton.addEventListener("click", evt => {
        console.log("Casting Outline Spell Action...");
        cleanSelected()
        OutlineAction.activate();
    })
    OutlineAction.on("mouseup", (evt) => {
        const item = evt.item || hitTestItem(evt);

        if (!!item && !item.data.selected && (item.data.type === "circle" || item.data.type === "line" || item.data.type === "outline")) {
            selected.push(item);
            item.data.selected = true;

            const outline = this.createOutline(item);

            this.world.pantheon["Communi"].act((god) => {
                god.communeIdea("outline", {
                    position: outline.position,
                    ...outline.data
                })
            })

            outline.remove();
        }
        cleanSelected()
    })

    const LabelAction = new Paper.Tool();
    const LabelActionButton = document.getElementById("LabelAction");
    LabelActionButton.addEventListener("click", evt => {
        console.log("Casting Label Spell Action...");
        cleanSelected()
        LabelAction.activate();
    })
    LabelAction.on("mouseup", (evt) => {
        const item = evt.item || hitTestItem(evt);

        if (!!item && !item.data.selected && !item.data.label && (item.data.type === "circle" || item.data.type === "line" || item.data.type === "outline")) {
            selected.push(item)
            item.data.selected = true;

            const text = prompt("Speak your words");
            if (!text) {
                return;
            }
            item.data.label = text;

            this.world.pantheon["Communi"].act((god) => {
                god.communeIdea("label", {
                    path: item.exportJSON(),
                    ...item.data,
                    scale: item.data.scale,
                    type: "label",
                })
            })

        }
        cleanSelected()
    })

    function cleanSelected() {
        while (selected.length > 0) {
            const item = selected[selected.length - 1]
            item.strokeWidth = 1;
            item.data.selected = false;
            selected.pop();
        }
    }

    // Clear the default tool used
    Paper.tool = undefined;
}