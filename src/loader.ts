import { Ajax } from './ajax'

export class Loader {
    gl: WebGLRenderingContext
    program: WebGLProgram
    constructor(gl: WebGLRenderingContext, program: WebGLProgram) {
        this.gl = gl
        this.program = program
    }
    load(shader: string) {

    }
    getShader(type: 'vertex' | 'fragment', shaderName: string) {
        const gl = this.gl
        let shader = gl.createShader(type == 'fragment' ? gl.FRAGMENT_SHADER : gl.VERTEX_SHADER);
        let res = Ajax.syncGet(`${shaderName}/${type}.vs`)
        gl.shaderSource(shader, res.sources);
        gl.compileShader(shader);

        return shader
    }
    getVertex(shaderName: string) {
        return this.getShader('vertex', shaderName)
    }
    getFragment(shaderName: string) {
        return this.getShader('fragment', shaderName)
    }
}