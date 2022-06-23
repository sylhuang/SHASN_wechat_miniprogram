const getCollection = (cardType) => {
  switch (cardType) {
    case 'C':
      return 'conspiracy';
    case 'H':
      return 'headline';
    case 'Q':
      return 'ideology';
    default:
      return 'ideology';
  }
}

// [_, moduleType, cardType]
const getType = (cardId) => {
  return cardId.match(/([A-Z]\d{2})([CHQ])\d{3}$/);
}

const updateStorage = (key, data) => {
  try {
    wx.setStorage({
      key,
      data,
    });
  } catch (e) {
    console.log(e);
  }
}

const getAndCacheRecordsByModule = async (collection, moduleType, cardId) => {
  return await wx.cloud.callFunction({
    name: 'dbCRUD',
    data: {
      data: {
        collection,
        moduleType,
        type: 'getRecordsByModule',
      }
    }
  }).then((resp) => {
    const newCache = resp.result.data;
    updateStorage(collection, newCache);

    return newCache.find(doc => doc.id === cardId);
  });
}

const getRecordFromStorage = async (cardId) => {
  const matches = getType(cardId);

  if (!matches || matches.length !== 3) {
    return null;
  }

  const [, moduleType, cardType] = matches;
  const collection = getCollection(cardType);
  let record;

  try {
    record = wx.getStorageSync(collection).find(doc => doc.id === cardId);
  } catch (e) {
    record = await getAndCacheRecordsByModule(collection, moduleType, cardId);
  }

  return {
    record,
    cardType,
  };
};

module.exports = {
  getRecordFromStorage,
}