import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { WebSocketServer as ws } from "ws"; 
import { Reg } from './Reg.js';

export const httpServer = http.createServer(function (req, res) {
    const __dirname = path.resolve(path.dirname(''));
    const file_path = __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
    fs.readFile(file_path, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
});

const wss = new ws({ port: 3000 });

wss.on('connection', function connection(ws) {
    console.log('WebSocket connection!');
    const clients = [];
    const games = [];

    ws.on('message', function incoming(messageString) {
        console.log('Client message:', JSON.parse(messageString));
        const message = JSON.parse(messageString);
        switch (message.type) {
            case 'reg':
                var answer = Reg(clients, message);
                console.log('Answer:', answer);
                ws.send(JSON.stringify(answer));
                break;
            case 'update_winners':
                answer = UpdateWinners(clients);
                console.log('Answer:', answer);
                ws.send(JSON.stringify(answer));
                break;
            case 'crete_room':
                answer = CreateRoom(rooms, clients);
        }
    });
  
    // Отправка сообщения обратно клиенту
    ws.send('Привет, клиент!');
  });
  