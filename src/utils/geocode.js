const request =require('request')
const geocode = (address, callback) => {
    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/l"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiaGFkaWhtIiwiYSI6ImNrN3hydjN6ajAwZTIzcHNlZXpsMnoyOTYifQ.n2TUDhu_8-pDmOlQnfXlCQ&limit=1"
    request({url , json: true},(error,{body}={})=>{
        if(error ){
            callback('unable to connect to location seveice!', undefined)
        }else if(body.features.length===0){
            callback('unable to find a location plz research',undefined)
        }
        else{
            callback(undefined,{
                long:body.features[0].center[1],
                lat:body.features[0].center[0],
                location:body.features[0].place_name
                
            })
        }
    }
    )
}

module.exports = geocode