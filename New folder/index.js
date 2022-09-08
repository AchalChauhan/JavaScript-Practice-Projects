let num1 = 8;
document.getElementById("num1-el").textContent = num1;
let num2 = 2;
document.getElementById("num2-el").textContent = num2;
let ans;
let sum = document.getElementById("sum-el")
function add(){
    ans = num1 + num2;
    sum.textContent = "Sum: " + ans;
}
function sub(){
    ans = num1 - num2;
    sum.textContent = "Diffrence: " + ans;
}
function multiply(){
    ans = num1 * num2;
    
    sum.textContent = "Product: " + ans;
}
function divide(){
    ans = num1 / num2;
    
    sum.textContent = "Quesent: " + ans;
}