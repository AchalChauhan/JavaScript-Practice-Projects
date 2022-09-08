// initilize the count as 0
// listen for clicks on the increment button
// increment the count variable when the button is clicked
// change the count-el in the HTML to reflect the new count

let countEl = document.getElementById("count-el");
let count = 0;
function increment(){
    count++;
    countEl.textContent = count;
}
// grab the save-el paragraph and store it in a variable called saveEl
// create a variable that contains both the count and the dash seprator, i.e. "12 - "
// Render the variable in the saveEl using innerText
// NB: make sure to not delete the existing content of the paragraph

let saveEl = document.getElementById("save-el");

function save(){
    let saveCount = count + " - ";
    saveEl.textContent += saveCount;  
    count = 0;  
    countEl.textContent = count;
}