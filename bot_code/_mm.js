mutemCommandHandler.js

module.exports = function (body) {
    const mentionUserMessage = "<@userid>!".replace('<@userid>', `<@${body.member.user.id}>`);
  
    return {
      statusCode: 200,
      body: JSON.stringify({
        type: 4,
        data: { content: mentionUserMessage },
      }),
    };
  };
