const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  const { collection, moduleType } = event.data;

  return await db.collection(collection)
    .where({
      module: moduleType
    }).get();
};