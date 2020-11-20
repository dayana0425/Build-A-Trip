# Inspection - Team *T16* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *NearestNeighbor.java*|
| Meeting | *November 20, 2020* |
| Checklist | *t16/reports/checklist.md* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| dbilbao | 20 min |
| rloptien | 30 min |
| xinyi99 | 20 min |
| mattv | 30 min |
| daynight| 20 min |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| 3 | unused import| low | dbilbao | #616 |
| 13 | unused variable| low | dbilbao | #616 |
| 17-18 | unnecessary Arrays.fill because the default values of a boolean array is already false  -- this could make it faster| low | dbilbao | #616 |
| 33 | while loop condition can be: !visited[current] instead | low | dbilbao | #616 |
| 23-27 | We can use System.arraycopy() instead -- this could make it faster | low | dbilbao | #616 |
| 54 | Long can be primitive - i think this might make it faster | low | dbilbao | #616 |
| 23&29 | Change the names for more readable code. We have two different tours and is star_point supposed to be start_point? | low | rloptien | #616 |
| 9 | Len never is instantiated, when does it change value | med | rloptien | #616 |
| 56&62 | What is p? | low | rloptien | #616 |
| 3/13 | unused import and variable | low | daynight | #616 |
| 23-27 | we have manual array copy method | low | daynight | #616 |
| 29-54 | What is the use of "index" | low | daynight | #616 |
| 59-61 | Moving this for-loop into getNearestNeighbor to reduce a for loop? | mid | xinyi99 | #615 |
| 64&68 | Can we find a more effiencient way to replace copyTour()? | mid | xinyi99 | # 615 |
| 53-70 | Rename variables for readability. What is i and p? What is difference betweeen roundDistance and roundTripDistance? | low | mattv | #615 |
| 57 | Declare roundDistance = 0L outside of for loop. Initializing variable every iteration of loop | low | mattv | #615 |
| 29-49 | Is getNearestNeighbor most efficient right now? Does for have to be inside of while? | low | mattv | #615 |

### Results
We figured out that we need a to rethink our nearest neighbor algorithm because it is insufficient and could be better but it works well enough to handle the test files such as coBrews so we're just going focus on making it more readable and we added a task for impproving efficiency but it will be low priority because we have a lot of tasks to accomplish this sprint.  
