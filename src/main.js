import Animator from './Animator';
import drawAnimator from './draw/drawAnimator';
import Viewport from './draw/Viewport';
import Controller from './Controller';

const canvasElement = document.querySelector('#canvas');
const canvas = canvasElement.getContext('2d');

const timeSpan = 10., valueSpan = 500;

let test = new Animator();
test.addKeyFrame(0, 100);
test.addKeyFrame(3, 500);
test.addKeyFrame(7, 300);

const mp = new Viewport(0, valueSpan, timeSpan, 0);
const vp = new Viewport(0, 0, 500, 300);
const trans = {
    t(p) {
        return vp.t(mp.it(p));
    },
    it(p) {
        return mp.t(vp.it(p));
    }
};

const controller = new Controller(test, canvasElement, trans);
controller.start();

setInterval(() => {
    canvas.clearRect(...vp);
    drawAnimator(test, canvas, trans);
    controller.draw();
}, 1000 / 20);