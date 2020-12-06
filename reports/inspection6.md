# Inspection - Team *T16* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *ItineraryTable.js*|
| Meeting | *December 4, 2020* |
| Checklist | *t16/reports/checklist.md* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| dbilbao | 20 min |
| rloptien | 30 min |
| xinyi99 | 30 min |
| mattv | 20 min |
| daynight| 25 min |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| 31 | remove the setState for tripNmae| mid | xinyi99 | #644 |
| 36,46| don't need to define "name" variable | low | xinyi99 | #644 |
| 111-171 | considering creating a new file component | mid | xinyi99 | #641 |
| 57, 181-187| looks like there are duplicate | mid | xinyi99 | #644 |
| 210 - 220 |considering create a button component | mid | xinyi99 | #641 |
| 255-283| create another file to store all const value | mid | xinyi99 | #641 |
| 136 | there is a unused const testing | low | daynight | #644 |
| 219 | e is not used in reverseTrip() | low | daynight | #644 |
| 184 | we have roundTrip, why we not use it here | low | daynight | #644 |
| 101-109 | changes to the itinerary should also mean changes to the map, we can do this by combinging placesForItinerary with MarkerPositions OR make a special method that updates both placesForItinerary and MarkerPositions | hi | dbilbao | #642 |
| 111-171 | Files is 283 lines long. Maybe move file load and save in its own file if it can still be in the itinerary table. | med | rloptien | #641 |
| 255-283 | Can constants go in constants.js? | low | rloptien | #641 |
| 49, 130, 184 | Begin supporting different units, not just miles | med | mattv | #641 |
| 181 | Consider providing error messages when something doesn't display or output correctly in itinerary | low | mattv | #641 |

### Results
We've discovered that there is a lot going on in our Itinerary Table and it is becoming too big and it's going to continue to get bigger so we'll be refactoring all components associated with load/save. We'll also be making some additions to the itinerary table so that when you make changes to the itinerary table then it'll update the map with those changes. Then, the other tasks are small fixes we need to make.
