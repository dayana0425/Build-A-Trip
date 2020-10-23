# Sprint #3 - *t16* - *Team Hexadecimal*

## Goal
### Build a trip!

## Sprint Leader: 
### Xinyi Wang


## Definition of Done

* The version in `server/pom.xml` is `<version>3.0</version>`.
* The Product Increment release for `v3.0` created on GitHub.
* The team's web application is deployed on the production server (`black-bottle.cs.colostate.edu`).
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.


## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap and ReactLeaflet for a consistent user experience (no HTML, CSS, style, etc.).

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
**v3 Protocol**

For this epic, we plan to update the request version to version 3. We plan to add trip as a supported request along with config, distance, and find and create a protocol object of the type trip. We also plan to modify the the Find behavior when no match is specified.

**Find Distance**

For this epic, we plan to allow the user to choose to points on the map, and after the user selects two points, a line will be drawn connecting the two points as well as show the distance in miles.

**Find Places**

For this epic, we plan to fix the query because it does not check ID like match. We also plan to be able to select from the relevant places table and show markers on the map when you select a place.

**Build a Trip**

For this epic, we plan to allow a user to build a trip by naming it, selecting a starting point, and an unlimited number of destinations. We plan to show an itinerary where you can see the distance from the starting point to final destination. We also plan to allow the user to save the created trip and load it.

**Modify a Trip**

For this epic, we plan to allow users to modify a trip that they already created by choosing a new starting point, removing a destination from the trip, modifying the order of a planned trip, and adding notes about the trip.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *3* |
| Tasks |  *56*   | *39* | 
| Story Points |  *58*  | *54* | 

We as a team did not complete the amount of tasks and story points that we planned to. We did not get started on Sprint 2 until later on in the sprint and we plan to start right away for Sprint 3. Last sprint, we designated one team member for their own epic, and we plan to all work on the same epic as a team until it is completed for this sprint. We believe this will not only improve our communication, but also improve our clean code scores from last sprint because everyone needs to be able to understand it. We also have a new team member, and we think this will help us to get more tasks and story points completed.

## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| October 5, 2020 | *None* | *None* | *None* | 
| October 7, 2020 | *None* | *#152, #156, #164, #211, #300* | *None* | 
| October 9, 2020 | *#156, #300* | *#152, #164, #211*,#273, #284, #308| *#164, #152* | 
| October 12, 2020 | *#156, #300, #273, #284, #308* | *#152, #164, #211, #259, #270, #305*| *#164, #152* | 
| October 14, 2020 | *#156, #255, #300, #273, #284, #308, #259, #270, #305* | *#277, #250, #256, #164, #152, #211* | *#164, #152* | 
| October 16, 2020 | *#156, #166, #211, #250, #255, #256, #267, #276, #277, #284, #300, #273, #284, #308, #259, #270, #305* | * #164, #152, #339* | *#164, #152* | 
| October 19, 2020 | *#152, #156, #166, #211, #250, #255, #256, #259, #267, #276, #277, #284, #300, #273, #284, #308, #270, #305* | * #164, #358, #355, #356 | *#164*| 
| October 21, 2020 | *#152, #156, #166, #211, #250, #255, #256, #259, #265, #267, #270, #273,#276, #277, #284, #300, #305, #308, #355, #356, #359, #360, #363, #370, #373, #387* | *#164, #167, #358, #272* | *#164*| 
| October 22, 2020 | *#152, #156, #166, #211, #250, #255, #256, #259, #265, #267, #270, #273,#276, #277, #284, #300, #305, #308, #355, #356, #359, #360, #363, #370, #373, #387, #164, #167, #358, #272* | || 

## Review

### Epics done  
We have finished 3 Epics: V3 protocol, Find Places, Find Distance 
### Epics not done 
We did not finish 2 Epics: Build a Trip (we were really close) and Modify a trip. 
### What went well
We got better at coding for client-side compared to the last sprint where we only completed server-side tasks as a team. 
### Problems encountered and resolutions
A problem we encountered we couldn't figure out how to refactor our componets to be outside of atlas. As a resolution, we are going to be heavily focusing on refactoring atlas.js for the next sprint. 
## Retrospective

### What we changed this sprint
Were more productive earlier in the sprint compared to the last sprint where we had started late. We a got a new teammate who has been a great addition to the team. We collaborated more since most of the time we were working on the same file so it was crucial for us. We also created better tasks this time too. 
### What went well
We did a better job in creating tasks and in response we got a lot more work done as a team. 
### Potential improvements
We need to work on committing clean code and creating test cases for our code.
We also want not work on the same file as much anymore. 
### What we will change next time
Next time we will change the structure of our client-side files so that all the components in atlas.js have their own class/file. 
We will also be checking code climate after each PR to make sure there are no code smells or duplications before merging and if there is we will each go back and fix our issues. 

