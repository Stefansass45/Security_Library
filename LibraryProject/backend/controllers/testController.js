// we declare a bew asynchronous method called 'healthcheck', that returns 200 OK when callled
const healthcheck = async (req, res) => {
    console.log("Everything is ok:")
    // res.status() expects a http resonse code. in this case we use 200, which means OK
    // .json then expects data that we will pass back to the calling browser/application
    res.status(200).json({ message: "Everything is ok" })
    res.status(200).json({ status: "ok"})
}

const greeter = async (req, res)=>{
// we are going to get input from the response bosy
const userName = req.body.userName

//check if null
if(!userName){
    console.log("please enter something valid")
    res.status(418).json({error: "invalid or missing input"})
}
// if all is good, greet the user
res.status(200).json({Greeting: `Hello, ${userName}!`})
}

// by exporting out methods, we make them accessible in any other file that we call this file in
module.exports = {
    healthcheck,
    greeter
}