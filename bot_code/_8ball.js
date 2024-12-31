// eightBallCommandHandler.js

const eightBallResponses = [
  "*ㄱㄱㄱㄱ*",
  "*ㄴㄴㄴㄴ*",
  "*ㅇㅇㅇㅇ*",
  "*???????*",
];

module.exports = async function (interaction) {
  if (interaction.data.name === '8ball') {
    const questionOption = interaction.data.options.find((option) => option.name === 'question');

    if (!questionOption) {
      // No question provided, prompt the user for a question
      return {
        type: 1, // ACKNOWLEDGE_WITH_SOURCE
      };
    }
    const userQuestion = questionOption.value;
    const randomResponse = eightBallResponses[Math.floor(Math.random() * eightBallResponses.length)];
    // const responseMessage = `${randomResponse}`;
    const responseMessage = `**Q:** ${userQuestion}\n**A:** ${randomResponse}`;

    return {
      statusCode: 200,
      body: JSON.stringify({
        type: 4,
        data: { content: responseMessage },
      }),
    };
  }
};