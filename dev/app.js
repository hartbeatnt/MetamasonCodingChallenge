const THREE = require('three')
import { circleLayout } from './circleLayout'

// initialize scene, camera, renderer
let winW = window.innerWidth;
let winH = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, winW/winH, 1, 1000 );
const renderer = new THREE.WebGLRenderer({antialias:true});
camera.position.z = 4;
renderer.setClearColor("#ffffff");
renderer.setSize( winW, winH );
document.body.appendChild( renderer.domElement );

// set up listeners for keyboard state
const keyboard = {
  ArrowLeft: false,
  ArrowRight: false,
}

window.addEventListener('keydown', e=>{
  if (e.key in keyboard) keyboard[e.key] = true;
})
window.addEventListener('keyup', e=>{
  if (e.key in keyboard) keyboard[e.key] = false;
})

// create layout for the picture frames
const positions = circleLayout( 20, 12, camera.position );
positions.forEach(position=>{
  let { x, y, z } = position;
  let geometry = new THREE.PlaneBufferGeometry( 10, 10 );
  let material = new THREE.MeshBasicMaterial( {color: 0x00ffff} );
  let plane = new THREE.Mesh( geometry, material );
  plane.position.set( x, y, z );
  plane.lookAt( camera.position );
  scene.add( plane );
})

// set up animation loop
const animate = time => {
  requestAnimationFrame( animate );

  // adjust for variance in computer speed
  deltaTime = oldTime - time;
  oldTime = time;

  // rotate camera based on keyboard state
  keyboard.ArrowLeft && rotateCamera(-deltaTime);
  keyboard.ArrowRight && rotateCamera(deltaTime);

  // render scene
  renderer.render( scene, camera );
}

// logic for smooth camera rotation
const rotateCamera = deltaTime => {
  console.log(deltaTime)
  let cameraSpeed = .25;
  camera.rotateY(cameraSpeed / deltaTime)
}

// initialize animation
let oldTime = performance.now();
let deltaTime = 0;
animate(oldTime);