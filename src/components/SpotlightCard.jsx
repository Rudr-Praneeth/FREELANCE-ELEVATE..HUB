import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { useEffect, useRef } from "react";

function lerp(a, b, t) {
  return a + (b - a) * t;
}

class Media {
  constructor({ geometry, gl, image, index, length, scene, viewport, bend, borderRadius }) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.scene = scene;
    this.viewport = viewport;
    this.bend = bend;
    this.borderRadius = borderRadius;
    this.create();
  }

  create() {
    const texture = new Texture(this.gl);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
    };

    this.program = new Program(this.gl, {
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBox(vec2 p, vec2 b, float r){
          vec2 d = abs(p) - b;
          return length(max(d,0.0)) + min(max(d.x,d.y),0.0) - r;
        }

        void main(){
          float d = roundedBox(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float alpha = 1.0 - smoothstep(0.0, 0.01, d);
          vec4 color = texture2D(tMap, vUv);
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    });

    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });

    this.mesh.setParent(this.scene);
  }

  update(scroll, direction) {
    this.mesh.position.x = this.x - scroll.current;

    const x = this.mesh.position.x;
    const H = this.viewport.width / 2;

    const R = (H * H + this.bend * this.bend) / (2 * this.bend);
    const arc = R - Math.sqrt(R * R - Math.min(Math.abs(x), H) ** 2);

    this.mesh.position.y = -arc;
    this.mesh.rotation.z = -Math.sign(x) * Math.asin(Math.min(Math.abs(x), H) / R);
  }

  onResize(viewport) {
    this.viewport = viewport;
    this.mesh.scale.set(2.6, 3.6, 1);
    this.width = this.mesh.scale.x + 0.6;
    this.x = this.width * this.index;
  }
}

class App {
  constructor(container, { items, bend, borderRadius, scrollEase, scrollSpeed }) {
    this.container = container;
    this.scroll = { current: 0, target: 0, last: 0, ease: scrollEase };
    this.scrollSpeed = scrollSpeed;

    this.renderer = new Renderer({ alpha: true, antialias: true });
    this.gl = this.renderer.gl;
    this.container.appendChild(this.gl.canvas);

    this.camera = new Camera(this.gl);
    this.camera.position.z = 10;

    this.scene = new Transform();

    this.geometry = new Plane(this.gl);

    this.items = items.concat(items);

    this.medias = this.items.map((item, i) => {
      return new Media({
        geometry: this.geometry,
        gl: this.gl,
        image: item.image,
        index: i,
        length: this.items.length,
        scene: this.scene,
        viewport: {},
        bend,
        borderRadius
      });
    });

    this.onResize();
    this.update();
    this.addEvents();
  }

  onResize() {
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.camera.perspective({ aspect: this.container.clientWidth / this.container.clientHeight });

    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;

    this.viewport = { width, height };

    this.medias.forEach(m => m.onResize(this.viewport));
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const dir = this.scroll.current > this.scroll.last ? "right" : "left";

    this.medias.forEach(m => m.update(this.scroll, dir));

    this.renderer.render({ scene: this.scene, camera: this.camera });

    this.scroll.last = this.scroll.current;
    requestAnimationFrame(this.update.bind(this));
  }

  addEvents() {
    window.addEventListener("wheel", e => {
      this.scroll.target += e.deltaY * 0.002 * this.scrollSpeed;
    });

    window.addEventListener("resize", this.onResize.bind(this));
  }

  destroy() {
    this.container.removeChild(this.gl.canvas);
  }
}

export default function CircularGallery({
  items,
  bend = 2.2,
  borderRadius = 0.08,
  scrollSpeed = 1.6,
  scrollEase = 0.035
}) {
  const ref = useRef();

  useEffect(() => {
    const app = new App(ref.current, { items, bend, borderRadius, scrollEase, scrollSpeed });
    return () => app.destroy();
  }, [items, bend, borderRadius, scrollSpeed, scrollEase]);

  return <div ref={ref} className="w-full h-full overflow-hidden" />;
}