const { WebSocketServer } = require('ws')
const wss = new WebSocketServer({ port: 8080 })
const pty = require('node-pty')

const ptyProc = pty.spawn('bash', [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
})

wss.on('connection', function connection(ws) {
  console.log('connection')
  ws.on('message', function message(data) {
    console.log(data.toString())
  })

  ptyProc.on('data', function(data) {
    ws.send(data)
  })

  ws.send('something');
})
