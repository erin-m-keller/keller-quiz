// run on page load
function init() {
    // initialize variables
    console.log(JSON.parse(localStorage.getItem("quizHighScores")));
    var highscoreTbl = document.getElementById("high-score-tbl"),
        currentHighScores = JSON.parse(localStorage.getItem("quizHighScores")),
        tblHead = document.createElement('thead'),
        tblHeadRow = document.createElement('tr'),
        tblBody = document.createElement('tbody');
    // sort array with highest values at the top
    currentHighScores.sort(function(a, b) {
        return parseFloat(b.score) - parseFloat(a.score);
    });
    // iterate through the high scores and create table row/cells to hold the data
    for (var i = 0; i < currentHighScores.length; i++) {
        var tblRow = document.createElement('tr');
        for (var j = 0; j <= 2; j++) {
        var tblCell1 = document.createElement('td'),
            tblCell2 = document.createElement('td');
        tblCell1.appendChild(document.createTextNode(currentHighScores[i].name));
        tblCell2.appendChild(document.createTextNode(currentHighScores[i].score + "/100"));
        }
        // append data to table body
        tblRow.appendChild(tblCell1);
        tblRow.appendChild(tblCell2);
        tblBody.appendChild(tblRow);
    }
    // create the table header
    for (var k = 0; k <= 2; k++) {
        var tblCell3 = document.createElement('td'),
            tblCell4 = document.createElement('td');
        tblCell3.appendChild(document.createTextNode("Initials"));
        tblCell4.appendChild(document.createTextNode("Score"));
    }
    // append the table head and body to the table
    tblHeadRow.appendChild(tblCell3);
    tblHeadRow.appendChild(tblCell4);
    tblHead.appendChild(tblHeadRow);
    highscoreTbl.appendChild(tblHead);
    highscoreTbl.appendChild(tblBody);
}
init();