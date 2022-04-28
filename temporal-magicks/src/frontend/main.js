import { World } from "@18nguyenl/artificer";
import { Communi, Visio } from "./gods";
import { Gestura, VisaTools } from "./divine_objects";

window.addEventListener("load", () => {
    const MainWorld = new World();
    MainWorld.assignGod(new Visio());
    MainWorld.assignGod(new Communi());

    MainWorld.pantheon["Visio"].god.useTool(Gestura);
    MainWorld.pantheon["Visio"].god.useTool(VisaTools);
})
