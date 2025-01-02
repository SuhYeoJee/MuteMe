const nacl = require('tweetnacl');
// [import command handler] ===============================================
const echoCommandHandler = require('./_echo');
const mballCommandHandler = require('./_hey');
const mutemCommandHandler = require('./_mm');
// ========================================================================

exports.handler = async (event, context, callback) => {
// Checking signature (requirement 1.)
  const PUBLIC_KEY = process.env.PUBLIC_KEY;
  const signature = event.headers['x-signature-ed25519']
  const timestamp = event.headers['x-signature-timestamp'];
  const strBody = event.body; // should be string, for successful sign

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + strBody),
    Buffer.from(signature, 'hex'),
    Buffer.from(PUBLIC_KEY, 'hex')
  );

  if (!isVerified) {
    return {
      statusCode: 401,
      body: JSON.stringify('invalid request signature'),
    };
  }

// ========================================================================
// Replying to ping (requirement 2.)
  const body = JSON.parse(strBody)
  if (body.type == 1) {
    return {
      statusCode: 200,
      body: JSON.stringify({ "type": 1 }),
    }
  }
// ========================================================================
// Handle /ver Command using the mutemCommandHandler module
if (body.data.name == 'mm-ver') {
  return { // return msg
    statusCode: 200,
    body: JSON.stringify({
        type: 4,
        data: { content: '1.0.0-250102' },
    }),
  };
}
// Handle /mm Command using the mutemCommandHandler module
if (body.data.name == 'mm') {
  return mutemCommandHandler(body);
}
// Handle /echo Command using the echoCommandHandler module
  if (body.data.name == 'echo') {
    return echoCommandHandler(body);
  }
// Handle /hey Command using the heyCommandHandler module
  if (body.data.name == 'hey') {
    return mballCommandHandler(body);
  }
// ========================================================================
// END OF FILE
  return {
    statusCode: 404, // If no handler implemented for Discord's request
    body: JSON.stringify('Not Found'),
  };
};
