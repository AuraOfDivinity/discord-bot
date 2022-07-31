const axios = require('axios').default

module.exports = {
    name: 'subscribe',
    description: 'Allows the user to subscribe for upcoming hackathon notifications',
    async execute(message, args, Discord) {
        
        if(!args[0]){
            return message.channel.send('The subscribe command must contain a valid phone number. Example:- #Subscribe +94768332333')
        }

        let phone_number = args[0]
        if(phone_number.length != 12){
            return message.channel.send('The entered phone number is invalid. It must contain 10 digits including the country code Example:- #Subscribe +94768332333')
        }

        let user_data = { number: phone_number }
        const get_all_users = await axios.get(`${process.env.BASE_URL}/users/all`)
        let fetched_user_data = get_all_users.data.data
        let number_list = []

        fetched_user_data.forEach(user_data => {
            number_list.push(user_data.phone_number)
        });

        if(number_list.includes(phone_number)){
            return message.channel.send('This number is already subscribed for the service.')
        }

        const response = await axios.post(`${process.env.BASE_URL}/users/subscribe`, user_data)

        if(response.data.status){
            return message.channel.send('You have successfully subscribed for future hackathon notifications.')
        }
    }
}
