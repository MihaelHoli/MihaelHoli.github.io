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

async function loadModel() {
    try {
        const model = await tf.loadGraphModel('https://tfhub.dev/google/faster_rcnn/openimages_v4/inception_resnet_v2/1');
        console.log('Model učitan:', model);
        return model;
    } catch (error) {
        console.error('Error loading model:', error);
    }
}

function drawBoundingBox(image, ymin, xmin, ymax, xmax, label) {
    context.strokeStyle = '#ffa500';
    context.lineWidth = 2;
    context.strokeRect(xmin * image.width, ymin * image.height, (xmax - xmin) * image.width, (ymax - ymin) * image.height);
    context.fillStyle = '#ffa500';
    context.fillText(label, xmin * image.width, ymin * image.height > 10 ? ymin * image.height - 5 : 10);
    context.fillText(label, xmin * image.width, ymax * image.height + 15); // Add label below the bounding box
}

async function detectObjects(model) {
    try {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const input = tf.browser.fromPixels(canvas).toFloat().expandDims(0);
        console.log('Input tensor:', input);

        const detectionResult = await model.executeAsync(input);
        console.log('Detection result:', detectionResult);

        const boxes = detectionResult[0].arraySync();
        const scores = detectionResult[1].arraySync();
        const classes = detectionResult[2].arraySync();

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        result.innerHTML = ''; // Clear previous results
        const classLabels = ['label1', 'label2', 'label3']; // Replace with actual class labels
        for (let i = 0; i < scores[0].length; i++) {
            if (scores[0][i] > 0.5) {
                const [ymin, xmin, ymax, xmax] = boxes[0][i];
                const labelIndex = classes[0][i];
                const label = classLabels[labelIndex];
                console.log(`Detected ${label} with score ${scores[0][i]} at [${ymin}, ${xmin}, ${ymax}, ${xmax}]`);
                drawBoundingBox(canvas, ymin, xmin, ymax, xmax, label);
                result.innerHTML += `Detected ${label} with score ${scores[0][i]}<br>`;
            }
        }

        tf.dispose([input, detectionResult]);
    } catch (error) {
        console.error('Error detecting objects:', error);
    }
}

async function main() {
    const model = await loadModel();
    captureButton.addEventListener('click', () => {
        detectObjects(model);
    });
}

main();