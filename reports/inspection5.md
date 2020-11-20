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
| xinyi99 | |
| mattv | |
| daynight| 20 min |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| 3 | unused import| low | dbilbao | |
| 13 | unused variable| low | dbilbao | |
| 17-18 | unnecessary Arrays.fill because the default values of a boolean array is already false  -- this could make it faster| low | dbilbao | |
| 33 | while loop condition can be: !visited[current] instead | low | dbilbao | |
| 23-27 | We can use System.arraycopy() instead -- this could make it faster | low | dbilbao | |
| 54 | Long can be primitive - i think this might make it faster | low | dbilbao | |
| 23&29 | Change the names for more readable code. We have two different tours and is star_point supposed to be start_point? | low | rloptien | |
| 9 | Len never is instantiated, when does it change value | med | rloptien | |
| 56&62 | What is p? | low | rloptien | |
| 3/13 | unused import and variable | low | daynight | |
| 23-27 | we have manual array copy method | low | daynight | |
| 29-54 | What is the use of "index" | low | daynight | |

### Results
