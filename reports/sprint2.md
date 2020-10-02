# Sprint 2 - T16 - Team Hexadecimal

## Goal
### Show me the distance

## Sprint Leader: 
### Daiana Bilbao

## Definition of Done

* The version in `server/pom.xml` is `<version>2.0</version>`.
* The Product Increment release for `v2.0` created on GitHub.
* The team's web application is deployed on the production server (`black-bottle.cs.colostate.edu`).
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A or B.
* Minimize code smells and duplication.

### Test Driven Development
* Write tests before code.
* Unit tests are fully automated.

### Processes
* Master is never broken. 
* All pull request builds and tests for Master are successful on Travis-CI.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics
**v2 protocol** 

The goal for this Epic is to support version 2 of the protocol. 
We will add supportedRequests to config, the distance type, the find type and update the requestVersion to 2.
                                                               
**Where am I?**

In this epic we will create a feature that allows the user to know their current location and also add a feature that will allow the user to return to their current location if they deviate from that location.

**Find distance**

The goal for this epic is to find the distance. When the user choose two places, the distance and a line between these places will occur.

**Find places**

The goal for this Epic is for the user to be able to find places matching the name they provided. At the same time, 
the map will also display a shortlist of relevant places and allow selection of one.

**Where is?** 

The goal for this Epic is for the user to be able to see a specified location on the map using latitude and longitude. 
We'll add a feature for them to be able to paste a string containing latitude and longitude. We'll also create a validation feature that will validate their input to ensure there are no errors. 

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *2* |
| Tasks |  *38*   | *29* | 
| Story Points |  *50*  | *15* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| September 14, 2020 | *None* | *None* | *None*  | 
| September 16, 2020 | *None* | *#141,#142,#140,#139* | *None*  | 
| September 18, 2020 | *None* | *#141,#142,#140,#139,#186* | *None*  | 
| September 21, 2020 | *#142,#141* | *#139,#140,#157,#158* | *None*  | 
| September 23, 2020 | *#140,#141,#142,#157,#158,#191,#194* | *#162,#197,#57,#139* | *None*  | 
| September 25, 2020 | *#57,#139,#140,#141,#142,#144,#151,#153,#157,#158,#162,#163,#165,#191,#194,#197,#205* | *#210,#164,#145,#212* | *NA*  | 
| September 28, 2020 | *#57,#139,#140,#141,#142,#144,#151,#153,#15,#158,#162,#163,#165,#191,#194,#197,#205,#209,#210,#212,#213,#218,#221,#223,#227,#235,#240* | *#164,#167,#166,#211,#129,#156,#155,#152,#146* | *None*  | 
| September 30, 2020 | *#57,#139,#140,#141,#142,#144,#151,#153,#15,#158,#162,#163,#165,#191,#194,#197,#205,#209,#210,#212,#213,#218,#221,#223,#227,#235,#240* | *#164,#167,#166,#211,#129,#156,#155,#152,#146* | *None*  | 

## Review

### Epics done  
We have finished two Epics but we are really close to finishing the last 3. We finished v2 protocol and Where am I?
### Epics not done 
We have not finished Find Distance, Find Places, or Where Is? 
### What went well
We were working really hard as a team despite not getting through all the epics we had planned. As a team we feel like we have learned a lot. Our communication with eachother has been a lot better than the last sprint. 
### Problems encountered and resolutions
As a team we had a late start with the sprint because we were all really confused on our tasks. You can see from our burndown chart that in the beginning we had no tasks done. It is not because we were not doing work but because it was taking a long time for all of us to figure out our own tasks. 
## Retrospective

### What we changed this sprint
This sprint we have changed the way we communicate. We have met more frequently for this sprint which was nice.
### What went well
Because we met more frequently we were able to know what other teammates are working on and holding each other accountable. 
We have improved out cooperation.
### Potential improvements
We want to start earlier than we did this sprint. We will set up a set time that we meet Monday, Wednesday, and Friday so that we all know when we meet. On Monday's during our scrum meeting's we will each say what tasks we want to get done during the week (by Sunday) so that we can keep each other accountable.

### What we will change next time
Our meeting time will be Monday, Wednesday, and Friday at 4pm. 
We will begin to communicate more on the chat so that we all know what we're each doing. 
For this sprint, we were all kinda of in charge of an epic - for next sprint we want to work on each epic as a team. 