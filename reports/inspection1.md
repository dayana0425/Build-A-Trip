# Inspection - Team *T16* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *FindDatabase.java, RequestFind.java, ReuqestDistance.java, RequestTrip.java* |
| Meeting | *October 14, 2020, 4:00PM , Teams* |
| Checklist | *t16/reports/checklist.md* |

### Roles

| Name | Preparation Time |
| ----- | ----- |
| xinyi | 45min |
| Daiana Bilbao | 20 min |
| rloptien | 35min |

### Problems found

| File:line | problem | hi/med/low | who found | github#  |
| ----- | ----- |----- | ----- | ----- |
| FindDatabase.java 131-150| no test case for getURL  | med | xinyi | --- |
| FindDatabase.java 152-155 & 163 | no test case for if it doesn't have a specific limit | med | xinyi | --- |
| FindDatabase.java 174-181 | no test case for the getRandomMatch()| med | xinyi | --- |
| RequestFind.java constructor| should we add a new constructor of the limit is specific but match is not? | hi | xinyi| --- |
| RequestDistance.java | Get rid of unused imported java classes and/or packages | low | Daiana | --- |
| RequestDistance.java | Handle exceptions for null or empty string using try/catch block and logger when using ParseDouble | med | Daiana | --- |
| RequestDistance.java | check that return value of calculate() is not null before assigning it to distance var in buildResponse() | med | Daiana | --- |
| FindDatabase.java : 42 | DB_PASSWORD shouldn't equal null. | low | rloptien | |
| FindDatabase.java : 174-181 | No testing for getRandomMatch() | med | rloptien | |
| RequestFind.java : 10-11 | limit and found should be initialized before used. | low | rloptien | |
| RequestFind.java : 74-85 | No testing for checkforNonAlphaNum(). | med | rloptien | |
