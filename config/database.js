const mongoose= require('mongoose');


mongoose.connect(process.env.MONGO_URL,{ //Parameteres to the connection request
    useNewUrlParser: true,
    useUnifiedTopology: true
},(error)=>{
 if(error) throw error //result of the connection, if not success, return error

 console.log("Connected to Database!!!");//else connect to database
});