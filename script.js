const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const result = document.getElementById('result');
const captureButton = document.getElementById('captureButton');

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        console.error("Pristup kameri nije moguć:", error);
    });

captureButton.addEventListener('click', () => {
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    let src = cv.imread(canvas);
    let gray = new cv.Mat();
    let blurred = new cv.Mat();
    let edges = new cv.Mat();

    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
    cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0);
    cv.Canny(blurred, edges, 50, 150);

    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    cv.findContours(edges, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);

    for (let i = 0; i < contours.size(); i++) {
        let contour = contours.get(i);
        let perimeter = cv.arcLength(contour, true);
        let approx = new cv.Mat();
        cv.approxPolyDP(contour, approx, 0.02 * perimeter, true);

        if (approx.rows == 3) {
            result.innerText = "Trokut";
        } else if (approx.rows == 4) {
            result.innerText = "Kvadrat ili pravokutnik";
        } else {
            let area = cv.contourArea(contour);
            let boundingRect = cv.boundingRect(contour);
            let radius = boundingRect.width / 2;
            if (Math.abs(1 - (boundingRect.width / boundingRect.height)) <= 0.2 &&
                Math.abs(1 - (area / (Math.PI * Math.pow(radius, 2)))) <= 0.2) {
                result.innerText = "Krug";
            } else {
                result.innerText = "Višestrani oblik";
            }
        }

        approx.delete();
        contour.delete();
    }

    src.delete();
    gray.delete();
    blurred.delete();
    edges.delete();
    contours.delete();
    hierarchy.delete();
});

async function loadModel() {
    const model = await tf.loadLayersModel('URL_DO_VAŠEG_MODELA/model.json');
    console.log('Model učitan:', model);
}

loadModel();