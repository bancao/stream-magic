// pages/browse/browse.js
var Util = require( 'util.js' );
var app = getApp();
Page({

    /**
     * Page initial data
     */
    data: {
        currentTab: 0,
        "items": [{
                "id": "1",
                "imageUrl": "https://img1.baidu.com/it/u=1183082123,2888829821&fm=253&fmt=auto&app=120&f=JPEG?w=690&h=497",
                "content": "护城河",
                "activeItem": false
            },
            {
                "id": "2",
                "imageUrl": "https://img2.baidu.com/it/u=1359592512,307401611&fm=253&fmt=auto&app=120&f=JPEG?w=600&h=450",
                "content": "亦庄",
                "activeItem": false
            },
            {
                "id": "3",
                "imageUrl": "https://img2.baidu.com/it/u=87441778,3577606630&fm=253&fmt=auto&app=120&f=JPEG?w=690&h=388",
                "content": "颐和园",
                "activeItem": false
            },
            {
                "id": "4",
                "imageUrl": "http://i1.sinaimg.cn/travel/2014/1021/U8842P704DT20141021103442_1.jpg",
                "content": "樱花广场",
                "activeItem": false
            },
            {
                "id": "5",
                "imageUrl": "https://img1.baidu.com/it/u=1765437868,127846038&fm=253&fmt=auto&app=120&f=JPEG?w=645&h=500",
                "content": "长城",
                "activeItem": false
            },
            {
                "id": "6",
                "imageUrl": "https://img1.baidu.com/it/u=107497312,1036438697&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=479",
                "content": "长城",
                "activeItem": false
            },
            {
                "id": "7",
                "imageUrl": "https://img1.baidu.com/it/u=4045684426,2792394144&fm=253&fmt=auto&app=120&f=JPEG?w=630&h=420",
                "content": "汽车",
                "activeItem": false
            },
            {
                "id": "8",
                "imageUrl": "https://img0.baidu.com/it/u=4232475037,3832477915&fm=253&fmt=auto&app=120&f=PNG?w=683&h=500",
                "content": "汽车",
                "activeItem": false
            },
            {
                "id": "9",
                "imageUrl": "https://img0.baidu.com/it/u=3096541037,1353336584&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=402",
                "content": "石家庄",
                "activeItem": false
            },
            {
                "id": "10",
                "imageUrl": "https://img1.baidu.com/it/u=1021519352,2411306528&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=460",
                "content": "张家界",
                "activeItem": false
            },
            {
                "id": "11",
                "imageUrl": "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00494-3502.jpg",
                "content": "医疗",
                "activeItem": false
            },
            {
                "id": "12",
                "imageUrl": "http://pic.baike.soso.com/p/20130618/20130618153602-1487877646.jpg",
                "content": "国防生风采",
                "activeItem": false
            }
        ],
        "selectItems": [],
        "selectItemsIdx": [],
        "anchor": {
            "deviceHeight": 0,
            "anchorTop": 0,
            "anchorBottom": 0,
            "anchorScreenBottom": 0
        }
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        this.computeSwiperHeight(0);
        var that = this;
        wx.request({
            url: app.globalData.videoBaseUrl + "/boss/bossliu/videos",
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            },
            data: {

            },
            success: function(res) {
                console.log(res.data)
                that.setData({
                    "items": res.data.files
                })
            },
            fail: function() {

            },
            complete: function() {

            }
        });
    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function () {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function () {

    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide: function () {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload: function () {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh: function () {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function () {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    },

    swiperChange(e) {
        this.computeSwiperHeight(e.detail.current);
    },

    //滑动切换
    swiperTab: function (e) {
        var that = this;
        that.setData({
            currentTab: e.detail.current
        });
        this.computeSwiperHeight(e.detail.current);
    },
    //点击切换 
    clickTab: function (e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    },
    //切换选择
    switchSelect: function(e) {
        var that = this;
        console.log(that.data.selectItemsIdx);
        console.log(that.data.selectItems);
        var currentDataIdx = e.currentTarget.dataset.index;
        var elementIdx = that.data.selectItemsIdx.indexOf(currentDataIdx);
        console.log(elementIdx)
        if(elementIdx < 0) {
            if(that.data.selectItemsIdx.length >= 6) {
                return;
            }
            that.data.selectItems.push(that.data.items[currentDataIdx]);
            that.data.selectItemsIdx.push(currentDataIdx)
        } else {
            that.data.selectItems.splice(elementIdx, 1);
            that.data.selectItemsIdx.splice(elementIdx, 1);
        }
        that.data.items.map(function(item, index, array) {
            var itemSelectIndex = that.data.selectItemsIdx.indexOf(index);
            if(itemSelectIndex >= 0) {
                itemSelectIndex = itemSelectIndex + 1;
            }
            item.selectIdx = itemSelectIndex;
        });
        
        this.setData({
            "items": that.data.items,
            "selectItems": that.data.selectItems,
            "selectItemsIdx": that.data.selectItemsIdx
        })
        console.log(that.data.selectItems)
        console.log(e)
        this.computeSwiperHeight(1);
    },

    computeSwiperHeight(pageIndex) {
        let getSwiperHeight = () => {
            let min = this.data.anchor.anchorScreenBottom - this.data.anchor.anchorTop;
            let value = this.data.anchor.anchorBottom - this.data.anchor.anchorTop
            return Math.max(min, value)
        }
        wx.createSelectorQuery()
            .select('.anchor-screen-bottom')
            .boundingClientRect()
            .selectViewport()
            .scrollOffset()
            .exec(res => {
                if(res[0]) {
                    this.data.anchor.anchorScreenBottom = res[0].bottom
                }
            })
        wx.createSelectorQuery()
            .selectAll('.anchor-top')
            .boundingClientRect()
            .selectViewport()
            .scrollOffset()
            .exec(res => {
                this.data.anchor.anchorTop = res[0][pageIndex].top
                this.setData({
                    'anchor.deviceHeight': getSwiperHeight()
                })
            })
        wx.createSelectorQuery()
            .selectAll('.anchor-bottom')
            .boundingClientRect()
            .selectViewport()
            .scrollOffset()
            .exec(res => {
                this.data.anchor.anchorBottom = res[0][pageIndex].bottom
                this.setData({
                    'anchor.deviceHeight': getSwiperHeight()
                })
            })
    },
    startEditor() {
        var that = this;
        // this.setData({
        //     'showLoading': true
        // })
        setTimeout(function () {
            wx.showToast({
              title: '模版应用中...',
              icon: 'loading',
              duration: 9999999,
              mask: true
            })
          }, 0); //延迟时间
        console.log(that.data.selectItems)
        wx.request({
            url: app.globalData.videoBaseUrl + "/boss/bossliu/clientcao/concat",
            method: 'POST',
            header: {
                // 'Content-Type': 'application/x-www-form-urlencode'
                'Content-Type': 'application/json'
            },
            data: {
                "files": that.data.selectItems
            },
            success: function(res) {
                console.log(res.data)
                console.log(res.data.videoUrl)
                var videoUrl = res.data.videoUrl
                console.log(videoUrl)
                setTimeout(function () {
                    wx.showToast({
                      title: '视频生成成功',
                      icon: 'success',
                      duration: 1500,
                      mask: true
                    })
                  }, 0); //延迟时间
                app.globalData.selectItems = that.data.selectItems;
                wx.navigateTo({
                    url: '../editor/editor?videoUrl=' + videoUrl
                })
            },
        });
    },
})