const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database();

exports.main = async (event, context) => {
  const { collection, cardId } = event.data;

  return await db.collection(collection)
    .where({
      id: cardId
    }).get();
};