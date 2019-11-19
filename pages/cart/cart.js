// pages/cart/cart.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 购物车信息
        cartInfo: [],
        // 确定是否显示购物车
        isEmpty: false,
        // 总钱数
        allMoney: 0,
        // 全选
        allChecked: false
    },
    // 提交订单
    submitOrder() {
        if (this.data.allMoney <= 0) {
            return wx.showToast({
                title: "订单金额不能为空",
                icon: "none",
                duration: 1500
            })
        }
        wx.navigateTo({
            url: '/pages/order',

        })
    },
    // 点击全选按钮
    allChange(e) {
        // console.log(e)
        getApp().allCheckedChange(e.detail)
        const cart = wx.getStorageSync('cart')
        this.setData({
            cartInfo: cart
        })
        this.allChecked()
        let a = 0
        this.data.cartInfo.forEach(e => {
            if (e.isCheck) {
                a += 1
            }
        })
        if (a >= 1) {
            this.account()
        } else {
            this.setData({
                allMoney: 0
            })
        }


    },
    // 判断是否全选
    allChecked() {
        // console.log(this.data.cartInfo)
        let i = 0
        this.data.cartInfo.forEach(e => {
            if (e.isCheck) {
                i += 1
                    // console.log(i)
            }
        })
        if (i === this.data.cartInfo.length) {
            this.setData({
                allChecked: true
            })
        } else {
            this.setData({
                allChecked: false
            })
        }

        // console.log(this.data.allChecked)
    },
    // 计算总价格
    account() {
        let total = 0
        this.data.cartInfo.forEach(e => {
            if (e.isCheck) {
                // console.log(e)
                total += e.price * e.count
                this.setData({
                    allMoney: total * 100
                })
            }
        });
    },
    // 删除商品
    clearGoods(e) {

        getApp().removeGoods(e.target.dataset.id)
        const cart = wx.getStorageSync('cart')
        this.setData({
            cartInfo: cart
        })
        this.account()

    },
    // 监听复选框是否被选中的状态
    statusChange(e) {
        // 复选框的状态
        // console.log(this)
        // console.log(e.detail)
        // 点击项的id
        // console.log(e.target.dataset.id)
        getApp().checkedChange(e.detail, e.target.dataset.id)
        const cart = wx.getStorageSync('cart')
        this.setData({
            cartInfo: cart
        })
        let a = 0
        this.data.cartInfo.forEach(e => {
            if (e.isCheck) {
                a += 1
            }
        })
        if (a >= 1) {
            this.account()
        } else {
            this.setData({
                allMoney: 0
            })
        }

        this.allChecked()

    },
    // 购物车中数量的改变
    changeCount(e) {
        // 当前商品的数量
        // console.log(e.detail)
        // 当前商品的id
        // console.log(e.target.dataset.id)
        getApp().updateCartCount(e.target.dataset.id, e.detail)
        const cart = wx.getStorageSync('cart')
        this.setData({
            cartInfo: cart
        })
        this.account()

    },
    // 判断购物车是否为空
    isEmpty() {
        if (this.data.cartInfo.length <= 0) {
            return;
        }
        this.setData({
            isEmpty: true
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 读取全局的购物车信息
        const cart = getApp().globalData.cart
        this.setData({
            cartInfo: cart
        })
        this.account()
        this.allChecked()
            // console.log(this.data.cartInfo)
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