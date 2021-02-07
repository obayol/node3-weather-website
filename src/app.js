const path = require('path')
const express = require('express')
const hbs = require('hbs')
// const geocode = require('./utils/geocode')
// const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
 
// Set up handlebars 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Oğulcan Bayol'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Oğulcan Bayol'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is helpful text',
        title: 'Help',
        name: 'Oğulcan Bayol',
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help 404',
        errorMessage: 'Help article not found',
        name: 'Oğulcan Bayol'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
             error: 'Address must be provided'
        })
    }
    
    res.send({
        message: 'This is the generic'
    })
})  

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Oğulcan Bayol'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})