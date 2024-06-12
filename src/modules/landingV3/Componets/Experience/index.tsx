import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import s from './styles.module.scss';

import {
  EffectComposer,
  RenderPass,
  UnrealBloomPass,
  ShaderPass,
} from 'three/examples/jsm/Addons';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { fragment, noise, vertext } from './shader';

export default function Experience() {
  const materialShaders = useRef<
    {
      id: string;
      shader: THREE.WebGLProgramParametersWithUniforms;
      isTip: number;
      changeColor: boolean;
    }[]
  >([]);
  const materialInst = useRef<
    (THREE.MeshBasicMaterial | THREE.MeshStandardMaterial)[]
  >([]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    var darkMaterial = createMaterial('basic', '#000000', 0, false);
    var materials: Record<string, THREE.Material | THREE.Material[]> = {};
    var params = {
      exposure: 1,
      bloomStrength: 2.5,
      bloomThreshold: 0,
      bloomRadius: 0,
    };
    var ENTIRE_SCENE = 0,
      BLOOM_SCENE = 0;
    var bloomLayer = new THREE.Layers();
    bloomLayer.set(BLOOM_SCENE);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000,
    );
    camera.position.set(0, 4, 10);
    var renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = Math.pow(params.exposure, 4.0);
    renderer.setClearColor(0x000000);
    // document.body.appendChild(renderer.domElement);
    wrapperRef.current?.appendChild(renderer.domElement);

    var renderScene = new RenderPass(scene, camera);

    var bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85,
    );
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;

    var bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.setSize(
      window.innerWidth * window.devicePixelRatio,
      window.innerHeight * window.devicePixelRatio,
    );
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);
    var finalPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: bloomComposer.renderTarget2.texture },
        },
        vertexShader: vertext,
        fragmentShader: fragment,
        defines: {},
      }),
      'baseTexture',
    );
    finalPass.needsSwap = true;
    var finalComposer = new EffectComposer(renderer);
    finalComposer.setSize(
      window.innerWidth * window.devicePixelRatio,
      window.innerHeight * window.devicePixelRatio,
    );
    finalComposer.addPass(renderScene);
    finalComposer.addPass(finalPass);

    var controls = new OrbitControls(camera, renderer.domElement);

    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 10, 1);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    let boxPos = new THREE.PlaneGeometry(120, 120, 50, 50);
    boxPos.rotateX(-Math.PI * 0.5);
    let boxGeom = new THREE.BoxGeometry(2, 2, 2, 2);

    let instGeom = new THREE.InstancedBufferGeometry();
    instGeom.attributes.position = boxGeom.attributes.position;
    instGeom.attributes.normal = boxGeom.attributes.normal;
    instGeom.index = boxGeom.index;
    instGeom.setAttribute(
      'instPosition',
      new THREE.InstancedBufferAttribute(boxPos.attributes.position.array, 3),
    );
    instGeom.setAttribute(
      'instUv',
      new THREE.InstancedBufferAttribute(boxPos.attributes.uv.array, 2),
    );

    let inst1 = new THREE.Mesh(
      instGeom,
      createMaterial('standard', 'red', 0, false),
    );
    scene.add(inst1);

    let inst2 = new THREE.Mesh(
      instGeom,
      createMaterial('basic', 'red', 1, true),
    );
    inst2.layers.enable(BLOOM_SCENE);
    scene.add(inst2);

    var time = 0;

    renderer.setAnimationLoop(render);

    window.onresize = function () {
      var width = window.innerWidth;
      var height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      bloomComposer.setSize(
        width * window.devicePixelRatio,
        height * window.devicePixelRatio,
      );
      finalComposer.setSize(
        width * window.devicePixelRatio,
        height * window.devicePixelRatio,
      );
    };

    function render() {
      time = performance.now() / 1000;
      materialShaders.current.forEach((m, idx) => {
        m.shader.uniforms.time.value = time * 0.5;
        m.shader.uniforms.isTip.value = m.isTip;
        // if (m.changeColor)
        //   materialInst.current[idx].color.setHSL(
        //     (time * 0.1) % 1.0,
        //     0.625,
        //     0.375,
        //   );
      });

      // render scene with bloom
      renderBloom();
      // render the entire scene, then render bloom scene on top
      finalComposer.render();
    }

    function renderBloom() {
      scene.traverse(darkenNonBloomed);
      bloomComposer.render();
      scene.traverse(restoreMaterial);
    }
    function darkenNonBloomed(obj: THREE.Object3D) {
      // non-bloomed stuff must be black, including scene background
      if (obj instanceof THREE.Mesh) {
        materials[obj.uuid] = obj.material;
        obj.material = darkMaterial;
      }

      renderer.setClearColor('red');
    }
    function restoreMaterial(obj: THREE.Object3D) {
      if (obj instanceof THREE.Mesh && materials[obj.uuid]) {
        obj.material = materials[obj.uuid];
        delete materials[obj.uuid];
      }
      renderer.setClearColor('red');
    }

    function createMaterial(
      type: 'basic' | 'standard',
      color: string,
      isTip: number,
      changeColor: boolean,
    ) {
      let mat =
        type == 'basic'
          ? new THREE.MeshBasicMaterial()
          : new THREE.MeshStandardMaterial();

      mat.color.set(color);
      if (type == 'standard') {
        (mat as THREE.MeshStandardMaterial).metalness = 0.25;
        (mat as THREE.MeshStandardMaterial).roughness = 0.75;
      }

      mat.onBeforeCompile = function (shader) {
        shader.uniforms.time = { value: 1.0 };
        shader.uniforms.isTip = { value: 0.0 };

        shader.vertexShader =
          `uniform float time;
     uniform float isTip;
     attribute vec3 instPosition;
     attribute vec2 instUv;
    ` +
          noise + // see the script in the html-section
          shader.vertexShader;
        shader.vertexShader = shader.vertexShader.replace(
          `#include <begin_vertex>`,
          `
      vec3 transformed = vec3( position );

      vec3 ip = instPosition;
      vec2 iUv = instUv;
      iUv.y += time * 0.125;
      iUv *= vec2(3.14);
      float wave = snoise( vec3( iUv, 0.0 ) );

      ip.y = wave * 3.5;
      float lim = 2.0;
      bool tip = isTip < 0.5 ? ip.y > lim : ip.y <= lim;
     transformed *= tip ? 0.0 : 1.0;

      transformed = transformed + ip;
    `,
        );
        materialShaders.current.push({
          id: 'mat' + materialShaders.current.length,
          shader: shader,
          isTip: isTip,
          changeColor: false, //changeColor,
        });
        materialInst.current.push(mat);
      };

      return mat;
    }
  }, []);

  return <div className={s.wrapper} ref={wrapperRef}></div>;
}
