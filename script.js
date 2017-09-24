function Person(age, gender, health, status){
  this.id = Id++;
  this.age = age;
  this.gender = gender;
  this.health = health;
  this.status = status;
  this.sum = function(){
    var sum = 0;
    // Age
    var value = (-0.00000015 * Math.pow(this.age, 4))
      + (0.00002 * Math.pow(this.age, 3))
      - (0.00051 * Math.pow(this.age, 2))
      - 0.06 * this.age + 5;
    if(value < 1)
      value = 1;
    sum += value;
    // Gender: 1 = male, 2 = female (default)
    if(this.gender === 1){
      sum += 0;
    } else{
      sum += 0;
    }
    // Health: 1 = healthy, 2 = neutral, 3 = unhealthy (default)
    if(this.health === 1){
      sum += 0.3;
    } else if(this.health === 2){
      sum += 0;
    } else {
      sum += -0.3;
    }
    // Status: 1 = rich, 2 = neutral, 3 = poor (default)
    if(this.status === 1){
      sum += 0;
    } else if(this.status === 2){
      sum += 0;
    } else {
      sum += 0;
    }
    sum += 2;
    return sum;
  };
};

var Id=0;
var laneA = [], laneB = [], car = [];

function addPerson(position){
  var age = parseInt(document.getElementById('age').value);
  if(age < 0)
    age = 0;
  var gender = document.getElementById('gender').value;
  var health = parseInt(document.getElementById('health').value);
  var status = parseInt(document.getElementById('status').value);
  // Position: 1 = laneA, 2 = laneB, 3 = car (default)
  if(position === 1){
    laneA.push(new Person(age, gender, health, status));
  } else if(position === 2){
    laneB.push(new Person(age, gender, health, status));
  } else {
    car.push(new Person(age, gender, health, status));
  }
  displayPeople();
};

function chooseLane(){
  var totalA = 0, totalB = 0, totalCar = 0;
  // 0 = Normal, 1 = Obstructed, 2 = Red, 3 = Green
  var statusA = document.getElementById("laneAStatus").value;
  var statusB = document.getElementById("laneBStatus").value;
  for(var i = 0; i < laneA.length;i++){
    totalA += laneA[i].sum();
  }
  if (statusA == 2){
      totalA *= 0.7;
  } else if (statusA == 3) {
    totalA *= 1.2;
  }
  for(var i = 0; i < laneB.length;i++){
    totalB += laneB[i].sum();
  }
  if (statusB == 2){
      totalB *= 0.7;
  }else if (statusB == 3) {
    totalB *= 1.2;
  }
  for(var i = 0; i < car.length;i++){
    totalCar += car[i].sum();
  }

  // Score Checking
  if (statusA == 1) { // A is blocked
    totalCar *=0.7;
    if (statusB == 1){ // A and B is blocked
      displayResult("Crashed A");
    } else if (totalCar > totalB){    // only A is blocked and car has higher score
      displayResult("Ran over Lane B");
    } else {                          // B has higher score
      displayResult("Crashed Lane A");
    }
  } else if (statusB == 1) { // B is blocked
    if (totalCar >= totalA){  // Car has higher score
      displayResult("Ran over Lane A");
    } else {                 // A has higher score
      displayResult("Crashed Lane B");
    }
  } else {                  // both lanes open
    totalB *= 1.1;
    if (totalA > totalB) {  // A has higher score
      displayResult("Ran over Lane B");
    } else {                // B has higher score
      displayResult("Ran over Lane A");
    }
  }
  console.log("Lane A:  " + totalA);
  console.log("Lane B:  " + totalB);
  console.log("Car:     " + totalCar);
};
function toColor(numb){
  switch (numb) {
    case "0":
      return "#AAAAAA";
      break;
    case "1":
      return "#333";
      break;
    case "2":
      return "#CC0000";
      break;
    case "3":
      return "#00AA00";
      break;
    default:
      return "#AAAAAA";

  }
}
function deleteitem(id, listNr){
  var listChoice = [laneA, laneB, car];
  for(var i=0; i < listChoice[listNr].length; i++){
    if (listChoice[listNr][i].id == id){
      listChoice[listNr].splice(i, 1);
      break;
    }
  }
  displayPeople();
}
function displayResult(string){
  window.alert(string);
}


function displayPeople(){

  HTML = "<div class='table'><h2>Lane A</h2><table id='tableA' border='1'><thead><tr><th>ID</th><th>Age</th><th>Gender</th><th></th></thead><tbody>"
  for(i=0; i<laneA.length; i++) {
    HTML+="<tr><td>"+laneA[i].id+"</td><td>"+laneA[i].age+"</td><td>"+laneA[i].gender+"</td><td><button onclick='deleteitem("+laneA[i].id+",0)'>delete</button></td></tr>"
  }
  HTML += "</tbody></table></div>"

  HTML += "<div class='table'><h2>Lane B</h2><table id='tableB' class='table' border='1'><thead><tr><th>ID</th><th>Age</th><th>Gender</th><th></th></thead><tbody>"
  for(i=0; i<laneB.length; i++) {
    HTML+="<tr><td>"+laneB[i].id+"</td><td>"+laneB[i].age+"</td><td>"+laneB[i].gender+"</td><td><button onclick='deleteitem("+laneB[i].id+",1)'>delete</button></td></tr>"
  }
  HTML += "</tbody></table></div>"

  HTML += "<div class='table'><h2>Car</h2><table id='tableCar' class='table' border='1'><thead><tr><th>ID</th><th>Age</th><th>Gender</th><th></th></thead><tbody>"
  for(i=0; i<car.length; i++) {
    HTML+="<tr><td>"+car[i].id+"</td><td>"+car[i].age+"</td><td>"+car[i].gender+"</td><td><button onclick='deleteitem("+car[i].id+",2)'>delete</button></td></tr>"
  }
  HTML += "</tbody></table></div>"
  document.getElementById("displayPeople").innerHTML = HTML
  var color = toColor(document.getElementById("laneAStatus").value);
  document.getElementById('tableA').style="background-color:"+color+";"
  color = toColor(document.getElementById("laneBStatus").value);
  document.getElementById('tableB').style="background-color:"+color+";"
  document.getElementById('tableCar').style="background-color:#AAAAAA;"
}
window.onload = function(){
  displayPeople();
}
