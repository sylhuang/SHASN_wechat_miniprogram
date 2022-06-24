const getRecordById = require('./getRecordById');
const getRecordsByModule = require('./getRecordsByModule');
const createFeedback = require('./createFeedback');

// 云函数入口函数
exports.main = async (event, context) => {
  const { type } = event.data;

  switch (type) {
    case 'getRecordsByModule':
      return await getRecordsByModule.main(event, context);
    case 'getRecordById':
      return await getRecordById.main(event, context);
    case 'createFeedback':
      return await createFeedback.main(event, context);
    default:
      return null;
  }
}