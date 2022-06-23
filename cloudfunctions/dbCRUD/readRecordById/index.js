const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  const { cardType, cardId } = event.data;
  let collection;

  switch (cardType) {
    case 'C':
      collection = 'conspiracy';
      break;
    case 'H':
      collection = 'headline';
      break;
    case 'Q':
      collection = 'ideology';
      break;
    default:
      collection = 'ideology';
  }

  return await db.collection(collection)
    .where({
      id: cardId
    }).get();
};