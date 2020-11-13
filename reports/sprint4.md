# Sprint 4 - *t16* - *Team Hexadecimal*

## Goal
### Shorter Trips!
## Sprint Leader
### Matt Vildibill


## Definition of Done

* The version in `server/pom.xml` is `<version>4.0</version>`.
* The Product Increment release for `v4.0` created on GitHub.
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
### v4 Protocol
For this epic, we plan to update the request version to 4 and make the request version optional on config requests. We will also add filters to config, so we can filter search results. We also want to add a narrow element to find, and a response element to options for trip.
### Build a Trip
For Build a Trip, the only parts we did not finish were saving a trip and being able to load a saved trip. We plan to finish those as well as clean our code and add test coverage for this epic.
### Shorter
For this epic, we plan to implement an algorithm for user concurrency to reduce the computation time, and optimize the time the user gets a response. We also plan to implement an algorithm to optimize and improve large trips.
### Filter Search
For Filter Search, we plan to add a filter option for the table of places, and add additional filter options such as region and country.
### User Experience
For this epic, we plan to ask friends, classmates, and instructors to get their feedback on their user experience when they use our site and take this feedback to improve the look and accessibility of our site.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 5 | *4* |
| Tasks | 24 | *42* | 
| Story Points |  48  | *64* | 

### Metrics Outlook
We as a team feel like we did very well in Sprint 3 and overall it was our best sprint as a team, and our outlook for Sprint 4 looks very promising. One of our big goals for this sprint is to refactor our Atlas.js file into child components of atlas. We also believe we can up our test coverage from the 69.9% it was last sprint to greater than 70% once we refactor. In Sprint 3, we finished 39 tasks and 54 story points and we think we can get very close to that number once again. We were all very busy last sprint because of midterms, but we still did very well which was exciting. With continued effective communication and cooperation, we believe we can be one of the top teams during this sprint.

## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *Oct. 28, 2020* | *#447* | *#274, #275, #431, #434, #437, #438, #450* |  | 
| *Oct. 30, 2020* | *#431, #434* | *#274, #275, #433, #437, #438, #439, #450* |  |
| *Nov. 2, 2020* | *#450* | *#274, #275, #391, #433, #437, #438, #439, #449, #476, #480* |  |
| *Nov. 4, 2020* | *#391, #476, #480* | *#274, #275, #433, #437, #438, #439, #449, #465, #488* |  |
| *Nov. 6, 2020* | *#274, #433, #437, #438, #439, #449, #488* | *#275, #426, #427, #428, #465, #469* |  |
| *Nov. 12, 2020* | *#274, #275, #391, #426, #427, #428, #431, #433, #434, #437, #438, #439, #447, #449, #450, #465, #469, #476, #480, #488* |  |  |


## Review

### Epics done 

We finished 4 Epics: v4 Protocol, Build a Trip, Filter Search, and User Experience

### Epics not done 

We did not finish Shorter, we are about halfway done with completing it. Nearest neighbor works. 

### What went well

We had great teamwork this Sprint. Whenever someone encountered a problem they made it known to the team and we worked together to overcome difficulties. We also were successful in refactoring our files and Atlas.js which we had a lot of trouble with in Sprint 3. 

### Problems encountered and resolutions

Similar to what went well, we were very good in working together to find a resolution. We had some issues with the Shorter epic and implementations of the algorithms. Another problem we had at the beginning of this sprint was that our tasks were not specific enough and we ended up doing some different things than what the task was originally intended to do. 

## Retrospective

### What we changed this sprint

Our teamwork is continuously improving and got better throughout this sprint. We also focused more on clean code from the start rather than writing unclean code and needing to fix it toward the end of the sprint. 

### What went well

We had success communicating with each other, and thus, writing individual code and having it come together and work successfully. Refactoring was also a great thing we got completed this sprint and made our code much more readable and navigatable. 

### Potential improvements

We feel we can improve on time management and getting a jump on the sprint earlier. 

### What we will change next time

We will start working on the sprint earlier and we will also try to improve our clean code more. We also will add more tests and test coverage. 
