var http = require('http')
var fs   = require('fs')
var path = require('path')
var port = 8080

pth = "C:/Users/USERNAME/Téléchargement/test/"

dir = fs.readdirSync(pth)

content = "<div id='compare' style='display:flex;'><table>"

for ( x of dir ){

	if( path.extname(x) == ".mp3" || path.extname(x) == ".m4a"  ){

	content += `<tr onclick="select(this)" ondrop="drop(event)" ondragover="allowDrop(event)" ><td draggable="true" ondragstart="drag(event)">${x}</td></tr>`

	}

}

content += "</table></div>"

var server = http.createServer(function (req, res){

	res.writeHead(200,{'content-type':'text/html'})

	fs.readFile('index.html', 'utf8', function(err, data){

		res.write(data)
		res.write(content)
		res.end()

	})

}).listen(port)

var io = require('C:/Users/USERNAME/AppData/Roaming/npm/node_modules/socket.io').listen(server)

io.on('connection', function (socket) {

	socket.on("refresh", function(e) {

		socket.emit("dir",fs.readdirSync(pth))
		
	})

	socket.on("message", function(e) {

    fs.renameSync(pth+e["drag_value"],pth+`${e["drop_id"]} ${e["drag_txt"]}`)
    fs.renameSync(pth+e["drop_value"],pth+`${e["drag_id"]} ${e["drop_txt"]}`)
				
	})
	
})

console.log(`Le contenu du fichier est afficher sur le port ${port}`)
