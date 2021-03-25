import {config} from "./config/config.js";
import Discord from 'discord.js';
import {statsAction} from "./Actions/statsAction.js";
import {searchAction} from "./Actions/searchAction.js";

const client = new Discord.Client();
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('Hell Let Loose', {type: ''});
});

const apiToken = config.token;
const VT = config.VT;
const prefix = config.prefix;

const commands = {
  stats: 'stats',
  search: 'search'
}

//Validation command without arg
//prefix + commands[KEY] === msg.content

//Validation command wit arg(s)
//msg.content.indexOf(prefix + commands[KEY])

client.on('message', async (msg) => {
  if (msg.channel.id === VT && msg.content.indexOf(prefix) === 0) {
    // STATS SERVER
    if (prefix + commands["stats"] === msg.content) {
      statsAction(msg);
    }
    // STATS SEARCH PLAYER
    else if (msg.content.indexOf(prefix + commands["search"]) === 0) {
      searchAction(msg)
    }
  }
})

client.login(apiToken);
