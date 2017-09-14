import { Engine } from './engine'
import { Point } from './shaders'
export class Shape {
    engine: Engine
    constructor(engine: Engine) {
        this.engine = engine
    }
    point() {
        let engine = this.engine

        return new Point(engine)
    }
}