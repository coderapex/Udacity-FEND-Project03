// open weather map credentials
const key = "b539721fbe83ef2ee8116ed5b2e3f4c8";
const baseString = "http://api.openweathermap.org/data/2.5/weather?zip=";

// - Your API key is b539721fbe83ef2ee8116ed5b2e3f4c8
// - Please, use the endpoint api.openweathermap.org for your API calls
// - Example : api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=b539721fbe83ef2ee8116ed5b2e3f4c8

// Useful links:
// - API documentation https://openweathermap.org/api

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// processResult() will get the values entered in the fields
// get the results of the weather from the API call
// save the result on the project end point
// and finally update the project UI
function processResult(e) {
  //   console.log("Submit Button clicked");

  const zip = document.getElementById("zip").value;
  const userResponse = document.getElementById("feelings").value;

  getWeatherData(baseString, zip, key, userResponse).then(function(data) {
    updateWeatherData(data);
  });
}

// Function to GET Web API Data
const getWeatherData = async (baseString, zip, key, userResponse) => {
  const response = await fetch(
    baseString + zip + "&appid=" + key + "&units=metric"
  );
  try {
    let data = await response.json();
    data.userResponse = userResponse;
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// function to update the received data on site
function updateWeatherData(data) {
  let date = new Date(data.dt * 1000);
  let date_str =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  // post call to add data to endpoint
  postData("/add", {
    temperature: data.main.temp,
    date: date_str,
    userResponse: data.userResponse
  });
  updateUI("/all");
}

// Function to POST data to endpoint
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  });

  try {
    const postData = await response.json();
    return postData;
  } catch (er) {
    console.log("error", er);
  }
};

// Function to GET latest project data and update the HTML
const updateUI = async (url = "") => {
  const request = await fetch(url);
  try {
    const savedData = await request.json();

    // creating HTML fragment of latest entry
    // create date element
    let elDate = document.createElement("div");
    elDate.id = "date";
    elDate.innerHTML = savedData[0].date;

    // create temperature element
    let elTemp = document.createElement("div");
    elTemp.id = "temp";
    elTemp.innerHTML = savedData[0].temperature;

    // create userResponse element
    let elUserResp = document.createElement("div");
    elUserResp.id = "content";
    elUserResp.innerHTML = savedData[0].userResponse;

    // creating document fragment with latest journal entry
    let fragment = document.createDocumentFragment();

    // add all created elements to the fragment
    fragment.appendChild(elDate);
    fragment.appendChild(elTemp);
    fragment.appendChild(elUserResp);

    // replacing the element in HTML
    let entryHolder = document.getElementById("entryHolder");
    entryHolder.innerHTML = "";
    entryHolder.appendChild(fragment);
  } catch (er) {
    console.log("error", er);
  }
};

// adding event listener to processResult on clicking submit button
const submitButton = document.getElementById("generate");
submitButton.addEventListener("click", processResult);
