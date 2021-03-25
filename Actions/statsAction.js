import {apiToCheck} from "../Globals/apis.js";
import axios from "axios";
import Discord from "discord.js";
import RandomizeColor from "../Globals/RandomizeColor.js";
import {imagesMap} from "../Globals/imagesMap.js";

export const statsAction = (msg) => {
  //Init
  let data = [];
  let message = 'Pas de données pour ce serveur';
  let now = Date.now();

  //Fetch apis (keep format)
  apiToCheck.map((e) => {
    data.push(axios.get(e));
  })

  Promise.all(data).then(dataRes => {
    dataRes.forEach((resServ, index) => {
      //Calc time elapsed
      const totalSeconds = (now - resServ.data.result.current_map.start * 1000) / 1000
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = Math.floor((totalSeconds % 3600) % 60)

      const mapImage = resServ.data.result.current_map.just_name;

      message = new Discord.MessageEmbed()
        .setColor(RandomizeColor.getRandomColor())
        .setTitle(resServ.data.result.name)
        .addField('Tracking', 'https://stats' + (index === 0 ? '' : '2') + '.hllfr.fr/#/livescore')
        .addField('Nombre de joueurs', resServ.data.result.nb_players, true)
        .addField('Temps écoulé', '0' + hours + ':' + (minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds), true)
        .addField('Carte', resServ.data.result.current_map.human_name, true)
        .setImage('https://stats.hllfr.fr/maps/' + (imagesMap[mapImage] || mapImage) + '.webp')
        .setTimestamp();

      //Check if next map votes started
      if (resServ.data.result.vote_status.total_votes !== 0) {
        message.addField('Prochaine carte', resServ.data.result.vote_status.winning_maps[0][0] + ' pour ' + resServ.data.result.vote_status.winning_maps[0][1] + ' vote(s)', false)
      }
      msg.channel.send(message)
    })
  })
}
