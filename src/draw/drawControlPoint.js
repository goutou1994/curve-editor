const edge = 5;

export default function(pos, canvas, vp, color = 'black') {
    pos = vp.t(pos);
    canvas.beginPath();
    canvas.rect(pos[0] - edge / 2, pos[1] - edge / 2, edge, edge);
    canvas.fillStyle = 'white';
    canvas.lineWidth = '1';
    canvas.strokeStyle = color;
    canvas.fill();
    canvas.stroke();
}