
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCNPYky19U9DI4RRI7PEtBEFyzotM9zafw",
  authDomain: "train-scheduler-daa4a.firebaseapp.com",
  databaseURL: "https://train-scheduler-daa4a.firebaseio.com",
  projectId: "train-scheduler-daa4a",
  storageBucket: "train-scheduler-daa4a.appspot.com",
  messagingSenderId: "154928842323"
};
firebase.initializeApp(config);

const trainInfo = firebase.database();

//button click to add train//   
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  //allow user input//
  let trainName = $("#train-name-input").val().trim();
  let destination = $("#destination-input").val().trim();
  let firstTrain = $("#first-train-input").val().trim();
  let frequency = $("#frequency-input").val().trim();


  //create an object for the new train data//
  let newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };
  //push new train info to firebase
  trainInfo.ref().push(newTrain);


  //is it working?//
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  alert("You added a new train!");
  console.log(alert);
  //clear the form//
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");

});

trainInfo.ref().on("child_added", function (cSnapshot) {
  console.log(cSnapshot.val());

  let tName =  cSnapshot.val(name);
  let tDestination = cSnapshot.val(destination);
  let tFirstTrain = cSnapshot.val(FirstTrain);
  let tFrequency = cSnapshot.val(Frequency);

  let arrivalTime = tFirstTrain.split(":");
  let trainScheduledTime = moment().hours(arrivalTime[0].minutes(arrivalTime[1]));
  let maxMoment = moment.max(moment(), trainScheduledTime);
  let nextTrainArrival;
  let minutesToArrival;
  
  if(maxMoment === trainScheduledTime) {
    nextTrainArrival = trainScheduledTime.format("hh:mm A");
    minutesToArrival = trainScheduledTime.diff(moment(), "minutes");
  } else {
    let differenceTimes = moment().diff(trainScheduledTime, "minutes");
    let tRemainder = differenceTimes % tFrequency;
    minutesToArrival = tFrequencey - tRemainder;
    nextTrainArrival = moment().add(minutesToArrival, "m").format("hh:mm A");
  }
  console.log("minutesToArrival", minutesToArrival);  
  console.log("nextTrainArrival", nextTrainArrival);

  let newTrain = $("<tr>").append(
   
      $("<td>").text(tName),
      $("<td>").text(tDestination),
      $("<td>").text(tFrequency),
      $("<td>").text(nextTrainArrival),
      $("<td>").text(minutesToArrival)
    

  );
    
  $("#train-table > tbody").append(newTrain);
});





