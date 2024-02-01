// var form = document.createElement("form");
// form.setAttribute("method", "post");
// form.setAttribute("action", "https://www.zohoapis.in/crm/v2/Contacts");

// // Create input fields
// var fields = ["First Name", "Last Name", "Company Name", "Work Email", "Contact Number", "Mode of Shipment", "Countries You Ship1", "Monthly Shipment", "Customer Type", "Where Did You Hear About Us"];
// fields.forEach(function(field) {
//     var input = document.createElement("input");
//     input.setAttribute("type", "text");
//     input.setAttribute("name", field.toLowerCase().replace(/ /g, "_"));
//     input.setAttribute("placeholder", field);
//     form.appendChild(input);
// });

// // Create checkbox
// var checkbox = document.createElement("input");
// checkbox.setAttribute("type", "checkbox");
// checkbox.setAttribute("name", "agree_to_terms");
// var label = document.createElement("label");
// label.innerHTML = "I agree to the Zindus terms of use and acknowledge its privacy statements";
// form.appendChild(checkbox);
// form.appendChild(label);

// // Create signup button
// var button = document.createElement("button");
// button.setAttribute("type", "submit");
// button.innerHTML = "Sign Up";
// form.appendChild(button);

// // Append form to body
// document.body.appendChild(form);



// // Add event listener for form submission
// form.addEventListener("submit", async function(event) {
//     event.preventDefault();

//     // Get form data
//     var formData = new FormData(form);

//     // Convert form data to JSON
//     var jsonData = {
//         "data": [{
//              "First_Name":"Jhon1",
//   "Last_Name": "clarke",
//   "company_name": "ABC Company",
//   "work_email": "john.wick@example.com",
//   "contact_number": 123456789,
//   "mode_of_shipment": "Air",
//   "countries_you_ship": "United States",
//   "monthly_shipment": "100",
//   "customer_type": "New Customer",
//   "where_did_you_hear": "Online Advertisement",
  
//   "agree_to_terms": true}],
//         "trigger": ["approval", "workflow", "blueprint"]
//     };


// /*
//     https://accounts.zoho.in/oauth/v2/auth?
//     client_id=1000.C9SR5DVBHK15AIJRO4ZCAVHID9HR2E&
//     response_type=token&
//     scope=ZohoCRM.modules.ALL&
//     redirect_uri=https://www.google.com/
//     */

//     /*presales-support@zohocorp.com*/

    
    
//     // Make API request to Zoho CRM Contacts module
//   fetch("https://www.zohoapis.in/crm/v2/Contacts" , {
//         method: "POST",
//         headers: {
//             "Authorization": "Bearer 1000.9345db04277c0366a722a49f9d7e1780.cceeab57699a80f56763c425abd2040f",
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(jsonData),
//     }).then(function(response) {
//         return response.json();
//     }).then(function(data) {
//         console.log(data);
//     }).catch(function(error) {
//         console.error(error);
//     });
// });




// tokenRenewal.js

// Function to extract access token from URL hash
function extractAccessToken(url) {
    return new URL(url).hash.split('&').find(param => param.startsWith('access_token=')).split('=')[1];
}

// Function to renew access token using the silent refresh iframe
function renewAccessToken() {
    const iframe = document.getElementById('silent-refresh');
    const authUrl = 'https://accounts.zoho.in/oauth/v2/auth' +
        '?client_id=1000.C9SR5DVBHK15AIJRO4ZCAVHID9HR2E' +
        '&response_type=token' +
        '&scope=ZohoCRM.modules.ALL' +
        '&redirect_uri=https://www.google.com/';

    iframe.src = authUrl;

    // When the iframe loads the redirect URI, extract the access token
    iframe.onload = function () {
        const accessToken = extractAccessToken(iframe.contentWindow.location.href);

        // Use the access token in API requests
        makeApiRequest(accessToken);
    };
}

// Function to make API request using the obtained access token
function makeApiRequest(accessToken) {
    // Original form creation and submission logic
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "https://www.zohoapis.in/crm/v2/Contacts");

    var fields = ["First Name", "Last Name", "Company Name", "Work Email", "Contact Number", "Mode of Shipment", "Countries You Ship", "Monthly Shipment", "Customer Type", "Where Did You Hear About Us"];
    fields.forEach(function (field) {
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name", field.toLowerCase().replace(/ /g, "_"));
        input.setAttribute("placeholder", field);
        form.appendChild(input);
    });

    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "agree_to_terms");
    var label = document.createElement("label");
    label.innerHTML = "I agree to the Zindus terms of use and acknowledge its privacy statements";
    form.appendChild(checkbox);
    form.appendChild(label);

    var button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.innerHTML = "Sign Up";
    form.appendChild(button);

    document.body.appendChild(form);

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        var formData = new FormData(form);

        var jsonData = {
            "data": [{
                "First_Name": "Jhon1",
                "Last_Name": "clarke",
                "company_name": "ABC Company",
                "work_email": "john.wick@example.com",
                "contact_number": 123456789,
                "mode_of_shipment": "Air",
                "countries_you_ship": "United States",
                "monthly_shipment": "100",
                "customer_type": "New Customer",
                "where_did_you_hear": "Online Advertisement",
                "agree_to_terms": true
            }],
            "trigger": ["approval", "workflow", "blueprint"]
        };

        fetch("https://www.zohoapis.in/crm/v2/Contacts", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
        }).catch(function (error) {
            console.error(error);
        });
    });
}

// Initial token renewal
renewAccessToken();

// Set up a timer or other triggers to renew the token periodically
// For example, renew the token every 30 minutes
setInterval(renewAccessToken, 30 * 60 * 1000);






// // // form.addEventListener("submit", async function (event) {
// // //     event.preventDefault();

// // //     // Get form data
// // //     var formData = new FormData(form);

// // //     // Convert form data to JSON
// // //     var jsonData = {
// // //         "data": [{
// // //             "First_Name": "Jhon1",
// // //             "Last_Name": "clarke",
// // //             "company_name": "ABC Company",
// // //             "work_email": "john.wick@example.com",
// // //             "contact_number": 123456789,
// // //             "mode_of_shipment": "Air",
// // //             "countries_you_ship": "United States",
// // //             "monthly_shipment": "100",
// // //             "customer_type": "New Customer",
// // //             "where_did_you_hear": "Online Advertisement",
// // //             "agree_to_terms": true
// // //         }],
// // //         "trigger": ["approval", "workflow", "blueprint"]
// // //     };

// // //     // Request Zoho CRM access token
// // //     var accessToken = await getZohoAccessToken();

// // //     // Make API request to Zoho CRM Contacts module with the obtained access token
// // //     fetch("https://www.zohoapis.in/crm/v2/Contacts", {
// // //         method: "POST",
// // //         headers: {
// // //             "Authorization": "Bearer " + accessToken,
// // //             "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify(jsonData),
// // //     }).then(function (response) {
// // //         return response.json();
// // //     }).then(function (data) {
// // //         console.log(data);
// // //     }).catch(function (error) {
// // //         console.error(error);
// // //     });
// // // });

// // // async function getZohoAccessToken() {
// // //     var authUrl = "https://accounts.zoho.in/oauth/v2/auth";
// // //     var clientId = "1000.C9SR5DVBHK15AIJRO4ZCAVHID9HR2E";
// // //     var responseType = "token";
// // //     var scope = "ZohoCRM.modules.ALL";
// // //     var redirectUri = "https://www.google.com/";

// // //     // Construct the authorization URL
// // //     var authorizationUrl = `${authUrl}?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}`;

// // //     // Open the authorization URL in the current window
// // //     window.location.href = authorizationUrl;

// // //     return new Promise((resolve, reject) => {
// // //         // Listen for changes in the location URL
// // //         var checkInterval = setInterval(function () {
// // //             if (window.location.hash.includes("access_token")) {
// // //                 clearInterval(checkInterval);
// // //                 var accessToken = extractAccessTokenFromUrl(window.location.hash);
// // //                 history.replaceState({}, document.title, window.location.pathname + window.location.search);
// // //                 resolve(accessToken);
// // //             }
// // //         }, 100);
// // //     });
// // // }

// // // // Function to extract access token from URL
// // // function extractAccessTokenFromUrl(url) {
// // //     var matches = url.match(/access_token=([^&]+)/);
// // //     return matches ? matches[1] : null;
// // // }
