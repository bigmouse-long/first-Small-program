// pages/goods_detail/main.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 商品id
        goods_id: '',
        // 商品信息
        goodsInfo: '',
        // 收货地址
        addressInfo: null,
        // 被勾选的购物车数量
        count: 0
    },
    total() {
        var num = getApp().globalData.total
        this.setData({
            count: num
        })
    },
    // 添加到购物车
    addCartTo() {
        // 调用全局的方法
        getApp().addGoodsCart(this.data.goodsInfo)

        // getApp().globalData.cart = this.data.goodsInfo
        // console.log(getApp().globalData.cart)
        // console.log(this.data.goodsInfo)
        // 提示已经加入购物车成功
        wx.showToast({
            title: "加入购物车成功",
            icon: "success"
        })
        this.total()
    },
    //图片预览
    previewImg(e) {
        wx.previewImage({
            // 表示当前查看的图片路径
            current: e.target.dataset.url,
            // 当前所有图片的路径
            urls: this.data.goodsInfo.pics.map(item => item.pics_big)
        })
    },
    address() {

        if (this.data.addressInfo == null) {
            this.setData({
                addressInfo: '请选择收货地址'
            })
        } else {
            const res = this.data.addressInfo
            this.setData({
                addressInfo: res.provinceName + res.cityName + res.countyName + res.detailInfo
            })
        }
        return this.data.addressInfo;


    },
    // 选择收货地址
    chooseAddress() {
        var that = this
        wx.chooseAddress({
            success(res) {
                if (res.errMsg !== 'chooseAddress:ok') {
                    wx.showToast({
                        title: "获取地址失败",
                        icon: "none",
                        duration: 1500
                    })
                }
                that.setData({
                    addressInfo: res
                })
                wx.setStorageSync('address', res)
            }
        })
    },
    // 发起请求，得到商品的具体数据
    getGoodsInfo() {
        var that = this
        wx.request({
            url: 'https://www.zhengzhicheng.cn/api/public/v1/goods/detail',
            data: {
                goods_id: this.data.goods_id
            },
            success(res) {
                // console.log(res);
                if (res.data.meta.status !== 200) {
                    return wx.showToast({
                        title: '获取数据失败',
                        icon: "none",
                        duration: 1500
                    })
                }
                that.setData({
                    goodsInfo: res.data.message
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options);
        this.setData({
                goods_id: options.goods_id
            })
            // var res = wx.getStorageSync("address")
            // console.log(res);

        this.setData({
            addressInfo: wx.getStorageSync("address")
        })
        this.getGoodsInfo()
        this.address()
        this.total()
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