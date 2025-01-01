
const axios = require('axios');
async function sendMessage(url, messageContent) {
  try {
      await axios.post(url,messageContent);
      return null;
  } catch (error) {
      return {
          statusCode: 500,
          body: JSON.stringify({
              type: 4,
              data: { content: 'An error occurred while sending message.' },
          }),
      };
  }
}
    module.exports = async function (body) {
        const interactionResponseUrl = `https://discord.com/api/v10/interactions/${body.id}/${body.token}/callback`;
        const deferredResponseError = await sendMessage(interactionResponseUrl,{ type: 5 }); // 5: 지연응답 
        if (deferredResponseError) {
            return deferredResponseError;
        }
        // ------------------------------------------------------------------------------------------------
        let mutemMessage = 'MuteM';
        const userId = body.member.user.id;
        const guildId = body.guild_id;
        const botToken = process.env.BOT_TOKEN;
        // ------------------
        const durationOption = body?.data?.options?.find((option) => option.name === 'duration');
        const timeoutDuration = (durationOption?.value ?? 3) * 60 * 1000;
        const timeoutUntil = new Date(Date.now() + timeoutDuration).toISOString();
        // ------------------------------------------------------------------------------------------------
        try { // timeout request
            await axios.patch(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}`, {
                communication_disabled_until: timeoutUntil
            }, {
                headers: {'Authorization': `Bot ${botToken}`}
            });
            mutemMessage = `User ${userId} has been timed out until ${timeoutUntil}`;
        } catch (error) {
            mutemMessage = `Error timing out user ${userId}: ${error.response ? error.response.data : error.message}`;
        }
        // ------------------------------------------------------------------------------------------------
        const webhookUrl = `https://discord.com/api/v10/webhooks/${body.application_id}/${body.token}`;
        const followUpError = await sendMessage(webhookUrl, {content: mutemMessage}); // followup 
        if (followUpError) {
            return followUpError;
        }
        // ------------------------------------------------------------------------------------------------
        return { // return msg
            statusCode: 200,
            body: JSON.stringify({
                type: 4,
                data: { content: mutemMessage },
            }),
        };
      };
      