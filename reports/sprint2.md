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
| Tasks |  *43*   | *27* | 
| Story Points |  *45*  | *22* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| September 14, 2020 | *None* | *None* | *None*  | 
| September 16, 2020 | *None* | *#141,#142,#140,#139* | *None*  | 
| September 18, 2020 | *None* | *#141,#142,#140,#139,#186* | *None*  | 
| September 21, 2020 | *#142,#141* | *#139,#140,#157,#158* | *None*  | 
| September 23, 2020 | *#140,#141,#142,#157,#158,#191,#194* | *#162,#197,#57,#139* | *None*  | 
| September 25, 2020 | *#57, #139, #140, #141, #142, #144,#151, #153,#157, #158, #162,#163, #165, #191, #194, #197,#205* | *#210, #164, #145, #212* | *NA*  | 

| September 28, 2020 | *NA* | *NA* | *NA*  | 
| September 30, 2020 | *NA* | *NA* | *NA*  | 

## Review

### Epics done  

### Epics not done 

### What went well

### Problems encountered and resolutions


## Retrospective

### What we changed this sprint

### What went well

### Potential improvements

### What we will change next time
