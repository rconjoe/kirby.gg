const https = require('https')
const fs = require('fs')
const server = https.createServer({
  cert: fs.readFileSync("./fixtures/certificate.pem"),
  key: fs.readFileSync("./fixtures/key.pem")
})
const { WebSocketServer, WebSocket } = require('ws')
const wss = new WebSocketServer({ server })
const pty = require('node-pty')
const path = require('path')

wss.on('connection', function connection(ws) {
  console.log('connected')
  const ptyProc = pty.spawn('bash', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: path.join(process.env.HOME, 'kirby.gg', 'bot'),
    env: process.env
  })

  ws.on('message', function message(data) {
    ptyProc.write(data)
  })

  ptyProc.on('data', function(data) {
    ws.send(data)
  })

})

server.listen(function listening() {
  const ws = new WebSocket(`wss://localhost:${server.address().port}`, {
    rejectUnauthorized: false
  });

  ws.on('open', function open() {
    ws.send('All glory to WebSockets!');
  });
})
