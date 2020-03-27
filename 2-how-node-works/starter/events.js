const EventEmitter = require('events')
const http = require('http')

class Sales extends EventEmitter {
    constructor() {
        super()
    }
}
const myEmitter = new EventEmitter()

myEmitter.on('newSale', () => {
    console.log('There was a new sale')
})

myEmitter.on('newOrder', () => {
    console.log('Costumer name: Cristobal')
})

myEmitter.on('newSale', stock => {
    console.log(`There are now ${stock} items left in stock.`)
})

myEmitter.emit('newSale', 9)
myEmitter.emit('newOrder')

////////////////////////////////////////////////////////////////

const server = http.createServer()

server.on('request', (req, res) => {
    console.log('Request received 🧟‍♀️!')
    res.end('Request received 🧟‍♀️!')
})

server.on('request', (req, res) => {
    console.log('Another request received 😧!')
    res.end('Another request received 😧!')
})

server.on('close', () => {
    console.log('Server closed 😠! F 4 u')
    console.log('Server closed 😠! F 4 u')
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Waiting for requests... 🐭')
})