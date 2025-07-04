require('dotenv').config()
const request = require('request')
const chalk = require('chalk')
const readline = require('readline')

const API_KEY = process.env.WEATHER_KEY;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(chalk.magenta('Enter city name: '), (city) => {
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`;
    request(url, (error, response, body) => {
        if(error){
            console.log(chalk.red('Unable to connect to weather service.'));
        }else{
            const data = JSON.parse(body);
            if(data.error){
                console.log(chalk.red(`Error: ${data.error.message}`));
            }else{
                console.log(chalk.magenta(`City: ${chalk.green(data.location.name)}`));
                console.log(chalk.magenta(`Temp: ${chalk.green(data.current.temp_c, "°C")}`));
                console.log(chalk.magenta(`Condition: ${chalk.green(data.current.condition.text)}`));
            }
        }
        rl.close();
    });
});