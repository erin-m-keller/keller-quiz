/**
 * @createRowsAndCells
 * returns the table body with rows and cells appended
 */
function createRowsAndCells(arr) {
    // initialize the variables
    var tblBody = document.createElement('tbody');
    // iterate through the high scores and create table row/cells
    for (var i = 0; i < arr.length; i++) {
        // initialize the variables
        var tblRow = document.createElement('tr');
        // create two table cells
        for (var j = 0; j <= 2; j++) {
            // initialize the variables
            var tblCell1 = document.createElement('td'),
                tblCell2 = document.createElement('td');
            // append the initials and the score to the table cells
            tblCell1.appendChild(document.createTextNode(arr[i].name));
            tblCell2.appendChild(document.createTextNode(arr[i].score + "/100"));
        }
        // append the cells to the table row
        tblRow.appendChild(tblCell1);
        tblRow.appendChild(tblCell2);
        // append the row to the table body
        tblBody.appendChild(tblRow);
    }
    // return the table body
    return tblBody;
}
/**
 * @createHeader
 * returns the table header with rows and cells appended
 */
function createHeader() {
    // initialize variables
    var tblHead = document.createElement('thead'),
        tblHeadRow = document.createElement('tr');
    // create two table cells
    for (var i = 0; i <= 2; i++) {
        // initialize the variables
        var tblCell1 = document.createElement('td'),
            tblCell2 = document.createElement('td');
        // append text to the table cells
        tblCell1.appendChild(document.createTextNode("Initials"));
        tblCell2.appendChild(document.createTextNode("Score"));
    }
    // append the table cells to the row
    tblHeadRow.appendChild(tblCell1);
    tblHeadRow.appendChild(tblCell2);
    // add a class to the table header
    tblHead.className = "table-dark";
    // append the header row to the table
    tblHead.appendChild(tblHeadRow);
    // return the table header
    return tblHead;
}
/**
 * @sortData
 * returns the array in descending order
 */
function sortData(arr) {
    if (arr) {
        // sort array with highest values at the top
        arr.sort(function(a, b) {
            return parseFloat(b.score) - parseFloat(a.score);
        });
    }
    // return array
    return arr;
}
/**
 * @createTable
 * creates the table(s)
 */
function createTable(arr,tblType) {
    // initialize variables
    var newTbl = null,
        tblBody = createRowsAndCells(arr),
        tblHead = createHeader();
    // assign newTble based on tblType variable
    if (tblType === "html") {
        // table
        newTbl = document.getElementById("html-tbl");
    } else if (tblType === "css") {
        // table
        newTbl = document.getElementById("css-tbl");
    } else if (tblType === "js") {
        // table
        newTbl = document.getElementById("js-tbl");
    }
    // append the table contents to the specified table on the page
    newTbl.appendChild(tblHead);
    newTbl.appendChild(tblBody);
}
/**
 * @init
 * runs on page load
 */
function init() {
    // initialize variables
    var htmlHighScores = sortData(JSON.parse(localStorage.getItem("HtmlQuizHighScores"))),
        cssHighScores = sortData(JSON.parse(localStorage.getItem("CssQuizHighScores"))),
        jsHighScores = sortData(JSON.parse(localStorage.getItem("JsQuizHighScores")));
    // create the html, css and js tables for the highscore page
    if (htmlHighScores) {
        createTable(htmlHighScores,"html");
    }
    if (cssHighScores) {
        createTable(cssHighScores,"css");
    }
    if (jsHighScores) {
        createTable(jsHighScores,"js");
    }
}
init();