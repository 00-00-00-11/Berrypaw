# Fates List (Status)

This is a status bot for Fates List that automatically sends messages regarding any downtime or issues within the website and/or api as well at it's services.

# About this Project

### How will this work?

This project recieves data from Uptimerobot to be aware of any issues regarding our services such as a invalid SSL certificate or when the website is down depending on the HTTP status code.

## Permissions

### Discord Server Permissions

The bot will need this list of permissions on the Discord Server it will be running in!

- `READ_MESSAGES`
- `SEND_MESSAGES`

### Invite Scopes

You will have to give the bot some scopes so it can create slash commands as well, here is a list of scopes you will need to give to invite

- `bot`
- `application.commands`

Once invited, that server should have slash commands as long as you have ran the `npm run deploy` command at least once

### Privilaged Gateway Intents

Due to some changes to the Discord API, you now have to give your bot some intents so it can complete some needed actions for this projects. Here is a list of Intents you need to enable (remember, this does not have anything to do with `discord.js`, so you do not have to worry about the Client. This will have to be done on the Discord Developer Portal instead)

- `Message Content Intent`

## Environment Variables

- `CLIENT_ID` - The Client ID of the Discord Application
- `TOKEN` - The Discord BOT Token
- `CHANNEL` - The Discord Channel ID to post status updates to

# Questions?

Reach out to us on our [Discord Server](https://discord.gg/cMAnfu8AJB) and we will be glad to answer questions you may have regarding Fates List!
