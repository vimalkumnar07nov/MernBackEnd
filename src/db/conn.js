const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/registration", {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connection successful");
}).catch((error) => {
    console.log(`Not connected Error: ${error}`); // error handling code here...
})

// connect to MongoDB database on local machine
// , port 27017 by default
// and use the "test" collection as our schema/table name for this example
