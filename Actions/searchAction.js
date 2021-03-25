import Discord from "discord.js";
import {apiSearchToCheck} from "../Globals/apis.js";
import axios from "axios";
import RandomizeColor from "../Globals/RandomizeColor.js";
import {config} from "../config/config.js";

const lengthMaxSearch = config.searchMaxLength;
const colorError = config.colorError;
const prefix = config.prefix;

export const searchAction = (msg) => {
  const search = msg.content.replace(prefix + 'search ', '');
  //Bypass too much results
  if (search.length < lengthMaxSearch) {
    msg.channel.send(new Discord.MessageEmbed()
      .setColor(colorError)
      .setTitle('La recherche doit avoir au moins 3 lettres'))
  } else {
    let data = [];
    let messages = [[], []];

    apiSearchToCheck.forEach((e) => {
      data.push(axios.get(e));
    });

    Promise.all(data).then(dataSearch => {
      dataSearch.forEach((res, index) => {
        res.data.result.stats.forEach((e) => {
          if (e.player.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            messages[index].push(new Discord.MessageEmbed()
              .setColor(RandomizeColor.getRandomColor())
              .setTitle(e.player + ' sur le serveur HLLFR #' + (index + 1))
              .setThumbnail(e.steaminfo.profile.avatar)
              .addField('Kills :crossed_swords:', e.kills + (e.kills > 50 && ' (la machine)'), true)
              .addField('Death :skull:', e.deaths, true)
              .addField('Kills Streak :bar_chart:', e.kills_streak)
              .addField('TK :knife:', e.teamkills + (e.teamkills > 0 && ' (t\'abuse)'), true)
              .addField('K/D :chart_with_upwards_trend:', e.kill_death_ratio, true)
              .setTimestamp())
          }
        })
      })
      if (messages[0].length === 0 && messages[1].length === 0) {
        msg.channel.send(new Discord.MessageEmbed()
          .setColor(colorError)
          .setTitle('Aucun joueur avec "' + search + '" sur les serveurs.')
          .setTimestamp())
      } else {
        messages.forEach((messagesServ) => {
          if (messagesServ.length !== 0) {
            messagesServ.forEach((e) => {
              msg.channel.send(e)
            })
          }
        })
      }
    })
  }
}
