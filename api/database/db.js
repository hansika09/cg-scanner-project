const mongoose = require("mongoose");

const DB = "mongodb+srv://hansika:khushi2000@scanner-cg.ydo74p3.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log("Connection Successful");
}).catch((err) => {
    console.log(err.message);
});