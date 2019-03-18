export default function(p0, p1, p2, p3, c, vp) {
    p0 = vp.t(p0);
    p1 = vp.t(p1);
    p2 = vp.t(p2);
    p3 = vp.t(p3);
    
    c.beginPath();
    c.moveTo(p0[0], p0[1]);
    c.lineWidth = '1';
    c.strokeStyle = 'black';
    c.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
    c.stroke();
}