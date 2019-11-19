// pages/goods_list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 查询关键词
        query: '',
        // 分类id
        cid: '',
        // 默认页
        pagenum: 1,
        // 每页的长度
        pagesize: 20,
        // 商品列表数据
        goodsList: [],
        // 数据总条数
        total: 0,
        // 数据加载完毕控制是否显示，默认为false
        isover: false,
        // 避免重复发起请求，判断是否正在发起请求中
        isLoading: false
    },
    goodsDetail(e) {
        // console.log(e)
        wx.navigateTo({
            url: '/pages/goods_detail/main?goods_id=' + e.target.dataset.id
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options)
        this.setData({
            query: options.query || '',
            cid: options.cid || ''
        })
        this.getGoodsList()
    },
    // 请求商品列表
    getGoodsList(callBack) {
        var that = this
        that.setData({
            isLoading: true
        })
        wx.request({
            url: 'https://www.zhengzhicheng.cn/api/public/v1/goods/search',
            data: {
                query: this.data.query,
                cid: this.data.cid,
                pagenum: this.data.pagenum,
                pagesize: this.data.pagesize
            },
            success(res) {
                // console.log(res);
                if (res.data.meta.status !== 200) {
                    return wx.showToast({
                        title: '获取数据失败',
                        icon: 'none',
                        duration: 1500
                    })
                }
                that.setData({
                    goodsList: [...that.data.goodsList, ...res.data.message.goods],
                    total: res.data.message.total,
                    isLoading: false
                })
            }

        })
        callBack && callBack()

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
        // 将页面必要数据进行初始化
        this.setData({
            query: '',
            cid: '',
            pagenum: 1,
            pagesize: 20,
            goodsList: [],
            total: 0,
            isover: false,
            isLoading: false
        })
        this.getGoodsList()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        // 判断此时是否正在发起请求
        if (this.data.isLoading) {
            return;
        }
        // 先判断此时是否还有下一页
        if (this.data.pagenum * this.data.pagesize >= this.data.total) {
            this.setData({
                isover: true
            })
            return;
        }
        this.data.pagenum++
            //     console.log(this.data.pagenum);

            this.setData({
                pagenum: this.data.pagenum
            })
            // console.log(this.data.pagenum);

        this.getGoodsList(() => {
            // 停止当前页面的下拉刷新行为
            wx.stopPullDownRefresh()
        })

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})