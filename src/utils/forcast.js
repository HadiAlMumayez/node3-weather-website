request = require('request')


const forcast = (long,lat,callback)=>{


const url = 'https://api.darksky.net/forecast/8c21e7c8251491084bd37512f9f5fb99/'+ encodeURIComponent(long) +','+ encodeURIComponent(lat)+'?units=si'

request({url, json: true},(error,{body}={}) =>{
    const data = body
    if (error) {
        callback('unable to connect ',undefined)
    } else if(data.error){
       callback('false location',undefined)
    }
    else{
    callback(undefined,
        // summary:data.daily.data[0].summary,
        // temperature: data.currently.temperature,
        // precipProbability:data.currently.precipProbability
    (data.daily.data[0].summary+' It is currently '+data.currently.temperature+' degrees out. This high today is '+data.daily.data[0].temperatureHigh +', And Low '+data.daily.data[0].temperatureLow +' There is a '+data.currently.precipProbability+'% chance of rain.'))
    
}
})
}

module.exports= forcast



