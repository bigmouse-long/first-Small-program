// pages/cates/cates.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 分类数据
        catesList: [],
        // 被选中的侧边栏
        active: 0,
        // 当前屏幕可用高度
        wh: 0,
        // 二级分类数据
        secondCates: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getCatesList()
        this.getWindowHeight()
    },
    // 侧边栏选中
    onChange(e) {
        // 二级分类数据
        this.setData({
            // 为二级分类添加新的值
            secondCates: this.data.catesList[e.detail].children
        })
    },
    // 跳转到商品详情页
    goodsList(e) {
        wx.navigateTo({
            url: '/pages/goods_list?cid=' + e.target.dataset.id
        })
    },
    // 获取屏幕高度
    getWindowHeight() {
        var that = this
        wx.getSystemInfo({
            success: function(res) {
                if (res.errMsg == 'getSystemInfo:ok') {
                    that.setData({
                        wh: res.windowHeight
                    })
                }
            }
        })
    },
    // 获取一级分类数据
    getCatesList() {
        var that = this
        wx.request({
            url: "https://www.zhengzhicheng.cn/api/public/v1/categories",
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
                    // 页面加载默认选中大家电数据
                    secondCates: res.data.message[0].children,
                    catesList: res.data.message
                })
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