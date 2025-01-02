// helloCommandHandler.js

module.exports = function (body) {
  // Define an array of random hello messages with placeholders for user mentions
  const helloMessages = [
    "안녕하십니까, <@userid>!",
    "<@userid>, 좋은하루 보내세요!",
    "<@userid>, 반가워요!",
  ];

  // Get a random index from the helloMessages array
  const randomIndex = Math.floor(Math.random() * helloMessages.length);

  // Get the random hello message
  const randomMessage = helloMessages[randomIndex];

  // Replace <@userid> with the actual user mention
  const mentionUserMessage = randomMessage.replace('<@userid>', `<@${body.member.user.id}>`);

  return {
    statusCode: 200,
    body: JSON.stringify({
      type: 4,
      data: { content: mentionUserMessage },
    }),
  };
};