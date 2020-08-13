// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();

/* Global Variables */

// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
const apiKey = '&appid=9587dd825880b491bf30f95eab2d333b';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
    // select the actul value of an HTML input to include in POST
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
/* getWeather Function */
getWeather(baseURL,newZip, apiKey)

    .then(function(data){
        postData('/addData',{date:newDate , temp:data.list[0].main.temp , content:feelings})
        updateUI()
})
}


/* Function to POST data */

const postData = async (url = '' , data = {}) =>{
   const response = await fetch (url , {
       method:"post",
       credentials:"same-origin",
       headers: {
           "Content-type" : "application/json",
       },
       body: JSON.stringify(data),
   });

   try {
       const newData = await response.json();
       console.log(newData);
       return newData;
   }catch(error) {
       console.log("error",error);
        // appropriately handle the error
   }
}

/* Function to GET Web API Data*/

const getWeather = async (baseURL, zip, key)=>{

  const res = await fetch(baseURL+zip+key)
  try {

    const data = await res.json();
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

/*UpdateUI */

const updateUI = async () => {
   const request = await fetch('/allData');
   try{
     const allData = await request.json();
     document.getElementById('date').innerHTML = allData[0].date;
     document.getElementById('temp').innerHTML = allData[0].temp+' '+'&#8457';
     document.getElementById('content').innerHTML = allData[0].content;
 
   }catch(error){
     console.log("error", error);
   }
 }


 
/* Hide the " Most Recent Entry " title function using visibility */
function myFunction() {
    document.getElementById("myDiv").style.visibility = "hidden";
  }