import Animator from '@/Animator';
import drawDot from './drawDot';
import drawControlPoint from './drawControlPoint';
import drawLine from './drawLine';
import drawCurve from './drawCurve';


export default function(a, c, vp) {
    if (!(a instanceof Animator)) return;
    for (let i = 0; i < a.keyFrames.length; i++) {
        const k = a.keyFrames[i];
        let cp = k.getControlPoints();
        if (i < a.keyFrames.length - 1) {
            let l = a.keyFrames[i + 1];
            let cp2 = l.getControlPoints();
            drawCurve(k.pos, cp[1], cp2[0], l.pos, c, vp);
        }
        
        drawLine(cp[0], cp[1], c, vp);
        drawControlPoint(cp[0], c, vp);
        drawControlPoint(cp[1], c, vp);
        drawDot(k.pos, c, vp);
    }
}