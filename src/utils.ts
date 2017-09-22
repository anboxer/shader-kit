export class Utils {
    static concatFloat32Array(a: Float32Array, b: Float32Array): Float32Array {
        let r = new Float32Array(a.length + b.length)
        r.set(a)
        r.set(b, a.length)
        return r
    }
}