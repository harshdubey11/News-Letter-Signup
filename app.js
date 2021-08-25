const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var ffname = req.body.fname;
    var llname = req.body.lname;
    var eemail = req.body.email;
   // console.log(ffname);
   var data={

    members:[
        {
            email_address:eemail,
            status: "subscribed",
            merge_fields:{
                FNAME:ffname,
                LNAME:llname
            }
        }
    ]

};
var jsonData = JSON.stringify(data);
const url = "https://us5.api.mailchimp.com/3.0/lists/8e0235488d";

const options = {
    method:"POST",
    auth : "_harshdubey:6abad696a398bec642f0a9748dcff24f-us5"
};

const request = https.request(url,options,function(response){
response.on("data",function(data){
    console.log(JSON.parse(data));
});
if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
}
else{
    res.sendFile(__dirname+"/failure.html");
}
});
request.write(jsonData);
request.end();

});


app.post("/failure",function(req,res){
    res.redirect("/");
});


app.listen(process.env.PORT || 3000,function(){
    console.log("YES");
});


// 6abad696a398bec642f0a9748dcff24f-us5
//8e0235488d