import vec2 from '@/Vector2d';

class Matrix2d extends Array {
    constructor(x0 = 0, y0 = 0, x1 = 1, y1 = 1) {
        super();
        this[0] = x0;
        this[1] = y0;
        this[2] = x1;
        this[3] = y1;
    }

    t(p) {
        return new vec2(
            this[0] * p[0] + this[1] * p[1],
            this[2] * p[0] + this[3] * p[1]
        )
    }

    mul(b) {
        return new Matrix2d(
            this[0] * b,
            this[1] * b,
            this[2] * b,
            this[3] * b
        )
    }

    i() {
        return new Matrix2d(
            this[3],
            -this[1],
            -this[2],
            this[0]
        ).mul(1 / (this[0] * this[3] - this[1] * this[2]));
    }

    it(p) {
        return this.i().t(p);
    }
}

class Viewport extends Array {
    constructor(x0 = 0, y0 = 0, x1 = 1, y1 = 1) {
        super();
        this[0] = x0;
        this[1] = y0;
        this[2] = x1;
        this[3] = y1;
    }

    t(p) {
        return new vec2(
            p[0] * (this[2] - this[0]) + this[0],
            p[1] * (this[3] - this[1]) + this[1],
        )
    }

    it(p) {
        return new vec2(
            (p[0] - this[0]) / (this[2] - this[0]),
            (p[1] - this[1]) / (this[3] - this[1])
        )
    }
}

export default Viewport;