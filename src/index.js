// import * as THREE from 'test/three.module.js';
      // import Stats from './jsm/libs/stats.module.js';
//       import { OrbitControls } from './jsm/controls/OrbitControls.js';
      var SCREEN_WIDTH = window.innerWidth;
      var SCREEN_HEIGHT = window.innerHeight;
      var container, stats;
      var camera, scene, renderer;
      init();
      animate();
      function init() {
        container = document.createElement( 'div' );
        document.body.appendChild( container );
        // CAMERA
        camera = new THREE.PerspectiveCamera( 40, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
        camera.position.set( 700, 200, - 500 );
        // SCENE
        scene = new THREE.Scene();
        // LIGHTS
        var light = new THREE.DirectionalLight( 0xaabbff, 0.3 );
        light.position.x = 300;
        light.position.y = 250;
        light.position.z = - 500;
        scene.add( light );
        // SKYDOME
        var vertexShader = document.getElementById( 'vertexShader' ).textContent;
        var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
        var uniforms = {
          topColor: { value: new THREE.Color( 0x0077ff ) },
          bottomColor: { value: new THREE.Color( 0xffffff ) },
          offset: { value: 400 },
          exponent: { value: 0.6 }
        };
        uniforms.topColor.value.copy( light.color );
        var skyGeo = new THREE.SphereBufferGeometry( 4000, 32, 15 );
        var skyMat = new THREE.ShaderMaterial( {
          uniforms: uniforms,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          side: THREE.BackSide
        } );
        var sky = new THREE.Mesh( skyGeo, skyMat );
        scene.add( sky );
        // RENDERER
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
        container.appendChild( renderer.domElement );
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        // CONTROLS
        var controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.maxPolarAngle = 0.9 * Math.PI / 2;
        controls.enableZoom = false;

        controls.minDistance = 1;
        controls.maxDistance = 1000;


        // STATS
        // stats = new Stats();
        // container.appendChild( stats.dom );
        // MODEL
        var loader = new THREE.ObjectLoader();
        loader.load( "models/json/lightmap/lightmap.json", function ( object ) {
          scene.add( object );
        }
        );
        //
        window.addEventListener( 'resize', onWindowResize, false );
      }

              // Creating threex.domevents.js code

const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

let cubeClicked = false;
domEvents.addEventListener(loader, 'click', event =>{
  if(!cubeClicked){
    material.wireframe = false;
    cubeClicked = true;
  } else{
    material.wireframe = true;
    cubeClicked = false;
  };
});

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
      }
      //
      function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
        // stats.update();
      }
