# Sprint 5 - *t16* - *Team Hexidecimal*

## Goal
### User Experience

## Sprint Leader
### Chen Wang


## Definition of Done

* The version in `server/pom.xml` is `<version>5.0</version>`.
* The Product Increment release for `v5.0` created on GitHub.
* The team's web application is deployed on the production server (`black-bottle.cs.colostate.edu`).
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.


## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap and ReactLeaflet for a consistent user experience (no HTML, CSS, style=, etc.).

### Clean Code
* Technical Debt Ratio less than 5% (A).
* Minimize code smells and duplication.

### Test Driven Development
* Write tests before code.
* Unit tests are fully automated.
* Code coverage greater than 70%.

### Processes
* Master is never broken. 
* All pull request builds and tests are successful on Travis-CI.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.

## Planned Epics
### Shorter
For the Shorter epic this sprint, we plan to add an optimize button to the client side to show the difference when we optimize and improve our optimiziation, so that our result responds quickly.
### User Experience
To improve the user experience of our site, we plan to fix our home marker because it disappears, add a button to toggle between having lines showing or not showing, and change the placement of our buttons to our map to reduce clutter and scrolling on our site.
### File Formats
For this epic, we plan to add support for saving our trips as KML, SVG, and CSV formats to go along with JSON, and include a pop up to select what format the user wants.
### Place Details
For Place Details, we plan to convert latitude and longitude to a textual description, and display this information both on the map and in the itinerary.
### Modify Trip
For this epic, we plan to allow the user to select a new starting location, reverse the order of a trip, reorder the trip however they want, remove certain destinations, and add destination notes.
### Where Is?
For Where Is, we plan to allow the user to enter latitude and longitude coordinates in any format that they want and convert them to a format that our site can utilize.
## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 6 | 4 |
| Tasks |  25   | 37 | 
| Story Points |  46  | 46 | 

### Metrics Outlook
Sprint 4 was our best sprint of the semester so far as a team and we believe that our communication and teamwork have gotten better as the semester goes on. Last sprint we completed four out of the five epics, but we were really close to completing all of them. While we have six epics planned for this sprint, we also have an extra week and we believe we can complete all of them if we continue to work well together and put in the time required.

## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *November 18, 2020* | *None* | *#564, #567, #575, #577, #580, #601* |  | 
| *November 20, 2020* | *#601, #603, #617* | *#564, #567, #575, #580, #581, #582, #436, #626* |  |
| *November 30, 2020* | *#564, #567, #577, #581, #582, #436, #626* | *#575, #579, #580, #583, #596* |  |
| *December 2, 2020* | *#432* | *#575, #579, #580, #583, #596* |  |
| *December 4, 2020* | *#430, #436, #575, #579, #580, #583, #626* | *#568, #569, #594, #595, #642, #644* |  |
| *December 7, 2020* | *#642* | *#568, #569, #594, #595, #644* |  |
| *December 9, 2020* | *#559, #560, #594, #595, #641* | *#562, #568, #569, #643, #644* |  |
| *December 10, 2020* | *#562, #568, #569, #643, #644* |  |  |

## Review

### Epics done  

Shorter, Modify a Trip, Place Details, User Experience 

### Epics not done 
For File Formats we only completed CSV. And Where is? is mostly completed. 

### What went well
We feel we significantly improved the User Experience and fluidity of our project. Our overall test coverage also improved a lot this sprint. 

### Problems encountered and resolutions
Balancing our schedules toward the end of this semester has been hard for a lot of our team and there was not an even distribution of our tasks. 


## Retrospective

### What we changed this sprint
During this sprint we made sure that we had a test class for every file and that helped improve our website's quality. 

### What went well
Helping each other when someone had a problem is something we have continued to do well. 

### Potential improvements
Finding a better way to balance time and keep tasks distributed equally. 

### What we will change next time
Asking for more help, and earlier on. 
