const utils = require('./utils');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    haveGetRecord: false,
    hideFeedback: true,
    showNotes: false,
    record: null,
    cardId: '',
    cardType: '',
    feedback: '',
  },
  bindKeyInput(e) {
    const cardId = e.detail.value.toUpperCase();

    this.setData({
      cardId,
    });
  },

  bindFeedbackInput(e) {
    this.setData({
      feedback: e.detail.value,
    });
  },

  getRecord() {
    if (this.data.cardId && this.data.cardId.length === 7) {
      wx.showLoading({
        title: '',
      });

      utils.getRecordFromStorage(this.data.cardId)
        .then((res) => {
          wx.hideLoading();

          if (res) {
            const {
              record,
              cardType
            } = res;

            this.setData({
              haveGetRecord: true,
              record,
              cardType,
            });
          } else {
            wx.showToast({
              title: '序号不存在',
              icon: 'error',
              duration: 2000
            })
          }
        }).catch((e) => {
          console.log(e);
          wx.hideLoading();
        });
    } else {
      wx.showToast({
        title: '序号不存在',
        icon: 'error',
        duration: 2000
      })
    }
  },

  clearRecord() {
    this.setData({
      haveGetRecord: false,
      record: ''
    });
  },

  toggleNotes() {
    this.setData({
      showNotes: !this.data.showNotes,
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
    if (this.data.feedback) {
      utils.createFeedback(this.data.cardId, this.data.feedback);
    }
    
    this.setData({
      hideFeedback: true,
      feedback: ''
    });

    wx.showToast({
      title: '感谢您的贡献',
      duration: 2000,
    })
  },

  showNotes() {
    wx.showModal({
      title: '注释',
      content: 'blahblah',
      editable: true,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
});