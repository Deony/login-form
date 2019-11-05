This is Login Application that was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The authorization will be successful if the user enters correct username and password. After that user will be redirected to the Main page, otherwise - there will appear error message.

Also there is implemented Remember me functionality. If the checkbox 'Remember me' will be checked, the user account is saved in the browser during the expiration time.

To run the application it's necessary to type:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

In the console log we have the following error:
Access to fetch at http://authapi/api/oauth/token from origin http://localhost:3000 has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
 If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled
 
 We can fix this error by adding headers on the server to bootstrap/app.php file:
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: *');
  header('Access-Control-Allow-Headers: *');

