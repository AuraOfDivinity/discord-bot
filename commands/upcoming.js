const axios = require('axios').default

module.exports = {
    name: 'upcoming',
    description: 'Fetches and displays the upcoming events',
    async execute(message, args, Discord) {
        const response = await axios.get(`${process.env.BASE_URL}/events/upcoming`)
        let events_array = response.data.data


        let embed_array = []
        
        let count = parseInt(args[0])
        for(let i = 0; i < count; i++){
            let event = events_array[i]

            let random_hex_code = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

            const newEmbed = new Discord.MessageEmbed()
            newEmbed.setColor(random_hex_code)
            .setTitle(event.name)
            .addFields(
                {name: 'City', value: event.city, inline:true },
                {name: 'State', value: event.state, inline: true },
                {name: 'Date', value: event.date },
                {name: 'Note', value: event.hybrid_notes }
            )
            .setImage(event.image_url)
            .setURL(event.event_link)

            embed_array.push(newEmbed)
        }

        let webhooks = await message.channel.fetchWebhooks()
        for (let [id, webhook] of webhooks) await webhook.delete(`Requested by ${message.author.tag}`);

        message.channel.createWebhook('Frankie Bot', message.author.displayAvatarURL)
            .then(w => w.send({embeds: embed_array}));

        
    }
}