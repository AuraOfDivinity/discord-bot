module.exports = {
    name: 'help',
    description: 'Help command explaining the commands',
    execute(message, args, Discord) {

        let random_hex_code = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
        const newEmbed = new Discord.MessageEmbed()
        newEmbed.setColor(random_hex_code)
        .setTitle("FrankieBot Help")
        .setDescription('FrankieBot is a simple discord bot that allows you to keep track of all the MLH related hackathons.')
        .addFields(
            {name: 'Recent', value: "Fetch n number of recent hackathons. Ex- #recent 2" },
            {name: 'Upcoming', value: "Fetch n number of upcoming hackathons. Ex- #upcoming 3" },
            {name: 'Subscribe', value: "Subscribe for future hackathon notifications(SMS). Ex- #subscribe +94775475525"},
            {name: 'Ping', value: "Ping the server Ex- #help" },
            {name: 'Help', value: "Display all the commands and their uses. Ex- #help" },
        )

        message.channel.send(newEmbed);
    }
}