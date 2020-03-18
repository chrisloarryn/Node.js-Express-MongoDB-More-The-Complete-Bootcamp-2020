// functions to save and read data from system
import { readFileSync } from 'fs';
import { createServer } from 'http';
import url from 'url';
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

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENT%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;

};
const tempOverview = readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
//console.log(dataObj)
// res.writeHead(200, {
//     'Content-type': 'application/json'
// });
// res.end(data);


const server = createServer((req, res) => {
    const pathName = req.url;

    // Overview page
    if (pathName === '/' || pathName === '/overview') {

        res.writeHead(200, { 'Content-type': 'text/html' });
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output)

        // Product page
    } else if (pathName === '/product') {
        res.end('this is the PRODUCT')

        // API
    } else if (pathName === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data);

        // Not found
    } else {
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