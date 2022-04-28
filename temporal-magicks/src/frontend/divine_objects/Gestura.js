import Paper from "paper";
import AlloyFinger from "alloyfinger";

// Gesture Interaction Controls
export default function Gestura() {
    let zoom = 1.0;
    let rotation = 0.0;

    const gestures = new AlloyFinger(canvas, {
        rotate: function (evt) {
            let delta = evt.angle + rotation;
            Paper.view.rotation += delta;
            rotation = evt.angle;
        },
        pinch: function (evt) {
            let delta = evt.zoom - zoom;
            Paper.view.zoom += delta;
            zoom = evt.zoom;
        },
        pressMove: (evt) => {
            let evtDelta = new Paper.Point(evt.deltaX, evt.deltaY);
            evtDelta = evtDelta.rotate(-Paper.view.rotation);
            Paper.view.center = Paper.view.center.subtract(evtDelta)
        }
    })

    return gestures;
}