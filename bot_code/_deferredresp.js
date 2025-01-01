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
    //---------------------------------------------------------------------------------------------------------------
    const webhookUrl = `https://discord.com/api/v10/webhooks/${body.application_id}/${body.token}`;
    const followUpMessage = 'Pong! This is a follow-up message after the initial response.';
    const followUpError = await sendMessage(webhookUrl, {content: followUpMessage}); // followup 
    if (followUpError) {
        return followUpError;
    }
    //---------------------------------------------------------------------------------------------------------------
    return { // 표시되지않음음
        statusCode: 200,
        body: JSON.stringify({
            type: 4,
            data: { content: '_deferredresp' },
        }),
    };
};
