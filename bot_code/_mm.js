
const axios = require('axios');  // axios 임포트

      module.exports = async function (body) {  // 함수에 async 추가
          const userId = body.member.user.id;
          const guildId = body.guild_id;  // 유저가 속한 서버 ID
          const botToken = process.env.BOT_TOKEN;  // 봇의 토큰
      
          let mentionUserMessage = `<@${userId}>!`;
        
          // 타임아웃을 1분 후로 설정 (1분 = 60000ms)
          const timeoutDuration = 1 * 60 * 1000;  // 1분 (밀리초 단위)
          const timeoutUntil = new Date(Date.now() + timeoutDuration).toISOString();  // 타임아웃 해제 시간 계산
      
          try {
              // 타임아웃을 설정하기 위한 PATCH 요청
              await axios.patch(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}`, {
                  communication_disabled_until: timeoutUntil  // 타임아웃 시간 설정
              }, {
                  headers: {
                      'Authorization': `Bot ${botToken}`  // 봇의 인증 토큰
                  }
              });
      
              // 타임아웃 성공 시 메시지 업데이트
              mentionUserMessage = `User ${userId} has been timed out until ${timeoutUntil}`;
          } catch (error) {
              // 타임아웃 실패 시 오류 메시지
              mentionUserMessage = `Error timing out user ${userId}: ${error.response ? error.response.data : error.message}`;
          }
      
          // 결과를 디스코드로 반환
          return {
              statusCode: 200,
              body: JSON.stringify({
                  type: 4,
                  data: { content: mentionUserMessage },
              }),
          };
      };
      