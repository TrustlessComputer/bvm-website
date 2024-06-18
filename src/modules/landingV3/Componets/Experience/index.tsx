import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import s from './styles.module.scss';

const vertexrt = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }`;
const fragment = `varying vec2 vUv;
vec4 getTexture( sampler2D tex ) { return  texture2D( tex , vUv ) ; }
uniform sampler2D baseTexture; uniform sampler2D bloomTexture;  
void main() {
 gl_FragColor = ( getTexture( baseTexture ) + vec4( 0.025 ) * getTexture(
  bloomTexture ) ); }`;
// Assuming noise is defined somewhere
const noise = `
//
// Description : Array and textureless GLSL 2D/3D/4D simplex 
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
// 

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
  { 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}
`; // Replace with actual noise shader code

const ThreeJSComponent: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const materialShaders = useRef<any[]>([]);
  const materialInst = useRef<any[]>([]);
  const materials = useRef<any>({});
  const params = useRef({
    exposure: 1,
    bloomStrength: 2.5,
    bloomThreshold: 0,
    bloomRadius: 0,
  });
  const mouse = useRef({ x: 0, y: 0 });
  const refCamPo = useRef({ x: 16, y: 10, z: 16 });

  useEffect(() => {
    if (!mountRef.current) return;

    const camTp = new THREE.Vector3(0, 0, 0);
    const COLOR = new THREE.Color('#ff8800');
    const COLOR_DARKER = new THREE.Color('#e87500');
    const COLOR_SKY = new THREE.Color('#782402');
    const createMaterial = (
      type: string,
      color: any,
      isTip: number,
      changeColor: boolean,
    ) => {
      const mat =
        type === 'basic'
          ? new THREE.MeshBasicMaterial()
          : new THREE.MeshStandardMaterial();

      // mat.transparent = true;
      // mat.opacity = .5;
      mat.color.set(color);
      if (type === 'standard') {
        (mat as any).metalness = 0.25;
        (mat as any).roughness = 0.75;
      }

      mat.onBeforeCompile = (shader) => {
        shader.uniforms.time = { value: 1.0 };
        shader.uniforms.isTip = { value: 0.0 };

        shader.vertexShader =
          `uniform float time;
          uniform float isTip;
          attribute vec3 instPosition;
          attribute vec2 instUv;
          ` +
          noise +
          shader.vertexShader;
        shader.vertexShader = shader.vertexShader.replace(
          `#include <begin_vertex>`,
          `
          
          vec3 transformed = vec3(position);

          vec3 ip = instPosition;
          vec2 iUv = instUv;
          iUv.y += time * 0.125;
          iUv *= vec2(3.14);
          float wave = snoise(vec3(iUv, 0.0));

          ip.y = wave * 3.5;
          float lim = 5.0;
          bool tip = isTip < 0.5 ? ip.y > lim : ip.y <= lim;
          transformed *= tip ? 0.0 : 1.0;

          transformed = transformed + ip;
          `,
        );
        materialShaders.current.push({
          id: 'mat' + materialShaders.current.length,
          shader: shader,
          isTip: isTip,
          // changeColor: changeColor
        });
        materialInst.current.push(mat);
      };

      return mat;
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000,
    );
    camera.position.set(
      refCamPo.current.x,
      refCamPo.current.y,
      refCamPo.current.z,
    );
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const ratio = Math.min(window.devicePixelRatio, 1.5);

    renderer.setPixelRatio(ratio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = Math.pow(params.current.exposure, 4.0);
    renderer.setClearColor(0x000000);
    mountRef.current.appendChild(renderer.domElement);

    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85,
    );
    bloomPass.threshold = params.current.bloomThreshold;
    bloomPass.strength = params.current.bloomStrength;
    bloomPass.radius = params.current.bloomRadius;
    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;

    bloomComposer.setSize(
      window.innerWidth * ratio,
      window.innerHeight * ratio,
    );
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);

    const finalPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: bloomComposer.renderTarget2.texture },
        },
        vertexShader: vertexrt,
        fragmentShader: fragment,
        defines: {},
      }),
      'baseTexture',
    );
    finalPass.needsSwap = true;
    const finalComposer = new EffectComposer(renderer);
    finalComposer.setSize(
      window.innerWidth * ratio,
      window.innerHeight * ratio
    );
    finalComposer.addPass(renderScene);
    finalComposer.addPass(finalPass);

    // const controls = new OrbitControls(camera, document.body);
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 10, 1);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const bloomLayer = new THREE.Layers();
    const ENTIRE_SCENE = 0,
      BLOOM_SCENE = 1;
    bloomLayer.set(BLOOM_SCENE);

    const boxPos = new THREE.PlaneGeometry(120, 120, 30, 30);
    boxPos.rotateX(-Math.PI * 0.5);
    const boxGeom = null;

    const instGeom = new THREE.InstancedBufferGeometry();
    const darkMaterial = createMaterial('basic', COLOR_DARKER, 0, false);
    const loader = new GLTFLoader();
    loader.load('/lego.glb', (gltf) => {
      const model = gltf.scene;

      const ob: any = model.getObjectByName('group1822638002');

      const boxGeom = ob.geometry;
      boxGeom.scale(5, 5, 5);
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

      const inst1 = new THREE.Mesh(
        instGeom,
        createMaterial('standard', COLOR, 0, false),
      );
      scene.add(inst1);

      const inst2 = new THREE.Mesh(
        instGeom,
        createMaterial('basic', COLOR, 1, true),
      );
      inst2.layers.enable(BLOOM_SCENE);
      scene.add(inst2);
    });

    let time = 0;

    const render = () => {
      time = performance.now() / 1000;

      updateCameraPosition(camera, 10);

      materialShaders.current.forEach((m, idx) => {
        m.shader.uniforms.time.value = time * 0.5;
        m.shader.uniforms.isTip.value = m.isTip;
        if (m.changeColor)
          materialInst.current[idx].color.setHSL(
            (time * 0.1) % 1.0,
            0.625,
            0.375,
          );
      });

      renderBloom();
      finalComposer.render();
    };

    const renderBloom = () => {
      scene.traverse(darkenNonBloomed);
      bloomComposer.render();
      scene.traverse(restoreMaterial);
    };

    const darkenNonBloomed = (obj: THREE.Object3D) => {
      if ((obj as THREE.Mesh).isMesh && bloomLayer.test(obj.layers) === false) {
        materials.current[obj.uuid] = (obj as THREE.Mesh).material;
        (obj as THREE.Mesh).material = darkMaterial;
      }
      renderer.setClearColor(COLOR_SKY);
    };

    const restoreMaterial = (obj: THREE.Object3D) => {
      if (materials.current[obj.uuid]) {
        (obj as THREE.Mesh).material = materials.current[obj.uuid];
        delete materials.current[obj.uuid];
      }
      renderer.setClearColor(COLOR_SKY);
    };

    renderer.setAnimationLoop(render);

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      const ratio = Math.min(window.devicePixelRatio, 1.5)
      bloomComposer.setSize(
        width * ratio,
        height * ratio,
      );
      finalComposer.setSize(
        width * ratio,
        height * ratio,
      );
    };

    const updateCameraPosition = (
      camera: THREE.PerspectiveCamera,
      radius: number,
    ) => {
      const angleX = mouse.current.x * Math.PI * 0.85;
      const angleY = mouse.current.y * (Math.PI / 2) * 0.85;

      const x = refCamPo.current.x + Math.cos(angleY) * Math.sin(angleX);
      const y = refCamPo.current.y + Math.sin(angleY);
      const z = refCamPo.current.z + Math.cos(angleY) * Math.cos(angleX);

      camera.position.lerp(new THREE.Vector3(x, y, z), 0.1);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
    };

    const onMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={s.wrapper}></div>;
};

export default ThreeJSComponent;
