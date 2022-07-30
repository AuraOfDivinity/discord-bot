const axios = require('axios').default

module.exports = {
    name: 'recent',
    description: 'Fetches and displays the recently held events',
    async execute(message, args, Discord) {
        const response = await axios.get(`${process.env.BASE_URL}/events/past`)
        let events_array = response.data.data

        let embed_array_recent = []
        
        let count = parseInt(args[0])
        for(let i = 0; i < count; i++){
            let event = events_array[i]

            let random_hex_code = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

            const new_embed_recent = new Discord.MessageEmbed()
            new_embed_recent.setColor(random_hex_code)
            .setTitle(event.name)
            .addFields(
                {name: 'City', value: event.city, inline:true },
                {name: 'State', value: event.state, inline: true },
                {name: 'Date', value: event.date },
                {name: 'Note', value: event.hybrid_notes }
            )
            .setImage(event.image_url)
            .setURL(event.event_link)

            embed_array_recent.push(new_embed_recent)
        }

        message.channel.createWebhook('Recent Events', message.author.displayAvatarURL)
            .then(w => w.send({embeds: embed_array_recent}));
    }
}