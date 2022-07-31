const Discord = require('discord.js')
const client = new Discord.Client()
require('dotenv').config()
const token = process.env.TOKEN
const fs = require('fs')
const prefix = '#'

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)
}

client.on('ready', () => {
    console.log('This client is online')
})

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot ){
        return
    }

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    switch(command){
        case 'ping':
            client.commands.get('ping').execute(message, args)
            break;
        case 'upcoming':
            client.commands.get('upcoming').execute(message, args, Discord)
            break;
        case 'recent':
            client.commands.get('recent').execute(message, args, Discord)
            break;
        case 'subscribe':
            client.commands.get('subscribe').execute(message, args, Discord)
            break;
        default:
            message.channel.send('Please use the #help command for more details')
            
    }
})

client.login(token)