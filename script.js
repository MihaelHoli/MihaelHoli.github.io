const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const result = document.getElementById('result');
const captureButton = document.getElementById('captureButton');

navigator.mediaDevices.getUserMedia({ 
    video: true 
})
    .then(stream => {
        video.srcObject = stream;
        console.log("Camera access granted.");
    })
    .catch(error => {
        console.error("Pristup kameri nije moguć:", error);
        result.innerText = "Pristup kameri nije moguć. Provjerite postavke kamere.";
    });

function detectShapes() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const src = cv.imread(canvas);
    const gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    const blurred = new cv.Mat();
    cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0);
    const edges = new cv.Mat();
    cv.Canny(blurred, edges, 50, 150);
    const contours = new cv.MatVector();
    const hierarchy = new cv.Mat();
    cv.findContours(edges, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);

    result.innerHTML = ''; // Clear previous results
    for (let i = 0; i < contours.size(); i++) {
        const contour = contours.get(i);
        const approx = new cv.Mat();
        cv.approxPolyDP(contour, approx, 0.02 * cv.arcLength(contour, true), true);
        const vertices = approx.rows;

        let shape = '';
        if (vertices === 3) {
            shape = 'Triangle';
        } else if (vertices === 4) {
            const rect = cv.boundingRect(approx);
            const aspectRatio = rect.width / rect.height;
            shape = (aspectRatio >= 0.95 && aspectRatio <= 1.05) ? 'Square' : 'Rectangle';
        } else if (vertices > 4) {
            shape = 'Circle';
        }

        if (shape) {
            const moments = cv.moments(contour);
            const cx = moments.m10 / moments.m00;
            const cy = moments.m01 / moments.m00;
            context.strokeStyle = '#ffa500';
            context.lineWidth = 2;
            context.strokeRect(cx - 5, cy - 5, 10, 10);
            context.fillStyle = '#ffa500';
            context.fillText(shape, cx, cy);
            result.innerHTML += `Detected ${shape}<br>`;
        }

        approx.delete();
    }

    src.delete();
    gray.delete();
    blurred.delete();
    edges.delete();
    contours.delete();
    hierarchy.delete();
}

captureButton.addEventListener('click', detectShapes);