const { Schema, model } = require('mongoose');
const ms = require('ms');

const GuildSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    drop: {
        cooldown: {
            type: Number,
            default: ms('5h')
        },
        MessageId: {
            type: String,
        },
        channelId: {
         type: String,
        },
        logsId: {
            type: String
        },
        prize: {
            type: String,
            default: '10k'
        },
        currentDrop: {
          id: { type: String },
          prizeIn: { type: Number },
          prize: { type: String },
          date: Number,
          users: [{ userId: String, Winner: Boolean }]
        },
        LastDrop: {
            LastDrop: { type: Number },
            cliamedBy: { type: String },
            prizeIn: { type: Number }
        },
    }
});

GuildSchema.statics.get = async function (id) {
    const _ = await this.findOne({ id });
    return _ ? _ : await this.create({ id });
};

module.exports = model('Guilds', GuildSchema);
