import { God } from "@18nguyenl/artificer";
import { hitTestItem } from "../divine_objects/VisaTools";

import Paper from "paper";

export default class Visio extends God {
    constructor() {
        super("Visio");
        this.canvas = document.getElementById('canvas');
        Paper.setup(this.canvas);
    }

    createOutlineFromPoint(point) {
        const item = hitTestItem({ point: point });

        return this.createOutline(item);
    }

    createOutline(item) {
        const outline = item.clone()
        outline.data.label = undefined
        outline.data.selected = false;

        outline.data.scale = item.data.scale + 0.30;
        if (outline.data.type === "circle" || outline.data.type === "outline") {
            outline.scale(outline.data.scale);
        }
        outline.data.type = "outline"

        return outline;
    }

    createCircle(point) {
        const newCircle = new Paper.Path.Circle(new Paper.Point(point), 32);
        newCircle.strokeColor = (0, 0, 0);
        newCircle.closed = true;
        newCircle.data.type = "circle"
        newCircle.data.selected = false;
        newCircle.data.scale = 1.15;

        return newCircle;
    }

    createLine(start, end) {
        const line = Paper.Path.Line(new Paper.Point(start), new Paper.Point(end));
        line.strokeColor = (0, 0, 0);
        return line;
    }

    createLineFromCircles(startCircle, endCircle) {
        const line = Paper.Path.Line(startCircle.position, endCircle.position);

        const intersect1 = line.getIntersections(startCircle);
        const intersect2 = line.getIntersections(endCircle);

        const finalLine = Paper.Path.Line(intersect1[0].point.clone(), intersect2[0].point.clone())
        finalLine.strokeColor = (0, 0, 0);
        line.remove()

        finalLine.data.scale = 1.15;
        finalLine.data.type = "line"

        return finalLine;
    }

    createPointText(str, style) {
        const text = new Paper.PointText();
        text.content = str;
        if (style) {
            if (style.font) text.font = style.font;
            if (style.fontFamily) text.fontFamily = style.fontFamily;
            if (style.fontSize) text.fontSize = style.fontSize;
            if (style.fontWieght) text.fontWeight = style.fontWeight;
        }
        return text;
    }

    createPathFromJSON(path) {
        const tmpPath = Paper.Path.importJSON(path);
        tmpPath.strokeColor = (0, 0, 0);
        return tmpPath;
    }

    createAlignedText(str, path, style, scale) {
        const pathClone = path.clone()
        if (path.data.type !== "line")
            pathClone.scale(scale);

        if (str && str.length > 0 && path) {
            // create PointText object for each glyph
            const glyphTexts = [];
            for (let i = 0; i < str.length; i++) {
                glyphTexts[i] = this.createPointText(str.substring(i, i + 1), style);
                glyphTexts[i].justification = "center";
            }

            // for each glyph find center xOffset
            const xOffsets = [0];
            for (let i = 1; i < str.length; i++) {
                const pairText = this.createPointText(str.substring(i - 1, i + 1), style);
                pairText.remove();
                xOffsets[i] = xOffsets[i - 1] + pairText.bounds.width - glyphTexts[i - 1].bounds.width / 2 - glyphTexts[i].bounds.width / 2;
            }
            // set point for each glyph and rotate glyph aorund the point
            for (let i = 0; i < str.length; i++) {
                let centerOffs = xOffsets[i];
                if (pathClone.length < centerOffs) {
                    if (pathClone.closed) {
                        centerOffs = centerOffs % pathClone.length;
                    } else {
                        centerOffs = undefined;
                    }
                }
                if (centerOffs === undefined) {
                    glyphTexts[i].remove();
                } else {
                    const pathPoint = pathClone.getPointAt(centerOffs);
                    glyphTexts[i].point = pathPoint;
                    const tan = pathClone.getTangentAt(centerOffs);
                    glyphTexts[i].rotate(tan.angle, pathPoint);

                    pathClone.remove()
                    path.data.label = str;
                }
            }
        }
    }
}