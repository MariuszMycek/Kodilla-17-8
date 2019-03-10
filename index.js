var http = require("http");
var fs = require("fs");
var path = require("path");

var server = http.createServer();

server.on("request", function(request, response) {
  /* 
  Function fileStream(streamedFileDirectory, mediaType, encoding) is used to stream files on request. 
  parameters: 
  streamedFileDirectory - path to DIRECTORY where is stored file which we want to send;
  mediaType - proper media type for response header: Content-Type;
  encoding - file encoding.
  */
  function fileStream(streamedFileDirectory, mediaType, encoding) {
    var filePath = path.join(streamedFileDirectory, request.url);
    var fileStream = fs.createReadStream(filePath, encoding);
    response.writeHead(200, { "Content-Type": mediaType });
    fileStream.pipe(response);
  }

  if (request.method === "GET" && request.url === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile("./index.html", "utf-8", function(err, data) {
      response.end(data);
    });
  } else if (request.url.match(".css$")) {
    fileStream("./css", "text/css", "utf-8");
  } else if (request.method === "GET" && request.url.match(".jpg$")) {
    fileStream("./img", "image/jpg");
  } else if (request.url.match(".js$")) {
    fileStream("./js", "text/javascript", "utf-8");
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
