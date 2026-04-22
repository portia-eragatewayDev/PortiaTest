import express, {Request, Response} from "express"; // Import the Express framework
require("dotenv").config(); //load envirometal variable frrom the .env file 
const cors= require("cors") //import the CORS middleware 
const app=express(); // create an appliation instance

app.use(cors()) //enable CORS for all routes

const PORT = process.env.PORT || 8000 // set the server's port 
app.use (express.json()); // parse incoming Json request and make the data availble in the request body 

app.listen(PORT, ()=> {
    // start the server and listien to the specific port

    console.log(`Server is running on http://localhost:${PORT}`);
});

// Create an API
app.get ("/customers", async (req: Request, res:Response)=> {
    const customers=[
       {name:"Portia", email: "portia@eragateway.com"}, {name:"Sethu", email:"sethu@eragateway.com"}
    ];

return res.status(200).json(customers);
});




 