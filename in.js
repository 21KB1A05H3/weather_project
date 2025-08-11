const app=require("express")();
const mysql=require("mysql2");
const axios =require("axios");
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('wheather','root','root',
  {
    host:'localhost',
    dialect:'mysql'
  }
);

//connecting Database and check it connect or not
sequelize.authenticate() 
.then(()=>{
    console.log("DB connect sucessfully")
})

//we are recreating table details already existing table in the Mysql Database

const weather=sequelize.define('weather', {

    city: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    temperature: {
      type: DataTypes.FLOAT, 
      allowNull: false
    },
    humidity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pressure: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
})
sequelize.sync({force:true})
// This is the Route When the user req matches the Route It will call the callback



app.get("/:id",async (req,res)=>{ 
    const city=req.params.id;
    console.log(city)
    const apikey="d8e45550e1135cf41e90cab0b635b596";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apikey}`

try{
    //axios is used for raising a req
    const response = await axios.get(url);  
    const Temperature=response.data.main.temp;
    console.log(Temperature)
    const City=response.data.name;
    const Humidity=response.data.main.humidity;
    const Pressure=response.data.main.pressure;
    
     let whereClause = { city:City };
     //findAll() is used for retrive data matches the where condition
     const weatherRecords = await weather.findAll({  
      where: whereClause, 
      });
      // console.log( weatherRecords)
      if(weatherRecords==[]){
        res.send(`Temperature:${Temperature}
        Humidity:${Humidity}
        Pressure:${Pressure}
        city:${City}`)

        const Record = await weather.create({ // create is used for inserting values to the databse
        city: City,
        temperature: Temperature,
        humidity: Humidity,
        pressure: Pressure
        
      })
      console.log("if executed")
    }
      else if(City===weatherRecords[0].dataValues.city){
        res.send(`Temperature:${weatherRecords[0].dataValues.temperature}
        Humidity:${weatherRecords[0].dataValues.humidity}
        Pressure:${weatherRecords[0].dataValues.pressure}
        city:${weatherRecords[0].dataValues.city}`)
        console.log("else is executed")
        
      }
    
      }
catch(error){
    res.send(`Error:${error}`)
}
})


app.get('/weather/all', async (req, res) => {
  try {
    const allWeatherData = await weather.findAll();
    console.log(allWeatherData)
    res.json(allWeatherData); // Send all records as JSON
  } catch (error) {
    res.send(`Error retrieving data: ${error.message}`);
  }
});

app.listen(3000,()=>{ // listen is used for creating the server
    console.log("server connected sucessfully")

})

