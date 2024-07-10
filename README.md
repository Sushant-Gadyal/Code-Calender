# Code-Calender

Diffculties Came Across While Building and Learnings

1> No use of CORS -> I was not able to fetch data from backend because of not using CORS
Cross-Origin Resource Sharing (CORS) policy. When making requests to a different origin (domain, protocol, or port) than your frontend application, the server needs to explicitly allow these requests.

const cors = require('cors');
app.use(cors());

2> Use of findOne()-> find() gives array of documents which satisfies specific codition , but findOne gives only one document of it

3> In forms to make auto-suggestions off do autocomplete="off"

4> When using ternary operator in Navbar there were two components to be shown , so we can't use return inside jsx 
    we have to make that component with ( and write our code in it).