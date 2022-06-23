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
    const cardId = e.detail.value;

    if (cardId.length === 7) {
      const matches = cardId.match(/[A-Z][\d]+([CHQ])[\d]+/);

      if (matches && matches.length) {
        this.setData({
          cardType: matches[1],
          cardId,
        });

        return;
      }
    }

    this.setData({
      cardType: '',
      cardId: '',
      record: '',
    });
  },

  getRecord() {
    if (this.data.cardId && this.data.cardType) {
      wx.showLoading({
        title: '',
      });
      wx.cloud.callFunction({
        name: 'dbCRUD',
        data: {
          data: {
            cardType: this.data.cardType,
            cardId: this.data.cardId,
          }
        }
      }).then((resp) => {
        this.setData({
          haveGetRecord: true,
          record: resp.result.data[0],
        });
        wx.hideLoading();
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
