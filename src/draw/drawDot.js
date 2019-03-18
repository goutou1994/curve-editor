const radius = 5;

export default function(pos, canvas, vp, color = 'black') {
    pos = vp.t(pos);
    canvas.beginPath();
    canvas.arc(pos[0], pos[1], radius, 0, 2 * Math.PI);
    canvas.fillStyle = color;
    canvas.fill();
}