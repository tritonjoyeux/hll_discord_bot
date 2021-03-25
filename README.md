# Hell let loose discord bot

A simple discord bot created to fetch api(s) and search players stats in live game.

Currently it intergrate 2 apis from Hell Let Loose France which is in the `Globals/apis.js`.

### Requirement

Packages|Version
---|---
nodejs| \>= 12
npm|\> 6
pm2(optional)| anyone

### Setup

`git clone https://github.com/tritonjoyeux/hll_discord_bot` in the folder you want.

`cd hll_discord_bot`

`npm i`

### Initialisation

First of all, create a new bot on [this link](https://discord.com/developers/applications/) and configure all the
parametres.

Once done click on the bot part and copy the token.

Go to the config folder and copy the `config.js.dist` to `config.js` and specify the configuration.

```js
export const config = {
  token: 'TOKEN_APP_DISCORD',
  VT: 'VOICE_CHANNEL_ID',
  prefix: '!',
  colorError: '#ff0000',
  searchMaxLength: 3
}
```

This file should looks like this.

### Running the bot

If you want to work on the project, I recommand you to use nodemon. It'll reload the bot after every save you make.

If you want to run the bot just to check just use `node ./`

And if you want to run this in production, I recommend to use pm2.

## Example API

***Stats API:***

```json
{
  "result": {
    "current_map": {
      "just_name": "somename",
      "human_name": "Some Name",
      "name": "somename2",
      "start": 100000,  //seconds elapsed
      "end": null
    },
    "name": "Some Name Display",
    "map": "nameofthemap",
    "nb_players": "60/100",
    "short_name": "SHRTNNM",
    "player_count": "60",
    "vote_status": {
      "total_votes": 1,
      "winning_maps": [
        // if vote else empty
        [
          "nameofthemap2",
          1
        ]
      ]
    },
    "next_map": "nameofthemap3"
  }
}
```

***Stats player api:***

```json
{
  "result": {
    "stats": [
      {
        "player": "Test Player",
        "steaminfo": {
          "profile": {
            "avatar": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/xx/xxx.jpg"
          }
        },
        "kills": 2,
        "kills_streak": 2,
        "deaths": 2,
        "deaths_without_kill_streak": 2,
        "teamkills": 0,
        "teamkills_streak": 0,
        "deaths_by_tk": 0,
        "deaths_by_tk_streak": 0,
        "nb_vote_started": 0,
        "nb_voted_yes": 0,
        "nb_voted_no": 0,
        "time_seconds": 2244,
        "kills_per_minute": 0.05,
        "deaths_per_minute": 0.05,
        "kill_death_ratio": 1
      } // add new player after this
    ]
  }
}
```

## Adding more content

The architecture is pretty simple:

    .
    ├── Actions                 # Here you can found all the actions to minify the index.js
        └── ...
    ├── config                  # The config file
        └── config.js
    ├── Globals                 # Main part
        ├── apis.js             # All the apis
        ├── imagesMap.js        # Transcription key into map
        └── RandomizeColor.js   # Generate random colors (override if you want)
    ├── node_modules            # Dependencies
        └── ...
    ├── .gitignore             
    ├── index.js                # Enter point
    ├── package.json
    ├── package-lock.json
    └── README.md

If you want to add more content in the bot, visit the documentation of [discord.js](https://discord.js.org/#/) to see what can be done.

All the commands are specified in the `index.js`. Juste add the command to the commands array.
```js
const commands = {
  stats: 'stats',
  search: 'search',
  ...
}
```
The fact that we have duplication here is because you have to check correctly the message before making an action.

You have 2 types of checking message.

*Without arguments:*
```js
prefix + commands["keycommand"] === msg.content
```

*With arguments:*
```js
msg.content.indexOf(prefix + commands["keycommand"]) === 0
```

One check is good create an Action in the `Actions` folder and add the action function. Be careful to pass the msg parameter. 
It'll be necessary to send a reply for the user.

___

I think this might be good ATM. Enjoy coding :)
