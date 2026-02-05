var edgetooltipTimer = null;
var edgetooltipEpoch = null;

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
    if (edgetooltipTimer) {
        clearInterval(edgetooltipTimer);
        edgetooltipTimer = null;
    }
    edgetooltip.style.opacity = 0;
}


function formatDuration(seconds) {
    seconds = Math.max(0, Math.floor(seconds));

    var hours = Math.floor(seconds / 3600);
    seconds %= 3600;

    var minutes = Math.floor(seconds / 60);
    seconds %= 60;

    function pad(n) {
        return n < 10 ? '0' + n : '' + n;
    }

    return (
        hours + ':' +
        pad(minutes) + ':' +
        pad(seconds)
    );
}

function showLiveEdgeTooltip(epochSeconds) {
	var edgetooltip = document.getElementById('edge-tooltip');
    edgetooltipEpoch = epochSeconds;

    function update() {
        var now = Date.now() / 1000;
        var diff = now - edgetooltipEpoch;
        edgetooltip.textContent = formatDuration(diff);
    }

    update(); // сразу показать
    edgetooltipTimer = setInterval(update, 1000);
}