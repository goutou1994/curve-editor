import vec2 from '@/Vector2d';

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
}

export default Viewport;