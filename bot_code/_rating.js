// ratingCommandHandler.js

const ratingResponses = [
  "*★★★★★★★★★★★★★★★★★★★★★★★★★*",
  "*★★★★★*","*★★★★☆*",
  "*★★★★★*","*★★★★☆*",
  "*★★★★★*","*★★★★☆*",
  "*★★★★*","*★★★☆*","*★★★*","*★★☆*",
  "*★★★★*","*★★★☆*","*★★★*","*★★☆*",
  "*★★★★*","*★★★☆*","*★★★*","*★★☆*",
  "*★★★★*","*★★★☆*","*★★★*","*★★☆*",
  "*★★★★*","*★★★☆*","*★★★*","*★★☆*",
  "*★★★★*","*★★★☆*","*★★★*","*★★☆*",
  "*★★*","*★☆*","*★*","*☆*",
  "*★★*","*★☆*","*★*","*☆*",
  "*★★*","*★☆*","*★*","*☆*",
  " ",
];

module.exports = async function (interaction) {
  if (interaction.data.name === 'rating') {
    const questionOption = interaction.data.options.find((option) => option.name === 'question');
    if (questionOption) {
      const userQuestion = questionOption.value;
      const randomResponse = ratingResponses[Math.floor(Math.random() * ratingResponses.length)];
      const responseMessage = `${userQuestion}\n→ ${randomResponse}`;
  
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