import Selector from './Selector';
import drawDot from './draw/drawDot';
import drawControlPoint from './draw/drawControlPoint';
import drawLine from './draw/drawLine';

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

    onMouseMove(...p) {
        if (!this.status.mousedown) {
            this.status.highlight = p;
        } else {
            // TODO drag
        }
    }

    onMouseUp(...p) {
        this.status.mousedown = false;
        this.status.selected = [-1, 0];
        this.status.highlight = p;
    }

    onMouseDown(...p) {
        console.log(p[0], p[1]);    // TODO
        this.status.mousedown = true;
        this.status.selected = p;
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