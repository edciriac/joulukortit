import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
let scene, camera, renderer, model;

function init() {
    const container = document.getElementById('container');

    // Scene
    scene = new THREE.Scene();
     scene.background = new THREE.Color(0xf0f0f0); // Set background color to light grey

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    // Load Model
    const loader = new GLTFLoader();
    loader.load('zen_stone.glb', function (gltf) {
        model = gltf.scene;
        scene.add(model);
    });

    // Resize
    window.addEventListener('resize', onWindowResize, false);

    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    if (model) {
        model.rotation.y += 0.01; // Rotate the model
    }

    renderer.render(scene, camera);
}

init();
