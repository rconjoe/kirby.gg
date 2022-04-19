const { WebSocketServer } = require('ws')
const wss = new WebSocketServer({ port: 3001 })
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
