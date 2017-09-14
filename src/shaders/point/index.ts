import { Engine } from '../../engine'
let PointSource = {
    vertex: require('./vertex.vs'),
    fragment: require('./fragment.fs')
}

export class Point {
    engine: Engine
    glPosition: number
    glColor: WebGLUniformLocation
    gl: WebGLRenderingContext
    private _position: Float32Array
    private _color: Float32Array
    constructor(engine: Engine) {
        this.engine = engine
        this.gl = engine.gl

        let vertex = engine.compileShader('vertex', PointSource.vertex)
        let fragment = engine.compileShader('fragment', PointSource.fragment)

        engine.useShaders([vertex, fragment])

        this.glPosition = engine.gl.getAttribLocation(engine.program, 'pPosition')
        this.glColor = this.gl.getUniformLocation(engine.program, 'pColor')
    }

    public get position(): Float32Array {

        return this._position
    }


    public set position(v: Float32Array) {
        const gl = this.gl
        this._position = v;

        this.clear()
        this.gl.vertexAttrib4fv(this.glPosition, v)
        gl.drawArrays(gl.POINTS, 0, 1)
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
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        // Enable depth testing
        gl.enable(gl.DEPTH_TEST);
        // Near things obscure far things
        gl.depthFunc(gl.LEQUAL);
        // Clear the color as well as the depth buffer.
        gl.clear(gl.COLOR_BUFFER_BIT);

    }

}