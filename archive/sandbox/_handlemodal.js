
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
      



// index.js
// if (body.data.name == 'mm') {
//   try {
//     return mutemCommandHandler(body);
//   } catch (error) {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         type: 4,
//         data: { content: error.message },
//       }),
//     };
//   }
// }

// if (body.type === 5) { // 모달 제출 이벤트 처리
//   return modalHandler(body);
// }
// if (body.data.name == 'modal') {
//   return getmodal(body);
// }  

