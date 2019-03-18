import Selector from './Selector';
import drawDot from './draw/drawDot';
import drawControlPoint from './draw/drawControlPoint';
import drawLine from './draw/drawLine';
import vec2 from './Vector2d';

class Controller {
    constructor(animator, canvasElement, vp) {
        this.a = animator;
        this.ce = canvasElement;
        this.c = this.ce.getContext('2d');
        this.vp = vp;
        this.selector = null;
        this.status = {
            highlight: [-1, 0],
            mousedown: false,
            selected: [-1, 0]
        };
    }

    onMouseMove(e, ...p) {
        if (!this.status.mousedown) {
            this.status.highlight = p;
        } else {
            let ep = new vec2(e.offsetX, e.offsetY);
            this.handleDrag(ep);
        }
    }

    onMouseUp(e, ...p) {
        this.status.mousedown = false;
        this.status.selected = [-1, 0];
        this.status.highlight = p;
    }

    onMouseDown(e, ...p) {
        console.log(p[0], p[1]);    // TODO
        this.status.mousedown = true;
        this.status.selected = p;
    }

    handleDrag(ep) {
        if (this.status.selected[0] < 0) return;
        const i = this.status.selected[0],
            j = this.status.selected[1],
            k = this.a.keyFrames[i];
        const np = this.vp.it(ep);
        if (j === 1) {
            k.pos = np;
        } else {
            let sign = j === 2 ? -1 : 1;
            k.dir = np.sub(k.pos).mul(sign).normalize();
            k.length[j - 2] = np.sub(k.pos).l() * 3;
        }
    }

    draw() {
        const i = this.status.highlight[0];
        if (i > -1) {
            const k = this.a.keyFrames[i];
            let cp = k.getControlPoints();
            drawLine(cp[0], cp[1], this.c, this.vp, 'blue');
            drawControlPoint(cp[0], this.c, this.vp, 'blue');
            drawControlPoint(cp[1], this.c, this.vp, 'blue');
            drawDot(k.pos, this.c, this.vp, 'red');
        }
    }

    start() {
        this.selector = new Selector(this.a, this.ce, this.vp);

        this.selector.start({
            mousemove: this.onMouseMove.bind(this),
            mousedown: this.onMouseDown.bind(this),
            mouseup: this.onMouseUp.bind(this)
        });
    }
}

export default Controller;