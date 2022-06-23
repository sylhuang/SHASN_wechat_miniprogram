const readRecordById = require('./readRecordById');

// 云函数入口函数
exports.main = async (event, context) => {
  return await readRecordById.main(event, context);
}