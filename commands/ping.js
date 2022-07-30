module.exports = {
    name: 'ping',
    description: 'Simple ping command',
    execute(message, args) {
        message.channel.send('pong!')
    }
}