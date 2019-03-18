class Vector2d extends Array {
    constructor(x, y) {
        super();
        this[0] = x;
        this[1] = y;
        this.length = 2;
    }

    static nCreate(x, y) {
        let created = new Vector2d(x, y);
        return created.normalize();
    }

    normalize() {
        let length = Math.sqrt(this[0] * this[0] + this[1] * this[1]);
        return new Vector2d(this[0] / length, this[1] / length);
    }

    add(b) {
        return new Vector2d(this[0] + b[0], this[1] + b[1]);
    }

    mul(b) {
        return new Vector2d(this[0] * b, this[1] * b);
    }
}

export default Vector2d;