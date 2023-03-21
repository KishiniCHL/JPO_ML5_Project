# ML5 Project : Object Detector

## Collaborators
This project was worked on by:
- [@KishiniCHL](https://github.com/KishiniCHL)
- [@Lawberryy](https://github.com/Lawberryy)

## Description
The purpose was to experiment with ML5.js.

For this project, we used ObjectDetector, a real-time object detection system using COCOSSD and the webcam in plain javascript. 
You can check the original code [here](https://github.com/ml5js/ml5-library/tree/main/examples/javascript/ObjectDetector/COCOSSD_webcam).

We added some changes to the code so that you can generate a random object from a definite list. If you show the webcam the appropriate object, the object detector will recognize it and notify you by turning quickly green.

Then a point will be added to your score and a new object will be generated, etc. It's a loop.

You can also click again on the generate button if you want to change the object, or click on the red reset button to reset your score.