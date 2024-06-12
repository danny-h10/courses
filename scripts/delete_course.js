"use strict"

window.onload = () => {

    console.log("yurrrr details")




    const urlParams = new URLSearchParams(location.search);

    console.log(urlParams.get("courseid"))

    if(urlParams.has("courseid")){

        //if we have courseid display its details
        displayCourseDetails(urlParams.get("courseid"))

        const deleteCourseButton = document.querySelector("#deleteCourseButton")

        deleteCourseButton.addEventListener("click", (event)=> deleteAComment(event, urlParams.get("courseid")))

    }else{
        //let them know we didnt have a valid course id and send them back to courses
        alert("no valid course id");
        window.location.href = "./index.html";
    }
}

const deleteAComment = async (event, courseId) => {

    event.preventDefault();

    //try catch for error handling
    try {

        //make a fetch (DELETE) request to remove a comment in the API
        let response = await fetch("http://localhost:8081/api/courses/" + courseId,
            {
                method: "DELETE"
            }
        );

        if (response.ok){
            window.location.href = "./index.html"
        }

    } catch (err) {

        //what the hell happend
        console.log("something went south", err)

    }

}




async function displayCourseDetails(courseId){

    //get the course details
    let courseDetails = await getCourseDetails(courseId);

   console.log(courseDetails)

   //get the div where we want to put the details for the course
   let courseDetailsDiv = document.querySelector("#courseDetails")

   //JSON stringify the output 
   courseDetailsDiv.innerHTML = `
    <div>courseId: ${courseDetails.id}</div>
    <div>courseName: ${courseDetails.courseName}</div>
    <div>instructor: ${courseDetails.instructor}</div>
    <div>numDays: ${courseDetails.numDays}</div>
   `
}

async function getCourseDetails(courseId){

    try{

    //use fetch to get the details for the specific course
    let response = await fetch("http://localhost:8081/api/courses/" + courseId)

    //deal with the response
    let data = await response.json();

    return data


}catch(err) {
    console.log(err);
    throw new Error(err)
}

}
