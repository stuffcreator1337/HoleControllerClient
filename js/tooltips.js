
var edgetooltip = document.getElementById('edge-tooltip');

function showEdgeTooltip(text, x, y) {
    edgetooltip.textContent = text;
    edgetooltip.style.left = (x + 12) + 'px';
    edgetooltip.style.top  = (y + 12) + 'px';
    edgetooltip.style.opacity = 1;
}

function moveEdgeTooltip(x, y) {
    edgetooltip.style.left = (x + 12) + 'px';
    edgetooltip.style.top  = (y + 12) + 'px';
}

function hideEdgeTooltip() {
    edgetooltip.style.opacity = 0;
}
