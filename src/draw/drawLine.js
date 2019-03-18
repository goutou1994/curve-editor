export default function(p1, p2, c, vp, color = 'black') {
    p1 = vp.t(p1);
    p2 = vp.t(p2);
    c.beginPath();
    c.moveTo(p1[0], p1[1]);
    c.lineWidth = '1';
    c.strokeStyle = color;
    c.lineTo(p2[0], p2[1]);
    c.stroke();
}