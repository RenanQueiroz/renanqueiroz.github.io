//Set initial visibility of results (hidden when page is loaded)
window.onload = setResultVisibility();

//Add item to array by pressing enter on textbox
document.getElementById("val")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    //.keyCode is deprecated, but kept here for compatibility, since .key is not supported on all browsers
    if (event.key === 'Enter' || event.keyCode === 13) {
        document.getElementById("addItemBtn").click();
    }
});

//Declare variables to be used later
var valuesArr = [];
var max;
var min;
var avg;
var median;
var range;

//This variable keeps track of whether the individual delete buttons for the values are visible or not
var areDelBtnsVisible = false;

//Set visibility of div that contains results, invisible before calculations are done, visible after calculations are done
function setResultVisibility(){
    if(avg == null) {
        //avg is null, so no calculations have been done yet, hide results
        document.getElementById("resultsHeader").style.display = 'none';
        document.getElementById("results").style.display = 'none';
        document.getElementById("delBtns").style.visibility = 'hidden';
    }
    else {
        //avg is not null, calculations have been done, make results visible
        document.getElementById("resultsHeader").style.display = 'block';
        document.getElementById("results").style.display = 'block';
    }
}

//Makes individual delete buttons visible or invisible depending on the situation
function toggleDelBtnsVisibility(){
    if(areDelBtnsVisible) {
        //Individual delete buttons are visible, therefore hide them, and set areDelBtnsVisible to false
        document.getElementById("delBtns").style.visibility = 'hidden';
        areDelBtnsVisible = false;
        document.getElementById("clearAllBtn").style.visibility = 'hidden';
        document.getElementById("trashBtnSpan").innerHTML = "Delete Item";
        document.getElementById("trashBtnSpan").classList.remove("text-primary"); //remove blue color
        document.getElementById("trashBtnSpan").classList.add("text-danger"); //add red color
    }
    else {
        //Individual delete buttons are not visible, therefore show them, and set areDelBtnsVisible to true
        document.getElementById("delBtns").style.visibility = 'initial';
        areDelBtnsVisible = true;
        document.getElementById("clearAllBtn").style.visibility = 'initial';
        document.getElementById("trashBtnSpan").innerHTML = "Done";
        document.getElementById("trashBtnSpan").classList.remove("text-danger"); //remove red color
        document.getElementById("trashBtnSpan").classList.add("text-primary"); //add blue color
    }

}

//Adds an item to the array of values, then adds that item to the datatable so the user can see it, and then clears the input field
function addItem(){
    if(document.getElementById("val").value != ""){
        valuesArr.push(document.getElementById("val").value)

        updateVisualNums();

        //clear text box
        document.getElementById("val").value = "";
    }
    else{
        //Text box is empty
        alert("Please enter a value");
    }
}

//Clears all child nodes of a given parent
function clearChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//Clears all numbers from the page using clearChildNodes
function clearVisualNums(){
    clearChildNodes(numsDisplay);
    clearChildNodes(delBtns);
}

//Clears all numbers from the array, then call clearVisualNums to clear them from page
function clearAllArrNums(){
    valuesArr = [];
    clearVisualNums();
    toggleDelBtnsVisibility();
    document.getElementById("trashBtn").style.visibility = 'hidden';
}

//Deletes a specific item from the array and from the page given its index
function deleteItem(index){
    valuesArr.splice(index, 1);
    if(valuesArr.length == 0){
        clearAllArrNums();
    }
    else{
        updateVisualNums();
    }
}

//Updates the numbers shown on the page by clearing the page, and re-generating the elements. 
//Checks on whether the array is empty are to be done before calling this function.
function updateVisualNums(){
    //Clear numbers on page before re-generating
    clearVisualNums();

    //Repeat for each item in the array
    for(var i = 0; i < valuesArr.length; i++){
        var num = document.createElement("th"); //create th element to hold a number
        num.setAttribute('scope','col');
        num.innerHTML = valuesArr[i]; //set its value to match the item in the array at index i

        var numsDisplay = document.getElementById("numsDisplay");
        numsDisplay.appendChild(num); //add it to the list of numbers

        var delBtn = document.createElement("button"); //create a delete button for the previously created number
        delBtn.classList.add("btn");
        delBtn.classList.add("btn-danger"); //red color
        delBtn.classList.add("btn-sm");
        delBtn.classList.add("px-3");
        delBtn.value = i; // button will have its value set to i so it matches the index of the number it will trigger the deletion of
        delBtn.onclick = function() {deleteItem(this.value);}; // when clicked, the button will call deleteItem passing the index of the corresponding number in the array

        //create an X icon to be put inside the delete button
        var delIcn = document.createElement("i");
        delIcn.classList.add("fas");
        delIcn.classList.add("fa-times");
        delBtn.appendChild(delIcn);

        //th that holds the delete button
        var btnTh = document.createElement("th");
        btnTh.appendChild(delBtn);

        //delBtns sits right under numsDisplay
        delBtns = document.getElementById("delBtns");
        delBtns.appendChild(btnTh);

        //Make "Delete Item" button visible since we just added at least 1 item, so the array is definitely not empty anymore
        document.getElementById("trashBtn").style.visibility = 'initial';
    }
}

//performs the maximum, minimum, average, median, and range calculations, and updates the proper text fields with the results
function calculate(){
    if(valuesArr.length <= 1){
        alert("A minimum of 2 inputs is required");
    }
    else{
        var sortedValues = valuesArr;

        sortedValues.sort(function(a, b) {
            return a - b;
        });

        //maximum (Since the array is sorted, last item is maximum)
        max = sortedValues[sortedValues.length - 1];

        //minimum (Since the array is sorted, first item is minimum)
        min = sortedValues[0];

        //average calculation
        avg = 0;
        var total = 0;
        for (var i = 0; i < sortedValues.length; i++) {
            total += parseFloat(sortedValues[i]);
        }
        avg = total / sortedValues.length;

        //median calculation
        median = 0;
        var middle = sortedValues.length / 2;
        if (sortedValues.length % 2 != 0){
            median = sortedValues[Math.floor(middle)];
        }
        else {
            median = (parseFloat(sortedValues[middle-1]) + parseFloat(sortedValues[middle])) / 2;
        }

        //range
        range = sortedValues[sortedValues.length - 1] - sortedValues[0];

        document.getElementById("max").innerHTML = max;
        document.getElementById("min").innerHTML = min;
        document.getElementById("avg").innerHTML = avg;
        document.getElementById("median").innerHTML = median;
        document.getElementById("range").innerHTML = range;

        setResultVisibility();
    }
}