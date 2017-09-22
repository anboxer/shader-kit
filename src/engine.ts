import { Shape } from './shape'

export type ShaderType = 'vertex' | 'fragment'
export class Engine {
    canvas: HTMLCanvasElement
    gl: WebGLRenderingContext
    program: WebGLProgram
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        this.program = this.gl.createProgram()


        if (!this.gl) {
            console.log('not support')
            return
        }
        this.fixSize().clear()
    }
    fixSize(): Engine {
        let canvas = this.canvas
        this.gl.viewport(0, 0, canvas.width, canvas.height);

        return this
    }
    clear(): void {
        let gl = this.gl
        // Set clear color to black, fully opaque
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        // Enable depth testing
        gl.enable(gl.DEPTH_TEST);
        // Near things obscure far things
        gl.depthFunc(gl.LEQUAL);
        // Clear the color as well as the depth buffer.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    compileShader(type: ShaderType, shaderCode: string): WebGLShader {
        const gl = this.gl
        let shader = gl.createShader(type == 'fragment' ? gl.FRAGMENT_SHADER : gl.VERTEX_SHADER);

        gl.shaderSource(shader, shaderCode);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw new Error(gl.getShaderInfoLog(shader));
        }

        return shader
    }
    useShaders(shaders: WebGLShader[]) {
        const gl = this.gl
        const program = this.program
        shaders.forEach(s => {
            gl.attachShader(program, s);
        })
        gl.linkProgram(program);

    }

    Point() {
        const gl = this.gl
        let shape = new Shape(this)
        let point = shape.point()
        this.gl.useProgram(this.program);
        gl.drawArrays(gl.POINTS, 0, 1)
        gl.flush();

        return point
    }
}