// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 轮播图数据
        swiperList: [],
        // 分类数据
        catesList: [],
        // 楼层数据
        floorList: []
    },

    goodsList: function(e) {
        // console.log(e)
        // 实现跳转页面
        wx.navigateTo({
            url: e.target.dataset.url
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getSwiperData()
        this.getCatesData()
        this.getFloorData()
    },
    // 获取轮播图数据
    getSwiperData() {
        var that = this
        wx.request({
            url: "https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata",
            success(res) {
                // console.log(res);
                if (res.data.meta.status !== 200) {
                    return wx.showToast({
                        title: "获取数据失败",
                        icon: "none",
                        duration: 1500
                    })
                }
                that.setData({
                        swiperList: res.data.message
                    })
                    // console.log(that.data.swiperList);
            }
        })
    },
    // 获取分类数据
    getCatesData() {
        var that = this
        wx.request({
            url: 'https://www.zhengzhicheng.cn/api/public/v1/home/catitems',
            method: 'GET',
            success: function(res) {
                // console.log(res);
                if (res.data.meta.status !== 200) {
                    return wx.showToast({
                        title: "获取数据失败",
                        icon: "none",
                        duration: 1500
                    })
                }
                that.setData({
                        catesList: res.data.message
                    })
                    // console.log(that.data.catesList);
            },

        })
    },
    getFloorData() {
        var that = this;
        wx.request({
            url: 'https://www.zhengzhicheng.cn/api/public/v1/home/floordata',
            method: 'GET',
            success: function(res) {
                // console.log(res);

                if (res.data.meta.status !== 200) {
                    return wx.showToast({
                        title: "获取数据失败",
                        icon: "none",
                        duration: 1500
                    })
                }
                that.setData({
                        floorList: res.data.message
                    })
                    // console.log(that.data.floorList);

            }

        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})