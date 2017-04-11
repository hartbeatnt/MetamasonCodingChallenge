const THREE = require('three')

// set up scene, camera, renderer
let winW = window.innerWidth;
let winH = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 30, winW/winH, 1, 1000 );
const renderer = new THREE.WebGLRenderer({antialias:true});

camera.position.z = 4;
renderer.setClearColor("#ffffff");
renderer.setSize( winW, winH );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.PlaneBufferGeometry( 5, 5 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ffff, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
plane.position.set(0, 0, -10)
scene.add( plane );

renderer.render(scene, camera);