const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ModalBuilder, TextInputBuilder, ActivityType, StringSelectMenuBuilder, ChannelSelectMenuBuilder, ChannelType, RoleSelectMenuBuilder, Guild } = require("discord.js");
const { General, BList, welcomis } = require("../../Database/index");
const axios = require('axios');


async function controlBlackList(id) {
    try {
        const response = await axios.get(`https://vexyapiv1.squareweb.app/v1/blacklist/protect?user=${id}`);
        return response;
    } catch (error) {
        return false;
    }
}


module.exports = {
    name: "guildMemberAdd",
    run: async (member, client) => {

        const serveralvo = General.get('guildID')
        if (member.guild.id !== serveralvo) {
            return;
        }

        const usercontrol = await controlBlackList(member.user.id); //Chamando função da API

        const userVerify = usercontrol.data // Resposta da Api

        const embedBlack = new EmbedBuilder()
            .setAuthor({ name: `Sistema de Moderação`, iconURL: "https://cdn.discordapp.com/emojis/1265528442133418077.webp?size=96&quality=lossless" })
            .setTitle('Entrada Negada')
            .setColor(General.get('oficecolor.red')) //Código Hex de uma cor desejada para embed de Logs
            .setTimestamp()
            .setFooter({ text: `Medida de Segurança`, iconURL: "https://cdn.discordapp.com/emojis/1267381920333955112.webp?size=96&quality=lossless" })
            .setDescription(`- **O usuário <@${member.user.id}> está em nossa Blacklist Global.**\n- **Portanto o usuário foi impedido de entrar neste Servidor.**`)

        const channelLogsperma = client.channels.cache.get(General.get(`logsBlacklist`)) || null; //Logs para Bans
        const LogsGerais = client.channels.cache.get(General.get(`logsGerais`)); //Logs Gerais do Bot, para informações de erros
        const admrole = (General.get(`admrole`)) //ID de cargo de Admnistrador do Servidor

        if (userVerify.status === `banned`) {
            channelLogsperma.send({ content: `<@&${admrole}>`, embeds: [embedBlack] });
            return member.ban({ reason: "Sistema de Moderação" });
        } else if (userVerify.status === `unbanned`) {
            return;
        } else if (userVerify.status === `error`) {
            return LogsGerais.send({ content: `<@&${admrole}>\n\nErro: ${userVerify.error}`});
        }
    }
}