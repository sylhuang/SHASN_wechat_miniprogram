const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database();

exports.main = async (event, context) => {
  const { collection, moduleType } = event.data;

  return await db.collection(collection)
    .where({
      module: moduleType
    }).get();
};