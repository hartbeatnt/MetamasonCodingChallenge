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
window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

// initialize texture loader
const loader = new THREE.TextureLoader();
loader.crossOrigin = '';

// create layout for the picture frames
const positions = circleLayout( 20, 12, camera.position );

// create a plane at each position
positions.forEach(position=>{
  let { x, y, z } = position;
  let geometry = new THREE.PlaneBufferGeometry( 10, 10 );
  // use a flat grey material until texture is loaded
  let material = new THREE.MeshBasicMaterial({ color: 0xD3D3D3})
  let plane = new THREE.Mesh( geometry, material );
  plane.position.set( x, y, z );
  plane.lookAt( camera.position );
  scene.add( plane );
  // texture loading is async, must be attached to mesh in callback
  let rand = Math.floor(Math.random()*1000);
  loader.load(`https://unsplash.it/256?image=${rand}`, texture=>{
    plane.material = new THREE.MeshBasicMaterial({ map: texture });
  }, null, error => {
    // some random urls at unsplash appear to be broken. If we find
    // a broken url, load one that we know works instead.
    console.warn(`no image found at 
    https://unsplash.it/256?image=${rand}.
    Trying again with new url.`)
    loader.load('https://unsplash.it/256?image=426', texture=>{
      plane.material = new THREE.MeshBasicMaterial({ map: texture });
    })
  })
})

// set up animation loop
const animate = time => {
  requestAnimationFrame( animate );

  // adjust for variance in computer speed
  deltaTime = oldTime - time;
  oldTime = time;

  // rotate camera based on keyboard state
  keyboard.ArrowLeft && camera.rotateY(-0.25 / deltaTime);
  keyboard.ArrowRight && camera.rotateY(0.25 / deltaTime);

  // render scene
  renderer.render( scene, camera );
}

// initialize animation
let oldTime = performance.now();
let deltaTime = 0;
animate(oldTime);