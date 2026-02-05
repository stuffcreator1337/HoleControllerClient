

function showEdgeTooltip(text, x, y) {
var edgetooltip = document.getElementById('edge-tooltip');
    edgetooltip.textContent = text;
    edgetooltip.style.left = (x + 12) + 'px';
    edgetooltip.style.top  = (y + 12) + 'px';
    edgetooltip.style.opacity = 1;
}

function moveEdgeTooltip(x, y) {
var edgetooltip = document.getElementById('edge-tooltip');
    edgetooltip.style.left = (x + 12) + 'px';
    edgetooltip.style.top  = (y + 12) + 'px';
}

function hideEdgeTooltip() {
var edgetooltip = document.getElementById('edge-tooltip');
    edgetooltip.style.opacity = 0;
}
