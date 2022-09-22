const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = 'red';  
ctx.fillRect(20, 20, 150,100);

ctx.strokeStyle= "blue";
ctx.strokeRect(100, 200, 150, 100);
ctx.beginPath();

ctx.clearRect(25, 25, 140, 90);