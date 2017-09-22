import './style.less'
import { Engine } from './engine'
document.addEventListener("DOMContentLoaded", () => {
    let canvas: HTMLCanvasElement = document.createElement('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    document.body.appendChild(canvas)

    let engine = new Engine(canvas)
    let p = engine.Point()
    let timer = 0;
    let render = () => {
        let r = Math.cos(timer) * Math.sin(timer) * 1.8
        // p.color = new Float32Array([Math.abs(Math.cos(timer)), Math.abs(Math.sin(timer)), Math.abs(Math.sin(timer)), 1.0])
        p.position = new Float32Array([Math.cos(timer) * r, Math.sin(timer) * r, r, 1.0])
        timer += Math.PI / (360 * 2);
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
})