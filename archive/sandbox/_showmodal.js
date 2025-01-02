module.exports = function (body) {
    // 모달 호출 - 결과는 index의 type = 5 에서 처리
    return {
      statusCode: 200,
      body: JSON.stringify({
        type: 9, // Modal 응답 타입
        data: {
          custom_id: "example_modal", // 모달 ID (고유값)
          title: "Simple Modal",      // 모달 제목
          components: [               // 모달 구성 요소
            {
              type: 1,                // Action Row
              components: [
                {
                  type: 4,            // Text Input
                  custom_id: "text_input", // 텍스트 입력 필드의 ID
                  label: "Enter something", // 입력 필드 레이블
                  style: 1,               // 스타일 (1: 짧은 입력, 2: 긴 입력)
                  placeholder: "Type your message here...", // 힌트 텍스트
                  required: true          // 필수 입력 여부
                }
              ]
            }
          ]
        }
      }),
    };
  };
  