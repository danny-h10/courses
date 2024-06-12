"use strict"

window.onload = ()=>{
    console.log("yuuuurrrrrr")

        populateTable();

}

async function populateTable(){

    //get the courses from the api
    let courses = await getCourses()

    //get a hold of the table body where the data is going to go
    let tbody = document.querySelector("#courseTableBody")

    //loop over all the courses and work with a single course 
    courses.forEach((course) =>{
        //call a function to build a row
        //pass it where the row goes
        //pass it what goes in the row(data/course)
        buildRow(tbody, course)

})
}

function buildRow(someTableBody, someData){

    let row = someTableBody.insertRow();

    let departmentCell = row.insertCell();
    departmentCell.innerHTML = someData.dept

    let courseNumberCell = row.insertCell();
    courseNumberCell.innerHTML = someData.courseNum

    let courseNameCell = row.insertCell();
    courseNameCell.innerHTML = someData.courseName

    let courseDetails = row.insertCell();
    courseDetails.innerHTML = `<a href="./details.html?courseid=${someData.id}">Show Details</a>`

      let adminStuffCell = row.insertCell();
      adminStuffCell.innerHTML = `<a href="./delete_course.html?courseid=${someData.id}">Delete Course</a>`

}


async function getCourses(){

    try{
    //make the api call to get all the courses
    let response = await fetch("http://localhost:8081/api/courses")
    let courses = await response.json();

    return courses
    }catch(error){
        console.log(error)
        throw new Error(error)
    }

}