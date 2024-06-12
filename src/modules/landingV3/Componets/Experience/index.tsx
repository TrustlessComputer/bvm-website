import { useEffect } from 'react';
import * as THREE from 'three';

export default function Experience() {

  useEffect(() => {
    var materialShaders = [];
    var materialInst = [];
    var darkMaterial = createMaterial("basic", 0x000000, 0, false);
    var materials = {};
    var params = {
      exposure: 1,
      bloomStrength: 2.5,
      bloomThreshold: 0,
      bloomRadius: 0
    };
    var ENTIRE_SCENE = 0,
      BLOOM_SCENE = 1;
    var bloomLayer = new THREE.Layers();
    bloomLayer.set(BLOOM_SCENE);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 4, 10);
    var renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = Math.pow(params.exposure, 4.0);
    renderer.setClearColor(0x000000);
    document.body.appendChild(renderer.domElement);

    var renderScene = new THREE.RenderPass(scene, camera);
    var bloomPass = new THREE.UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;
    var bloomComposer = new THREE.EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.setSize(
      window.innerWidth * window.devicePixelRatio,
      window.innerHeight * window.devicePixelRatio
    );
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);
    var finalPass = new THREE.ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: bloomComposer.renderTarget2.texture }
        },
        vertexShader: document.getElementById("vertexshader").textContent,
        fragmentShader: document.getElementById("fragmentshader").textContent,
        defines: {}
      }),
      "baseTexture"
    );
    finalPass.needsSwap = true;
    var finalComposer = new THREE.EffectComposer(renderer);
    finalComposer.setSize(
      window.innerWidth * window.devicePixelRatio,
      window.innerHeight * window.devicePixelRatio
    );
    finalComposer.addPass(renderScene);
    finalComposer.addPass(finalPass);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 10, 1);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    let boxPos = new THREE.PlaneBufferGeometry(120, 120, 50, 50);
    boxPos.rotateX(-Math.PI * 0.5);
    let boxGeom = new THREE.BoxBufferGeometry(2, 2, 2,2);

    let instGeom = new THREE.InstancedBufferGeometry();
    instGeom.attributes.position = boxGeom.attributes.position;
    instGeom.attributes.normal = boxGeom.attributes.normal;
    instGeom.index = boxGeom.index;
    instGeom.addAttribute(
      "instPosition",
      new THREE.InstancedBufferAttribute(boxPos.attributes.position.array, 3)
    );
    instGeom.addAttribute(
      "instUv",
      new THREE.InstancedBufferAttribute(boxPos.attributes.uv.array, 2)
    );

    let inst1 = new THREE.Mesh(
      instGeom,
      createMaterial("standard", 'red', 0, false)
    );
    scene.add(inst1);

    let inst2 = new THREE.Mesh(
      instGeom,
      createMaterial("basic", 'red', 1, true)
    );
    inst2.layers.enable(BLOOM_SCENE);
    scene.add(inst2);

    var time = 0;
    console.log(materialShaders);

    renderer.setAnimationLoop(render);

    window.onresize = function() {
      var width = window.innerWidth;
      var height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      bloomComposer.setSize(
        width * window.devicePixelRatio,
        height * window.devicePixelRatio
      );
      finalComposer.setSize(
        width * window.devicePixelRatio,
        height * window.devicePixelRatio
      );
    };

    function render() {
      time = performance.now() / 1000;
      materialShaders.forEach((m, idx) => {
        m.shader.uniforms.time.value = time * 0.5;
        m.shader.uniforms.isTip.value = m.isTip;
        if (m.changeColor) materialInst[idx].color.setHSL(time * 0.1 % 1.0, 0.625, 0.375);
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
    function darkenNonBloomed(obj) { // non-bloomed stuff must be black, including scene background
      if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
        materials[obj.uuid] = obj.material;
        obj.material = darkMaterial;
      }
      renderer.setClearColor('red');
    }
    function restoreMaterial(obj) {
      if (materials[obj.uuid]) {
        obj.material = materials[obj.uuid];
        delete materials[obj.uuid];
      }
      renderer.setClearColor('red');
    }

    function createMaterial(type, color, isTip, changeColor) {
      let mat =
        type == "basic"
          ? new THREE.MeshBasicMaterial()
          : new THREE.MeshStandardMaterial();

      mat.color.set(color);
      if (type == "standard") {
        mat.metalness = 0.25;
        mat.roughness = 0.75;
      }

      mat.onBeforeCompile = function(shader) {
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
    `
        );
        materialShaders.push({
          id: "mat" + materialShaders.length,
          shader: shader,
          isTip: isTip,
          changeColor: changeColor
        });
        materialInst.push(mat);
      };

      return mat;
    }

  }, []);

  return <div>

  </div>
}
