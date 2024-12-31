
module.exports = function (body) {
    const submittedValue = body.data.components[0].components[0].value; // 사용자가 입력한 값
    return {
      statusCode: 200,
      body: JSON.stringify({
        type: 4, // 응답 메시지
        data: {
          content: `You entered: ${submittedValue}`, // 입력 값을 사용자에게 다시 전달
        },
      }),
    };
};
      