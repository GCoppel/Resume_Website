import './styles.css'
import * as THREE from 'three'
import { BackSide, BooleanKeyframeTrack, DirectionalLightShadow, FrontSide, Loader, NoToneMapping, RGB_S3TC_DXT1_Format, ShapeGeometry, TetrahedronBufferGeometry } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap'

let tl = gsap.timeline();

let loaded = false;

const loadingManager = new THREE.LoadingManager();

loadingManager.onProgress = function(url, loaded, total) {
    progressBar.value = (loaded / total) * 180;
}

loadingManager.onLoad = function() {
    tl.to(progressContainer, {opacity: 0, duration: .5})
    tl.to(city, {opacity: 0, duration: .5})
    tl.to(typing, {display: "block", delay: .25})
    loaded = true;
    tick();
}

loadingManager.onError = function(url) {
    alert("Problem Loading: $url");
}

const gltfLoader = new GLTFLoader(loadingManager)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const main = new THREE.BoxGeometry(1,12,1,1,12)

var mesh = new Array(10);

gltfLoader.load('holo.gltf', (gltf) => {
    gltf.scene.position.z = -10
    gltf.scene.position.x = -13
    gltf.scene.position.y = -8
    scene.add(gltf.scene)
})

gltfLoader.load('js.gltf', (gltf) => {
    gltf.scene.position.y = -.8
    mesh [0] = gltf.scene
    scene.add(mesh [0])
})

gltfLoader.load('python.gltf', (gltf) => {
    gltf.scene.position.y = 1.2
    mesh [1] = gltf.scene
    scene.add(mesh [1])
})

gltfLoader.load('java.gltf', (gltf) => {
    gltf.scene.position.y = 3.15
    mesh [2] = gltf.scene
    scene.add(mesh[2])
})

gltfLoader.load('cpp.gltf', (gltf) => {
    gltf.scene.position.y = 4.25
    mesh [3] = gltf.scene
    scene.add(gltf.scene)
})

gltfLoader.load('css.gltf', (gltf) => {
    gltf.scene.position.y = 6.2
    mesh [4] = gltf.scene
    scene.add(gltf.scene)
})

gltfLoader.load('blender.gltf', (gltf) => {
    gltf.scene.position.y = 5.2
    mesh [5] = gltf.scene
    scene.add(gltf.scene)
})

gltfLoader.load('html.gltf', (gltf) => {
    gltf.scene.position.y = 7.25
    mesh [6] = gltf.scene
    scene.add(gltf.scene)
})

gltfLoader.load('git.gltf', (gltf) => {
    gltf.scene.position.y = 8.2
    mesh [7] = gltf.scene
    scene.add(gltf.scene)
})

gltfLoader.load('firebase.gltf', (gltf) => {
    gltf.scene.position.y = 9.2
    mesh [8] = gltf.scene
    scene.add(mesh [8])
})

gltfLoader.load('three.gltf', (gltf) => {
    gltf.scene.position.y = .2
    mesh [9] = gltf.scene
    scene.add(mesh [9])
})

gltfLoader.load('pytorch.gltf', (gltf) => {
    gltf.scene.position.y = 2.15
    mesh [10] = gltf.scene
    scene.add(mesh [10])
})

// Materials

const material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    wireframe: true
})

const loader = new THREE.TextureLoader()
 
// Mesh
const tower = new THREE.Mesh(main,material)
scene.add(tower)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Mouse

window.addEventListener("wheel", onMouseWheel)

let y = 0
let position = 0

function onMouseWheel(event) {
    y = event.deltaY * 0.0007
}

document.addEventListener('mousemove', onMouseMove)

let mouseX = 0
let mouseY = 0

function onMouseMove(event) {
    mouseY = event.clientY
    mouseX = event.clientX
}

/**
 * Animate
 */

let contactDisplay = false;

const tick = () =>
{

    if (loaded){

        // Update objects
        tower.rotation.y = mouseX * 0.0001 -0.08
        tower.position.y = -scrollY * .001 + 5

        if (mesh[0] && mesh[8]){
            mesh [0].rotation.y = mouseX * 0.0004 -0.08
            mesh [1].rotation.y = mouseX * 0.0004 -0.08
            mesh [2].rotation.y = mouseX * 0.0004 -0.08
            mesh [3].rotation.y = mouseX * 0.0004 -0.08
            mesh [4].rotation.y = mouseX * 0.0004 -0.08
            mesh [5].rotation.y = mouseX * 0.0004 -0.08
            mesh [6].rotation.y = mouseX * 0.0004 -0.08
            mesh [7].rotation.y = mouseX * 0.0004 -0.08
            mesh [8].rotation.y = mouseX * 0.0004 -0.08
            mesh [9].rotation.y = mouseX * 0.0004 -0.08
            mesh [10].rotation.y = mouseX * 0.0004 -0.08
        }

        camera.rotation.x = -mouseY * 0.00001 + .01

        position += y
        if (position < 0){
            if (position > -14){
                y *= .9
                camera.position.y = -position * 0.8 //Adjust scroll speed
            }
            else {
                position -= y
            }
        }
        else {
            position -= y
        }

        //Page 1:
        if (position > -4 && position < -2){
            Sec1.style.display = "block"
            Sec1.style.opacity = position + 4;
            tl.to(tower.position, {x: -.5, duration: 1})
            gsap.to(mesh[0].position, {x: -.5, duration: 1.5})
            gsap.to(mesh[1].position, {x: -.5, duration: 1.5})
            gsap.to(mesh[2].position, {x: -.5, duration: 1.5})
            gsap.to(mesh[3].position, {x: -.5, duration: 1.5})
            gsap.to(mesh[4].position, {x: -.5, duration: 1.5})
            gsap.to(mesh[5].position, {x: -.5, duration: 1.5})
            gsap.to(mesh[6].position, {x: -.5, duration: 1.5})
            gsap.to(mesh[7].position, {x: -.5, duration: 1.5})
            gsap.to(mesh[8].position, {x: -.5, duration: 1.5})
            gsap.to(mesh[9].position, {x: -.5, duration: 1.5})
            gsap.to(mesh[10].position, {x: -.5, duration: 1.5})
        }
        else {
            Sec1.style.display = "none"
        }

        //Page 2:
        if (position > -7 && position < -4){
            Sec2.style.display = "block"
            Sec2.style.opacity = position + 7;
        }
        else {
            Sec2.style.display = "none"
        }

        //Page 3:
        if (position > -9.5 && position < -7){
            Sec3.style.display = "block"
            Sec3.style.opacity = position + 9.5;
        }
        else {
            Sec3.style.display = "none"
        }

        //Page 4:
        if (position > -13 && position < -9.5){
            Sec4.style.display = "block"
            Sec4.style.opacity = position + 13;
        }
        else {
            Sec4.style.display = "none"
        }

        //Contact:
        if (position < -13.5) {
            if (!contactDisplay){
            contact.style.display = "block";
            contactContainer.style.display = "grid";
            contactDisplay = true;
            }
            else{
            gsap.to(contact, {opacity: 1, duration: 1})
            gsap.to(contactContainer, {opacity: 1, duration: 1})
            gsap.to(contact, {pointerEvents: "auto", delay: 0})
            gsap.to(contactContainer, {pointerEvents: "auto", delay: 0})
            }
        }
        else {
            if(contactContainer.style.display == "grid"){
                gsap.to(contact, {opacity: 0, duration: .5})
                gsap.to(contactContainer, {opacity: 0, duration: .5})
                gsap.to(contact, {pointerEvents: "none", delay: 0})
                gsap.to(contactContainer, {pointerEvents: "none", delay: 0})
            }
        }


        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)

    }
}

tick()