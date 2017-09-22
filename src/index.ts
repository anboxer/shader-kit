import './style.less'
import { Engine } from './engine'
import { Spirograph } from './geometry'
document.addEventListener("DOMContentLoaded", () => {
    let canvas: HTMLCanvasElement = document.createElement('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    document.body.appendChild(canvas)

    let engine = new Engine(canvas)
    let p = engine.Point()
    let timer = 0;
    let geometry = new Spirograph()
    let render = () => {
        let r = Math.cos(timer) * Math.sin(timer) * 1.8
        // p.color = new Float32Array([Math.abs(Math.cos(timer)), Math.abs(Math.sin(timer)), Math.abs(Math.sin(timer)), 1.0])

        timer += .1;
        geometry.timer = timer
        p.position = geometry.getPoint()
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
})