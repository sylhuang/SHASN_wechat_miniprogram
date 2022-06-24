const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database();

exports.main = async (event, context) => {
  const { cardId, feedback } = event.data;

  return await db.collection('feedback')
    .add({
      data: [{
        id: cardId,
        feedback,
        date: new Date(),
      }]
    });
};