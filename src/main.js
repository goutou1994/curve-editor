import Animator from './Animator';
import drawAnimator from './draw/drawAnimator';
import drawDot from './draw/drawDot';
import Viewport from './draw/Viewport';
import Controller from './Controller';

const canvasElement = document.querySelector('#canvas');
const canvas = canvasElement.getContext('2d');

const timeSpan = 5., valueSpan = 10;

let test = new Animator();
test.addKeyFrame(0, 1);
test.addKeyFrame(2, 5);
test.addKeyFrame(5, 3);
test.prepare();

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
controller.$on('change', () => {
    test.prepare();
});

setInterval(() => {
    canvas.clearRect(...vp);
    drawAnimator(test, canvas, trans);
    controller.draw();
    drawDot([test.getValue(new Date().getTime() / 1000 % 5) / 10, .7], canvas, vp);
}, 1000 / 20);

console.log(test);