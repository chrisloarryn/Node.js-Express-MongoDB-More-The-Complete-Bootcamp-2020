// functions to save and read data from system
const fs = require('fs');
const http = require('http');
const url = require('url');
// const url = require('url');

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// const hello = 'hello'
// console.log(textIn)
// const textOut = `this is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt', textOut)
// console.log('synchronous File written')

// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log('ERROR! xx')
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2)
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3)

//             fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, `utf-8`, err => {
//                 console.log('Your file has been written :D')
//             })
//         }, {})
//     }, {})
// }, {})

// console.log('Will read file!')

////////////////////////////
// Server

////////////////
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
    // res.writeHead(200, {
    //     'Content-type': 'application/json'
    // });
    // res.end(data);


const server = http.createServer((req, res) => {
    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview') {
        res.end('this is the OVERVIEW')
    } else if (pathName === '/product') {
        res.end('this is the PRODUCT')
    }else if(pathName === '/api'){
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
    }else{
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        })
        res.end('<h1>Page not found!</h1>')
    }
    //res.end('hello from the server')
});

server.listen(8000, '127.0.0.1', () => {
    console.log('listening to requests on port 8000');
})