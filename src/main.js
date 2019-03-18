import Animator from './Animator';
import drawAnimator from './draw/drawAnimator';
import Viewport from './draw/Viewport';
import Controller from './Controller';

const canvasElement = document.querySelector('#canvas');
const canvas = canvasElement.getContext('2d');


let test = new Animator();
test.addKeyFrame(0, 1);
test.addKeyFrame(.5, .5);

const vp = new Viewport(0, 0, 500, 300);

const controller = new Controller(test, canvasElement, vp);
controller.start();

setInterval(() => {
    canvas.clearRect(...vp);
    drawAnimator(test, canvas, vp);
    controller.draw();
}, 1000 / 20);