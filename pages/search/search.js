// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 输入框的值
        value: "",
        //  搜素框的相关值
        searchList: [],
        // 搜素历史列表
        historyList: [],
        // 判断是否显示搜素列表和历史列表
        isShow: true

    },
    // 导航跳转到商品详情页
    goodsList(e) {
        // console.log(e)
        wx.navigateTo({
            url: '/pages/goods_detail/main?id=' + e.target.dataset.id,
        })
    },
    // 确定搜素时触发
    onSearch(e) {
        // e.detail 确定搜素输入的值
        // console.log(e.detail);
        var kw = e.detail.trim()
            // console.log(kw)
        if (kw.length <= 0) {
            return;
        }
        // 判断是否已经存储过输入的值
        if (this.data.historyList.indexOf(kw) === -1) {
            this.data.historyList.unshift(kw)
        }
        // console.log(historyLists)
        // 将搜素历史的值进行截取
        this.setData({
                historyList: this.data.historyList.slice(0, 10)
            })
            // 将搜素历史存储在storage中
        wx.setStorageSync('historyList', this.data.historyList)
        wx.navigateTo({
            url: '/pages/goods_list?query=' + e.detail
        })

    },
    // 清除全部的历史搜索记录
    clearHistory() {
        this.setData({
                historyList: []
            })
            // 删除存储在storage中的值
        wx.setStorageSync('hishistoryListt', '[]')
    },
    // 导航到详情页
    goodsList(e) {
        wx.navigateTo({
            url: "/pages/goods_list?query=" + e.target.dataset.query
        })
    },
    isShowHistory() {
        if (this.data.value.trim().length <= 0) {
            return false
        }
        return true
    },
    // 搜素框内容发生变化
    onChange(e) {
        if (e.detail.trim().length <= 0) {
            this.setData({
                searchList: []
            })
            return;
        }
        var isShow = this.isShowHistory()
            // console.log(isShow)
        this.setData({
            value: e.detail.trim(),
            isShow: isShow
        })
        this.getSuggestData(e.detail)
    },

    // 取消搜素时触发
    onCancel() {
        this.setData({
            searchList: []
        })
    },
    // 发起获取建议列表请求
    getSuggestData(searchStr) {
        var that = this
        wx.request({
            url: "https://www.zhengzhicheng.cn/api/public/v1/goods/qsearch",
            data: {
                query: searchStr
            },
            success(res) {
                // console.log(res)
                if (res.data.meta.status !== 200) {
                    return wx.showToast({
                        title: "获取数据失败",
                        icon: "none",
                        duration: 1500
                    })
                }
                that.setData({
                    searchList: res.data.message
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const historyList = wx.getStorageSync('historyList') || []
            // console.log(historyList);
        var isShow = this.isShowHistory()
            // console.log(isShow);
        this.setData({
            historyList: historyList,
            isShow: isShow
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