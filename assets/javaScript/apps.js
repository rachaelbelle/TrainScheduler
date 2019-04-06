var config = {
  apiKey: "AIzaSyDltmXOFxT1KcmncJOTq0_cM8qOWUy-f14",
  authDomain: "trainscheduler-df161.firebaseapp.com",
  databaseURL: "https://trainscheduler-df161.firebaseio.com",
  projectId: "trainscheduler-df161",
  storageBucket: "",
  messagingSenderId: "888855714940"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submitBtn").on("click", function(event) {
  event.preventDefault();
    var trainName = $("#trainNameData").val().trim();
    var trainDest = $("#destData").val().trim();
    var trainFreq = $("#freqData").val().trim();
    var trainTime = moment($("#trainTimeData").val().trim(), "HH:mm").format("X");
    console.log("clicked")


    var newTrain = {
      name: trainName,
      dest: trainDest,
      freq: trainFreq,
      time: trainTime,
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.time);
    console.log(newTrain.freq);

    $("#trainNameData").val("");
    $("#destData").val("");
    $("#freqData").val("");
    $("#trainTimeData").val("");
    //$("minutesInputData").val("");
  });


  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainFreq = childSnapshot.val().freq;
    var trainTime = childSnapshot.val().time;

    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);

    var trainTimePretty = moment.unix(trainTime).format("HH:mm A");

    var nextArrival = moment().diff(moment(trainTime, "X"), "minutes");
    console.log(nextArrival)

    var minutesAway = nextArrival * trainFreq;

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainTimePretty),
      $("<td>").text(nextArrival),
      $("<td>").text(trainFreq),
    );

    // Append the new row to the table
    $("#trainList > tbody").append(newRow);
  });
