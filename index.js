const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
const shell = require('shelljs');
var fs = require('fs')
var key;

clear();

console.log('');
console.log('');

console.log(
    chalk.yellow(
    figlet.textSync('SocketCLI', {font: "Standard", horizontalLayout: 'full'})
    )
);

inquirer.prompt([
    {
        name: 'inicio',
        type: 'input',
        message: 'Ingresa el nombre del proyecto'
    }
]).then(answer => {
    console.log(answer);
    shell.exec('mkdir '+ answer.inicio)
    var json = JSON.parse('{ "name": "'+answer.inicio+'",'+
        '"version": "1.0.0",'+
        '"description": "Cliente y servidor",'+
        '"main": "index.js",'+
        '"scripts": {'+
        '  "start": "node servidor.js",'+
         ' "test": ""'+
       ' },'+
        '"author": "'+answer.inicio+'",'+
        '"license": "MIT",'+
        '"dependencies": {'+
        '  "express": "~4.16.4",'+
        '  "http": "0.0.0",'+
        '  "net": "~1.0.2",'+
        '  "os": "^0.1.1",' +
        '  "socket.io": "~2.2.0",'+
        '  "socket.io-client": "^2.2.0",'+
        '  "node-notifier": "^5.4.0"'+
        '},'+
        '"engines": {'+
        '  "node": "6.11.0"'+
        '}'+
      '}')
    var data = JSON.stringify(json)
    fs.writeFile(answer.inicio+"/package.json",data, (err)=>{

    if (err) throw err
    
    
    fs.writeFile(answer.inicio+"/client.html",'<!DOCTYPE html>\n'+
    '<html lang="en">\n'+
        '<head>\n'+
            '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">\n'+
            '<meta http-equiv="X-UA-Compatible" content="ie=edge">\n'+       
            '<title>Servidor</title>\n'+    
        '</head>\n'+    
        '<body>\n'+
            '<div style=""> <center>\n'+
                '<div class="centrar">\n'+
                    '<p style="color:black">Ingresa aquí tu nombre</p>\n'+
                    '<input placeholder="BBCITAAAAA" style="width:600px" class="form-control" aria-describedby="basic-addon1" id="m"/>\n'+
                    '<br>\n'+
                    '<button id="btn" type="button" class="btn btn-success" onclick="myFunction()" onkeypress="enter()">Enviar mensaje</button>\n'+
                '</div></center>\n'+
            '</div>\n'+
        '</body>\n'+
    '</html>\n'+
    
    '<script src="/socket.io/socket.io.js"></script>\n'+
    '<script src="https://code.jquery.com/jquery-1.11.1.js"></script>\n'+    
    '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">\n'+
    
    '<script>\n'+
        'var socket = io();\n'+

        'function myFunction() {\n'+
            'console.log($("#m").val());\n'+
            'socket.emit("datos", $("#m").val())\n'+
            'console.log("test")\n'+
            '$("#m").val("");\n'+
        '}\n'+

        'document.onkeypress = function enter(e){\n'+
            'tecla = (document.all) ? e.keyCode : e.which;\n'+
            'if (tecla == 13){\n'+
            'document.getElementById("btn").onclick();\n'+
        '}}\n'+
    '</script>', (err)=>{

        if (err) throw err
    
    })
    
    fs.writeFile(answer.inicio+"/server.js",'const notifier= require("node-notifier")\n'+
    'const path = require("path")//# \n'+
    'var express = require("express")\n'+
    'var aplicacion = express()\n'+
    'const os = require("os");\n'+
    'const net = require("net");\n'+
    'const server = require("http").Server(aplicacion)\n'+
    'const socket = require("socket.io")(server)\n'+
    'var interface = os.networkInterfaces();\n'+
    'var ipDinamic;\n'+
    'for(var k in interface){\n'+
        'for(var k2 in interface[k]){\n'+
            'var address = interface[k][k2]\n'+
            'if(address.family == "IPv4" && !address.internal ){\n'+
                'ipDinamic = address.address.toString();\n'+
                'console.log(ipDinamic + ":4000");\n'+
            '}\n'+
        '}\n'+
    '}\n'+
    
    'var temp = 0;\n'+
    
    'aplicacion.get("/", function(req, res){\n'+
        'res.sendFile(__dirname + "/client.html");\n'+
      '});\n'+
    
    'var HOST = ipDinamic;\n'+
    'var PORT = server.listen(process.env.PORT || 4000);\n'+
    
    'var ser = socket.on("connection",function(so){\n'+
    
        'so.on("datos", function (data) {\n'+
            'notifier.notify("Hola "+data+ " Bienvenido a tu servidor de node")\n'+
            
        '})\n'+
    '})', (err)=>{

        if (err) throw err
    
      console.log("save")
    
    })

   shell.cd(answer.inicio)
   shell.exec('npm install')

})

});