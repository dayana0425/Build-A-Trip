# Inspection - Team *T16* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Map.js*|
| Meeting | *November 8, 2020* |
| Checklist | *t16/reports/checklist.md* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| dbilbao | 20 min |
| rloptien | 30 min |
| xinyi99 | 30 min|
| mattv | 30 min |
| daynight| 15 min |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| 32-52 | Fix Current Location Marker - For some reason our marker isn't loading when initially opening up the page and i think the issue may be in here. | hi | dbilbao | #518 |
| 102-105 | When map reaches max zoom it glitches/shakes - we may need to experiment with the maxBoundViscosity or boundsOptions settings | med | dbilbao | #521 |
| 39-57 |  why we need this if else? can they just combine together? | med | xinyi99 | |
| 63-67 |  for drawLines method maybe we also need to show the line between the last destination to "home"  | high | xinyi99 | |
| 39-56 | similiar code, can we find a more efficient way for getmarker. | med | daynight | |
| 2,7 | Combine import for Polyline to the other imports for 'react-strap' | low | rloptien | |
| 39-56 | Only part that is different is the icon | med | rloptien | |
| 85-111 | Render function is 26 lines long. Find way to shorten, or declare all variables on same line. | med | mattv | |
| 32-57 | getMarker function is also too long for clean code, find way to compartmentalize | low | mattv | |
| 9-16 | Consider declaring all of our contants in our constants.js file | low | mattv | |


### Results
We've found a lot of issues in map.js that are important so it is a good thing we inspected this file. 
