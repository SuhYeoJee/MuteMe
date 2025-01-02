const axios = require('axios');
const fs = require('fs');
// ========================================================================
// json에서 랜덤으로 항목 가져오기
function getRandomMessagesFromSection(section) {
    const wordbook = JSON.parse(fs.readFileSync('./doc/wordbook.json', 'utf8'));
    return wordbook['script'][section] ? Object.fromEntries(
        Object.entries(wordbook['script'][section]).map(([key, items]) => [key, items[Math.floor(Math.random() * items.length)]])
    ) : null;
}

// post요청
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
// -----------------------------------------------------------------------
    module.exports = async function (body) {
        // 지연응답 전송 (후속응답 대기)
        const interactionResponseUrl = `https://discord.com/api/v10/interactions/${body.id}/${body.token}/callback`;
        const deferredResponseError = await sendMessage(interactionResponseUrl,{ type: 5 }); // 5: 지연응답 
        if (deferredResponseError) {
            return deferredResponseError;
        }
        // ------------------------------------------------------------------------------------------------
        // 타임아웃 요청
        let mutemMessage = 'MuteM';
        const userId = body.member.user.id;
        const guildId = body.guild_id;
        const botToken = process.env.BOT_TOKEN;
        // ------------------
        const durationOption = body?.data?.options?.find((option) => option.name === 'duration');
        const timeoutMins =  (durationOption?.value ?? 3)
        const timeoutDuration = timeoutMins * 60 * 1000;
        const timeoutUntil = new Date(Date.now() + timeoutDuration).toISOString();
        // ------------------
        const timeoutMessage = getRandomMessagesFromSection('timeout')
        try {
            await axios.patch(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}`, {
                communication_disabled_until: timeoutUntil
            }, {
                headers: {'Authorization': `Bot ${botToken}`}
            });
            mutemMessage = `${timeoutMessage['start']}, <@${body.member.user.id}>\n사유: ${timeoutMessage['reason']} (${timeoutMins}분)`;
        } catch (error) {
            mutemMessage = `개발자 괴롭히지마라.\n${userId}: ${error.response ? error.response.data : error.message}`;
        }
        // ------------------------------------------------------------------------------------------------
        // 후속응답 전송 
        const webhookUrl = `https://discord.com/api/v10/webhooks/${body.application_id}/${body.token}`;
        const followUpError = await sendMessage(webhookUrl, {content: mutemMessage}); // followup 
        if (followUpError) {
            return followUpError;
        }
        // ------------------------------------------------------------------------------------------------
        return { // return msg (실제 효과 없음)
            statusCode: 200,
            body: JSON.stringify({
                type: 4,
                data: { content: mutemMessage },
            }),
        };
      };
      