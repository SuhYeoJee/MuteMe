require('dotenv').config();
const axios = require('axios').default;

const applicationId = process.env.APP_ID;
const guildId = process.env.GUILD_ID;
const botToken = process.env.BOT_TOKEN;

const url = `https://discord.com/api/v10/applications/${applicationId}/commands`; // GLOBAL COMMANDS / Update the API version if needed
// const url = `https://discord.com/api/v10/applications/${applicationId}/guilds/${guildId}/commands`; // GUILDS COMMANDS / Update the API version if needed

const headers = {
  "Authorization": `Bot ${botToken}`,
  "Content-Type": "application/json",
};

// Define an array of command data objects
const commands = [
  {
    "name": "mm-ver",
    "type": 1,
    "description": "뮽미..버전이..몇이고",
  },
  {
    "name": "echo",
    "type": 1,
    "description": "왜내말따라흐는드.",
    "options": [
      {
        "name": "message",
        "description": "라고 말해볼까요",
        "type": 3, // String option type
        "required": true
      }
    ]
  },
  {
    "name": "hey",
    "type": 1,
    "description": "헤이뮽미에게 결정을 맡겨보세요.",
    "options": [
      {
        "name": "question",
        "description": "뮽미야 이거 물어볼까?",
        "type": 3, // String option type
        "required": true
      }
    ]
  },
  {
    "name": "mm",
    "type": 1,
    "description": "n분간 정신을 닫습니다: 기본 3분. ",
    "options": [
      {
        "name": "duration",
        "description": "침묵은 금이다. 더 많은 금.",
        "type": 4, // int option type
        "required": true
      }
    ]
  },  
  {
    "name": "devdev",
    "type": 1,
    "description": "개발개발자를 괴롭힙니다. 아무 기능이 없습니다.",
  }
];

// Loop through the commands array and register each command
commands.forEach((commandData) => {
  axios.post(url, JSON.stringify(commandData), {
    headers: headers,
  })
  .then((response) => {
    console.log(`Command "${commandData.name}" has been registered.`);
  })
  .catch((error) => {
    console.error(`Error registering the command "${commandData.name}": ${error}`);
  });
});

