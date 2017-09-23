function Person(age, gender, health, status){
  this.age = age;
  this.gender = gender;
  this.health = health;
  this.status = status;
  this.sum = function(){
    var sum = 0;
    // Age
    var value = Math.round((-0.00000015 * Math.pow(this.age, 4))
      + (0.00002 * Math.pow(this.age, 3))
      - (0.00051 * Math.pow(this.age, 2))
      - 0.06 * this.age + 5);
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
    return sum;
  };
};

var laneA = [], laneB = [], car = [];

function addPerson(position){
  var age = parseInt(document.getElementById('age').value);
  if(age < 0)
    age = 0;
  var gender = parseInt(document.getElementById('gender').value);
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
};

function chooseLane(){
  var totalA = 0, totalB = 0, totalCar = 0;
  for(var i = 0; i < laneA.length;i++){
    totalA += laneA[i].sum();
  }
  for(var i = 0; i < laneB.length;i++){
    totalB += laneB[i].sum();
  }
  for(var i = 0; i < car.length;i++){
    totalCar += car[i].sum();
  }
  console.log(totalA);
  console.log(totalB);
  console.log(totalCar);
};
