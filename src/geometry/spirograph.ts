export class Spirograph {
    R: number = .8
    r: number = .1
    l: number = .4
    k: number = .599
    t: number
    points: number[] = []
    currentPoint: Float32Array
    getPoints(): Float32Array {
        return Float32Array.from(this.points)
    }
    x(): number {
        let R = this.R
        let t = this.t
        let k = this.k
        let l = this.l
        return R * ((1 - k) * Math.cos(t) + l * k * Math.cos(((1 - k) / (k || 1)) * t))
    }
    y(): number {
        let R = this.R

        let t = this.t
        let k = this.k
        let l = this.l
        return R * ((1 - k) * Math.sin(t) - l * k * Math.sin(((1 - k) / (k || 1)) * t))
    }
    set timer(t: number) {
        this.t = t
        let p = [
            this.x(),
            this.y(),
            this.x() * this.y() * Math.cos(t), 1.0
        ]
        this.currentPoint = Float32Array.from(p)
        this.points.concat(p)
    }
    getPoint(): Float32Array {

        return this.currentPoint
    }
}