const express=require('express');
const app=express();
const https=require('https');
const bodyParser=require('body-parser');
require('dotenv').config();

// console.log(process.env)
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/",(req,res)=>{
    const cityName=req.body.cityName
    const apikey=process.env.API_KEY;
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apikey+"&units="+units
    https.get(url,(response)=>{
        console.log(response)
        console.log(response.statusCode)
        response.on('data',(data)=>{
            // console.log(data)
            const weatherData=JSON.parse(data);
            console.log(weatherData);
            const temp=weatherData.main.temp;
            console.log(temp);
            const desc=weatherData.weather[0].description;
            console.log(desc);
            const city=weatherData.name;
            console.log(city);
            const icon=weatherData.weather[0].icon;
            const iconURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write('<h1>The temperature in '+city+' is '+temp+"&#176;C</h1>");
            res.write("<h3>Weather Description : "+desc+"</h3>");
            res.write("<img src="+iconURL+">");
            res.send();
        })
    })
    // res.send("Server is up and running.")

})

// app.get("/",(req,res)=>{
//     const url="https://api.openweathermap.org/data/2.5/weather?q=Hyderabad&appid=x&units=metric"
//     https.get(url,(response)=>{
//         console.log(response)
//         console.log(response.statusCode)
//         response.on('data',(data)=>{
//             // console.log(data)
//             const weatherData=JSON.parse(data);
//             console.log(weatherData);
//             const temp=weatherData.main.temp;
//             console.log(temp);
//             const desc=weatherData.weather[0].description;
//             console.log(desc);
//             const city=weatherData.name;
//             console.log(city);
//             const icon=weatherData.weather[0].icon;
//             const iconURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
//             res.write('<h1>The temperature in '+city+' is '+temp);
//             res.write("<h3>Weather Description : "+desc+"</h3>");
//             res.write("<img src="+iconURL+">");
//             res.send();
//         })
//     })
//     // res.send("Server is up and running.")
// })






app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})
