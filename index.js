var http = require("http");
var fs = require("fs");
var path = require("path");

var server = http.createServer();
server.on("request", function(request, response) {
  if (request.method === "GET" && request.url === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile("./index.html", "utf-8", function(err, data) {
      response.end(data);
    });
  } else if (request.url.match(".css$")) {
    var cssPath = path.join("./css", request.url);
    var fileStream = fs.createReadStream(cssPath, "utf-8");
    response.writeHead(200, { "Content-Type": "text/css" });
    fileStream.pipe(response);
  } else if (request.method === "GET" && request.url.match(".jpg$")) {
    var imagePath = path.join("./img", request.url);
    var fileStream = fs.createReadStream(imagePath);
    response.writeHead(200, { "Content-Type": "image/jpg" });
    fileStream.pipe(response);
  } else if (request.url.match(".js$")) {
    var jsPath = path.join("./js", request.url);
    var fileStream = fs.createReadStream(jsPath, "utf-8");
    response.writeHead(200, { "Content-Type": "text/javascript" });
    fileStream.pipe(response);
  } else {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.statusCode = 404;
    fs.readFile("./error404.html", "utf-8", function(err, data) {
      response.end(data);
    });
  }
});

server.listen(9000);
console.log("Server running...");
