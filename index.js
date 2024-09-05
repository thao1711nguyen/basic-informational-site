const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
function getFileData(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf-8')
        return data
    } catch(err) {
        console.log(err)
    }
}
const app = http.createServer((req,res) => {
    const parsedUrl = url.parse(req.url, true)
    let filePath
    console.log(parsedUrl)
    if (parsedUrl.pathname == '/about' || parsedUrl.pathname == '/contact-me') {
        filePath = path.join(__dirname, `${parsedUrl.pathname}.html`)
    } else if (parsedUrl.pathname == '/') {
        filePath = path.join(__dirname, 'index.html')
    } else {
        filePath = path.join(__dirname, '404.html')
    }
    const data = getFileData(filePath)
    res.end(data)
})

app.listen(8080)