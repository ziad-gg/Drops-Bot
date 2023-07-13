const { Events, Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { EventBuilder } = require('handler.djs');
const { init } = require('../database/init.js');
const rn = require('random-number');
const ms = require('ms');
const humanizeDuration = require("humanize-duration");
const GuildsSchema = require('../database/models/GuildsSchema.js');

module.exports = new EventBuilder()
    .setEvent(Events.ClientReady)
    .setExecution(Execute)

/**
 * 
 * @param {Client} client 
 */

async function Execute(client) {
    console.log('(%s) Connected to discord socket', client.user.tag);
    await init();

    setInterval(async () => {
        const MainGuild = client.guilds.cache.get('988515701318901770');
        const MainGuildData = await GuildsSchema.get(MainGuild.id);
        const DropsChannel = MainGuild.channels.cache.get(MainGuildData.drop.channelId);
        if (!DropsChannel) return console.warn('Drop channel is not found');
        NewRoll(MainGuildData, DropsChannel)

    }, ms('10s'))


};


/**
 * 
 * @param {*} GuildData 
 * @param {import('discord.js').GuildBasedChannel} channel 
 * @returns 
 */

async function NewRoll(GuildData, channel) {
    const message = await channel.messages.fetch(GuildData.drop.MessageId).then(data => data).catch(e => null)


    const id = RandomUUid()

    const current = GuildData.drop.currentDrop;

    

    if (Date.now() < current.date) {
        if (message && !message.content.includes('@')) message.edit({ content: `الدروب الثاني خلال ${humanizeDuration(new Date(Date.now() - current.date), { language: 'ar', round: true }) }` });
        return;
    }

    if (message) message.delete().catch(e => e);

    current.id = id;
    current.users = [];
    current.prizeIn = rn.generator({ max: 4, min: 1, integer: true })();
    current.prize = GuildData.drop.prize;
    current.date = Date.now() + ms('5h');

    const embed = new EmbedBuilder()
        .setColor('Gold')
        .setImage('https://media.discordapp.net/attachments/1059578313682722816/1129045953211547648/Picsart_23-07-13_16-44-09-995.png?width=953&height=399')

    const Buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('1').setStyle(ButtonStyle.Secondary).setLabel('1 1️⃣'),
        new ButtonBuilder().setCustomId('2').setStyle(ButtonStyle.Secondary).setLabel('2 2️⃣'),
        new ButtonBuilder().setCustomId('3').setStyle(ButtonStyle.Secondary).setLabel('3 3️⃣'),
        new ButtonBuilder().setCustomId('4').setStyle(ButtonStyle.Secondary).setLabel('4 4️⃣')
    );

    const messageId = await channel.send({ content: `@here`, embeds: [embed], components: [Buttons] });
    GuildData.drop.MessageId = messageId.id;

    GuildData.save();

    const logs = await channel.guild.channels.cache.get(GuildData.drop.logsId);
    if (logs) logs.send({ embeds: [new EmbedBuilder().setColor('Yellow').setDescription(`New drop was created and it correct chest is __${current.prizeIn}__`)] })
};

function RandomUUid(length = 45) {
    let UUid = '';
    let Chars = 'abxwioqueiqjwlqhwuieiqd-dsakdjalkhduihu2iwq+.jdhadshwkqhdsa';
    ++length;
    for (let i = 0; i < length; i++) {
        const Char = Chars[Math.floor(Math.random() * Chars.length)] || Chars[i];
        UUid += Char;
    }

    return UUid;
};