import { Scene, PerspectiveCamera, WebGLRenderer, Color } from "three";
import { Creatio, Lumina, Movementur } from "./God";

export default class World {
    constructor(options) {

        Object.assign(this, {
            animating: false,
            timeRate: 0.001
        }, options)

        this.objects = [];

        this.three = {};
        this.camera = this.three.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;

        this.scene = this.three.scene = new Scene();
        this.scene.background = new Color(this.colors.activeBackgroundColor);

        this.renderer = this.three.renderer = new WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        window.addEventListener("resize", (e) => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        })

        this.creationGod = new Creatio(this, {
            defaultMaterialColor: this.colors.accent
        });
        this.lightGod = new Lumina(this, {})
        this.motionGod = new Movementur(this, {})

        this.time = 0;

        document.body.appendChild(this.renderer.domElement);
    }

    setScene(motionScene, worldScene) {
        this.currentMotionScene = this.theatre.sheets[motionScene];
        this.scene = this.three.scene = worldScene;
    }
}
