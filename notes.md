we need the funcitonality:

one 'form': name input, amount input, add button
button creates paylad from amount and name, and dispatches it as an action (object?)
This object pushes the values to the array of payer objects
This array is displayed below the counter immediately (like todo list)


splut trimmedpayers into two arrays: people who are owed money, and people who owe

sort object array of who's owed by amount owed, highest first. 

All people in ower array pay share to person owed most
that person pays surplus to next person in owed array 
etc until 

could refactor to make it so that bool prop isOwed is added to objects after cal? 

clear all 

pull out all toggle buttons into a toggle reducer?


calculateOwers(owersObj, owedObj, share){
for each person, adds new properties:
    pays: owed[0]
  
}

Change 'amount' property to e.g. already paid