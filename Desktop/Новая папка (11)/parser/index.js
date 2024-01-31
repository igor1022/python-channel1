const axios = require('axios');

/*const get_data = async() => {
    const result = await axios.get('https://t.me/PARCUSCARGO/434427');
    console.log(result.data);
}
get_data();*/

const TelegramChat = require('telegram-chat-parser')
 
  // configure options (optional)
  const options:ChatOptions = {
    includeStickersAsEmoji: true,
  };
 
  // Load chat
  const json = fs.readFileSync('./tests/data/saved.json', { encoding: 'utf8', flag: 'r' });
  const chat = new TelegramChat(json, options);
 
  // Get all messages
  const allMessages = chat.messages;