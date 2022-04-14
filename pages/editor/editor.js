const app = getApp();

Page({
  data: {
    hideLoading: false,
    videoUrl: "",
    originVideoUrl: "",
    templates: [],
    files:[]
  },
  onReady() {},
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.videoBaseUrl + "/video/templates",
      method: 'GET',
      header: {
        // 'Content-Type': 'application/x-www-form-urlencode'
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          templates: res.data.files
        })
      },
    });
    that.setData({
      videoUrl: options.videoUrl,
      originVideoUrl: options.videoUrl
    })
  },
  destroy() {
    this.videoContext.destroy();
  },

  switchTemplate: function(e) {
    var that =this;
    var currentDataIdx = e.currentTarget.dataset.index;
    var currentTemplateUrl = "";
    setTimeout(function () {
      wx.showToast({
        title: '模版应用中...',
        icon: 'loading',
        duration: 9999999,
        mask: true
      })
    }, 0); //延迟时间
    var currentTemplate = null;
    that.data.templates.forEach(function(item, index) {
      if(index == currentDataIdx) {
        item.select = true;
        currentTemplate = item;
        currentTemplateUrl = item.videoUrl
      } else {
        item.select = false;
      }
    });
    console.log(that.data.originVideoUrl)
    console.log("1" + currentTemplateUrl)
    const selectItems = app.globalData.selectItems
    console.log(selectItems)
    let contactFiles = [currentTemplate]
    selectItems.forEach(function(item, index) {
      contactFiles.push(item);
    });
    wx.request({
      url: app.globalData.videoBaseUrl + "/boss/bossliu/clientcao/concat",
      method: 'POST',
      header: {
          // 'Content-Type': 'application/x-www-form-urlencode'
          'Content-Type': 'application/json'
      },
      data: {
          "files": contactFiles
      },
      success: function(res) {
        setTimeout(function () {
          wx.showToast({
            title: '视频生成成功',
            icon: 'success',
            duration: 1500,
            mask: true
          })
        }, 0); //延迟时间
          that.setData({
            videoUrl:res.data.videoUrl
          })
      },
  });
    // that.setData({
    //   templates:that.data.templates
    // })
  },
  handleDownload(e) {
    setTimeout(function () {
      wx.showToast({
        title: '下载中',
        icon: 'loading',
        duration: 9999999,
        mask: true
      })
    }, 0) //延迟时间
    let link = this.data.videoUrl;
    let fileName = new Date().valueOf();
    // 此处监听进度条 downloadTask 
    const downloadTask = wx.downloadFile({
      url: link,
      filePath: wx.env.USER_DATA_PATH + '/' + fileName + '.mp4',
      success: res => {
        console.log(res);
        let filePath = res.filePath;
        wx.saveVideoToPhotosAlbum({
          filePath,
          success: file => {
            setTimeout(function () {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 1500,
                mask: true
              })
            }, 0) //延迟时间
            let fileMgr = wx.getFileSystemManager();
            fileMgr.unlink({
              filePath: wx.env.USER_DATA_PATH + '/' + fileName + '.mp4',
              success: function (r) {

              },
            })
          },
          fail: err => {
            wx.hideLoading()
            console.log(err)
            if (err.errMsg === 'saveVideoToPhotosAlbum:fail auth deny') {
              setTimeout(function () {
                wx.showModal({
                  title: '提示',
                  content: '需要您授权保存相册',
                  showCancel: false,
                  success: data => {
                    wx.openSetting({
                      success(settingdata) {
                        if (settingdata.authSetting['scope.writePhotosAlbum']) {
                          setTimeout(function () {
                            wx.showModal({
                              title: '提示',
                              content: '获取权限成功,再次点击下载即可保存',
                              showCancel: false,
                            })
                            wx.hideLoading()
                          }, 0)
                        } else {
                          setTimeout(function () {
                            wx.showModal({
                              title: '提示',
                              content: '获取权限失败，将无法保存到相册哦~',
                              showCancel: false,
                            })
                          }, 0)
                        }
                      },
                    })
                  }
                })
              }, 0)
            }
          }
        })
      }
    })
    // 获取 downloadTask 监听内容赋值到进度条 
    downloadTask.onProgressUpdate((res) => {
      if (res.progress === 100) {
        this.setData({
          progress: ''
        })
      } else {
        this.setData({
          progress: res.progress + '%'
        })
        console.log(res.progress + '%')
      }
    })
  }
});