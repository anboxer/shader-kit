import { Engine } from '../../engine'
import { Utils } from '../../utils'
let PointSource = {
    vertex: require('./vertex.vs'),
    fragment: require('./fragment.fs')
}

export class Point {
    engine: Engine
    glPosition: number
    glAColor: number
    glColor: WebGLUniformLocation
    gl: WebGLRenderingContext
    buffer: WebGLBuffer
    private _position: Float32Array
    private _color: Float32Array
    private _points: Float32Array = new Float32Array(0)
    constructor(engine: Engine) {
        this.engine = engine
        this.gl = engine.gl
        const gl = this.gl

        let vertex = engine.compileShader('vertex', PointSource.vertex)
        let fragment = engine.compileShader('fragment', PointSource.fragment)

        engine.useShaders([vertex, fragment])

        this.glPosition = engine.gl.getAttribLocation(engine.program, 'pPosition')
        this.glAColor = engine.gl.getAttribLocation(engine.program, 'a_Color')
    }

    private bindBuffer() {
        const gl = this.gl
        if (!this.buffer) {
            this.buffer = this.gl.createBuffer()
            this.gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
        }

        gl.bufferData(gl.ARRAY_BUFFER, this._points, gl.STATIC_DRAW)
    }

    public get position(): Float32Array {

        return this._position
    }


    public set position(v: Float32Array) {
        const gl = this.gl

        this.clear()

        this._points = Utils.concatFloat32Array(this._points, v)



        if (this._points.length > 0) {
            this.bindBuffer()
            gl.vertexAttribPointer(this.glPosition, 4, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(this.glPosition);

            gl.vertexAttribPointer(this.glAColor, 4, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(this.glAColor);
            gl.drawArrays(gl.POINTS, 0, this._points.length / v.length)
        } else {
            console.log(this._points.length)
        }

    }
    public get color(): Float32Array {

        return this._color
    }
    public set color(v: Float32Array) {
        const gl = this.gl

        this._color = v

        this.gl.uniform4fv(this.glColor, this._color)
    }
    public clear() {
        const gl = this.gl
        this.engine.clear()
    }

}