# Inspection Checklist for t16

The goal of an Inspection is to file defects.
This checklist is our guide to help us look for defects.
The checklist will be updated as we identify new faults in our code that we wish to prevent in future inspections.


### Data faults
* Are all program variables initialized before their values are used?
* Have all constants been named?
* Should the upper bound of arrays be equal to the size of the array or size-1?
* If character strings are used, is a delimiter explicitly assigned?
* Is there any possibility of a buffer overflow?
* Do all program variables exist in the smallest scope possible?
* Is there any code for debugging?

### Control faults
* For each conditional statement, is the condition correct?
* Is each loop certain to terminate?
* Are compound statements correctly bracketed?
* In case statements, are all possible cases accounted for?
* If a break is required after each case in case statements, has it been included?
* Are we returning the result immediately after obtaining the desired return result?
* 

### Parameter faults
* Are all input variables used?
* Are values assigned to all output variables before they are output?
* Can unexpected inputs cause corruption?
* Does the variable has a meaningful name?
* Has the variable been defined by a correct type?

### Interface faults
* Do all functions and methods have the correct number of parameters?
* Do formal and actual parameter types match?
* Are the parameters in the right order?
* Do all components use a consistent model for shared memory structure?


### Storage faults
* If a linked structure is modified, have all links been correctly diagnosed?
* If dynamic storage is used, has space been allocated correctly?
* Is space explicitly deallocated after it is no longer required?

### Exception faults
* Have all possible error conditions been considered?
* Are exceptions and errors handled and logged properly?

### Style
* Are method variables defined close to the code where they’re used or at the start of the method?
* Do the constant/variable/class names conform to standards? (Constants should be all capital letters with underscores, variables should be camel case, the first letter should be capitalized for class names.)

### Testing
* Is there a test for this code?
* Does the test code test a good subset of cases? 
* Does the test code also testing for the corner cases?

### Readability and Maintainability 
* Do the names (of fields, variables, parameters, methods and classes) actually reflect the thing they represent?
* Can I understand what the code does by reading it?
* Can I understand what the tests do?
* Are the exception error messages understandable?
