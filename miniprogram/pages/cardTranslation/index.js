const utils = require('./utils');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    haveGetRecord: false,
    record: '',
    cardId: '',
    cardType: '',
  },

  bindKeyInput(e) {
    const cardId = e.detail.value.toUpperCase();

    if (cardId.length === 7) {
      this.setData({
        cardId,
      });
    }
  },

  getRecord() {
    if (this.data.cardId) {
      wx.showLoading({
        title: '',
      });

      utils.getRecordFromStorage(this.data.cardId)
        .then((res) => {
          if (res) {
            const { record, cardType } = res;

            this.setData({
              haveGetRecord: true,
              record,
              cardType,
            });
            wx.hideLoading();
          }
        }).catch((e) => {
          console.log(e);
          wx.hideLoading();
        });
    }
  },

  clearRecord() {
    this.setData({
      haveGetRecord: false,
      record: ''
    });
  }
});
