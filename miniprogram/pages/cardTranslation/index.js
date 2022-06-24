const utils = require('./utils');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    haveGetRecord: false,
    hideFeedback: true,
    record: null,
    cardId: '',
    cardType: '',
    feedback: '',
  },
  bindKeyInput(e) {
    const cardId = e.detail.value.toUpperCase();

    if (cardId.length === 7) {
      this.setData({
        cardId,
      });
    }
  },
  
  bindFeedbackInput(e) {
    this.setData({
      feedback: e.detail.value,
    });
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
          }
          
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
  },

  showFeedback() {
    this.setData({
      hideFeedback: false,
    })
  },

  cancelFeedback() {
    this.setData({
      hideFeedback: true,
      feedback: '',
    });
  },

  submitFeedback() {
    this.setData({
      hideFeedback: true,
      feedback: ''
    });
  },

  showNotes() {
    wx.showModal({
      title: '注释',
      content: 'blahblah',
      editable: true,
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
});
