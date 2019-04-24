import vec2 from '@/Vector2d';

class KeyFrame {
    constructor(t, v) {
        this.pos = new vec2(t, v);
        this.dir = vec2.nCreate(1, 0);
        this.length = [1, 1];
    }

    getControlPoints() {
        let p1 = this.pos.add(this.dir.mul(-this.length[0] / 3));
        let p2 = this.pos.add(this.dir.mul(this.length[1] / 3));
        return [p1, p2];
    }
}

class Animator {
    constructor() {
        this.keyFrames = [];
        this.curves = [];
    }

    /**
     * y=f(t)
     * @param t
     */
    getValue(t) {
        // debugger;
        let p = this.findInsertPos(t);
        if (p < 0) return this.keyFrames[0].pos[1];
        if (p >= this.keyFrames.length - 1) return this.keyFrames[this.keyFrames.length - 1].pos[1];
        let k = this.keyFrames[p];
        let kn = this.keyFrames[p + 1];
        let c = this.curves[p];
        let left = 0, right = 1;
        while (left < right && right - left > 1e-4) {
            let mid = (left + right) / 2;
            if (this.getValueFromW(c, mid)[0] > t) {
                right = mid;
            } else {
                left = mid;
            }
        }
        let w = (left + right) / 2;
        return this.getValueFromW(c, w)[1];
    }

    getValueFromW(c, w) {
        return c[0].add(c[1].mul(w)).add(c[2].mul(w * w)).add(c[3].mul(w * w * w));
    }

    prepare() {
        for (let i = 0; i < this.keyFrames.length - 1; i++) {
            // debugger;
            const k = this.keyFrames[i];
            const kn = this.keyFrames[i + 1];
            let p = [
                k.pos,
                k.getControlPoints()[1],
                kn.getControlPoints()[0],
                kn.pos
            ];
            this.curves[i] = [
                p[0],
                p[0].mul(-3).add(p[1].mul(3)),
                p[0].mul(3).add(p[1].mul(-6)).add(p[2].mul(3)),
                p[0].mul(-1).add(p[1].mul(3)).add(p[2].mul(-3)).add(p[3])
            ];
        }
    }

    findInsertPos(t) {
        if (this.keyFrames.length < 1 || this.keyFrames[0].pos[0] > t) return -1;
        // 找到关键帧要插入的地方
        for (let i = 0; i < this.keyFrames.length - 1; i++) {
            if (this.keyFrames[i].pos[0] <= t
                && this.keyFrames[i + 1].pos[0] > t) {
                return i;
            }
        }
        return this.keyFrames.length - 1;
    }

    addKeyFrame(t, v) {
        let newKey = new KeyFrame(t, v);
        let i = this.findInsertPos(t);
        this.keyFrames.splice(i + 1, 0, newKey);
    }
}

export default Animator;