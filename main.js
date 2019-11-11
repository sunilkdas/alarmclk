function setAlarm() {
    var hours = document.getElementById("HH").value;
    var minutes = document.getElementById("MM").value;
    if (Number(hours) < 0 || Number(hours) > 23 || Number(minutes) < 0 || Number(minutes) > 59) {
        alert("Please Check the time");
    } else {
        document.getElementById("HH").disabled = "disabled";
        document.getElementById("MM").disabled = "disabled";

        var date = new Date();
        var date1 = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);
        var differencesInMillis = date.getTime() - date1.getTime();
        setTheTimeOutvalueAs(differencesInMillis);
    }

}

function editAlarm() {
    document.getElementById("HH").removeAttribute("disabled");
    document.getElementById("MM").removeAttribute("disabled");
    stop();
}

function setTheTimeOutvalueAs(differencesInMillis) {
    if (typeof(Worker) !== "undefined") {
        setTimeout(function() {
            beep();
            setTimeout(function() {

                var answer = window.confirm("Do you want to Stop it?")
                if (answer)
                    stop();
                else
                    beep();
            }, 1000);
        }, differencesInMillis);
    } else {
        // Sorry! No Web Worker support..
    }
}
var x = document.createElement("AUDIO");
x.id = "audioAlarm";
x.src = "beep.wav";
// browsers limit the number of concurrent audio contexts, so you better re-use'em
function initAlarm() {

    document.getElementById("body").appendChild(x);

    x.loop = true;
}

function beep() {
    document.getElementById("audioAlarm").play();
}

function stop() {
    document.getElementById("audioAlarm").pause();
}