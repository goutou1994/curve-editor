import vec2 from './Vector2d';

class Selector {
    constructor(animator, canvasElement, vp) {
        this.a = animator;
        this.ce = canvasElement;
        this.vp = vp;
        this.listeners = {};
    }
    
    _within(pos1, radius, pos2) {
        return Math.abs(pos2[0] - pos1[0]) + Math.abs(pos2[1] - pos1[1]) < radius;
    }

    clear() {
        for (let event of Object.keys(this.listeners)) {
            if (this.listeners[event]) {
                this.ce.removeEventListener(event, this.listeners[event]);
                this.listeners[event] = null;
            }
        }
    }
    
    _testIntersect(ep) {
        for (let i = 0; i < this.a.keyFrames.length; i++) {
            const k = this.a.keyFrames[i];
            let cp = k.getControlPoints();
            if (this._within(this.vp.t(k.pos), 7, ep)) {
                return [i, 1];
            }
            for (let j = 0; j < 2; j++) {
                if (this._within(this.vp.t(cp[j]), 7, ep)) {
                    return [i, j + 2];
                }
            }
        }
        return [-1, 0];
    }
    
    makeCallback(event, callback) {
        if (!callback) return;
        let f = e => {
            let ep = new vec2(e.offsetX, e.offsetY);
            callback(e, ...this._testIntersect(ep));
        };
        this.ce.addEventListener(event, f);
        this.listeners[event] = f;
    }

    start(callbacks) {
        this.clear();

        for (let event of Object.keys(callbacks)) {
            this.makeCallback(event, callbacks[event]);
        }
    }
}

export default Selector;