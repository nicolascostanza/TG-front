// post message function on Js
export const postMessageOnSlack = async (message) => {
  const URL = process.env.REACT_APP_SLACK_CHANNEL_URL;
  const response = await fetch(URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: message
    })
  });
  return response;
};
