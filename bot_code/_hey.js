// heyCommandHandler.js

const heyResponses = [
  "*ㄱㄱㄱㄱ*",
  "*ㄴㄴㄴㄴ*",
  "*ㅇㅇㅇㅇ*",
  "*???????*",
];

module.exports = async function (interaction) {
  if (interaction.data.name === 'hey') {
    const questionOption = interaction.data.options.find((option) => option.name === 'question');
    if (questionOption) {
      const userQuestion = questionOption.value;
      const randomResponse = heyResponses[Math.floor(Math.random() * heyResponses.length)];
      const responseMessage = `**Q:** ${userQuestion}\n**A:** ${randomResponse}`;
  
      return {
        statusCode: 200,
        body: JSON.stringify({
          type: 4,
          data: { content: responseMessage },
        }),
      };
    }
  }
};