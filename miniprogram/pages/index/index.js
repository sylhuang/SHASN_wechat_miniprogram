// index.js
// const app = getApp()
const { envList } = require('../../envList.js');

Page({
  data: {
    showUploadTip: false,
    powerList: [{
      title: '游戏模组',
      tip: '感受过去、现在或未来的政治风云',
      showItem: false,
      item: [{
        title: '罗马 40 BCE - 共和国的陨落',
        page: 'cardTranslation'
      }]
    }, {
      title: '关于',
      tip: '模组资讯、建议与支持',
      showItem: false,
      item: [{
        title: '桌游介绍',
        page: 'gameInfo'
      }, {
        title: '贡献人员',
        page: 'credit'
      }]
    }],
    envList,
    selectedEnv: envList[0],
    haveCreateCollection: false
  },

  onClickPowerInfo(e) {
    const index = e.currentTarget.dataset.index;
    const powerList = this.data.powerList;
    powerList[index].showItem = !powerList[index].showItem;
    this.setData({
      powerList
    });
  },

  jumpPage(e) {
    if (e.currentTarget.dataset.page === 'cardTranslation') {
      wx.navigateTo({
        url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
        success: () => {
          wx.setNavigationBarTitle({
            title: e.currentTarget.dataset.title,
          })
        }
      });
    } else {
      wx.navigateTo({
        url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
      });
    }
  },
});
