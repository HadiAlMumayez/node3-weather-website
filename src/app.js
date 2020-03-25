const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode =require('./utils/geocode')
const forcast = require('./utils/forcast')

const app =express()
const port =process.env.PORT || 3000

//Define paths to express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))

//routes

app.get('',(req,res)=>{
    res.render('index',{
        title: 'weather app',
        name: 'hadi '
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me!',
        name:"Hadi AlMumayez"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help!',
        name: "Hadi"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide address term'
        })
    }
    geocode(req.query.address,(error,{long,lat,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forcast(long,lat,(error,forcast)=>{
            if (error)
            {
                return res.send({
                    error
                })
            }
            res.send({
                location: location,
                forecast: forcast
            })
        })
    })
   
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{errorMessage: "Help article not found",name: "Hadi"})
})

app.get('*',(req,res)=>{
    res.render("404",{errorMessage: 'Page not found',name : "Hadi"})
})

app.listen(port,()=>{
    console.log('server is up on port '+ port)
})