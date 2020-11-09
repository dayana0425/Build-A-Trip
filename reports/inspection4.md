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
| mattv | |
| daynight| 15 min |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| 32-52 | Fix Current Location Marker - For some reason our marker isn't loading when initially opening up the page and i think the issue may be in here. | hi | dbilbao | |
| 102-105 | When map reaches max zoom it glitches/shakes - we may need to experiment with the maxBoundViscosity or boundsOptions settings | med | dbilbao | |
| 39-57 |  why we need this if else? can they just combine together? | med | xinyi99 | |
| 63-67 |  for drawLines method maybe we also need to show the line between the last destination to "home"  | high | xinyi99 | |
| 39-56 | similiar code, can we find a more efficient way for getmarker. | med | daynight | |
| 2,7 | Combine import for Polyline to the other imports for 'react-strap' | low | rloptien | |
| 39-56 | Only part that is different is the icon | med | rloptien | |

### Results
