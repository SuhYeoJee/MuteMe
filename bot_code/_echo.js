// echoCommandHandler.js

module.exports = function (body) {
    const messageOption = body.data.options.find((option) => option.name === 'message');
    if (messageOption) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          type: 4,
          data: { content: messageOption.value },
        }),
      };
    }
  };