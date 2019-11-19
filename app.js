//app.js
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        this.globalData.cart = wx.getStorageSync('cart') || []
        this.renderCartBadge()

        // 登录
        wx.login({
                success: res => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                }
            })
            // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        cart: [],
        // 被勾选的购物车数量
        total: 0
    },
    // 动态计算徽章的值
    renderCartBadge() {
        let num = 0
        this.globalData.cart.forEach(e => {
            if (e.isCheck) {
                num += e.count
            }
        })
        this.globalData.total = num
        wx.setTabBarBadge({
            index: 3,
            text: '' + num
        })

    },
    addGoodsCart(goods) {
        var that = this
            // console.log(this);
        const i = this.globalData.cart.findIndex(item => item.id === goods.goods_id)
            // console.log(i);
            // 如果i=-1，说明商品没有添加过，如果不等于-1，商品已经添加过，只需要更新数量即可
        if (i !== -1) {
            this.globalData.cart[i].count++
                wx.setStorageSync('cart', this.globalData.cart)
            this.renderCartBadge()
            return;
        }
        // 梳理出来商品信息对象
        const info = {
                id: goods.goods_id,
                name: goods.goods_name,
                pic: goods.goods_small_logo,
                price: goods.goods_price,
                count: 1,
                isCheck: true
            }
            // 将传递过来的数据进行保存
        this.globalData.cart.push(info)
            // 将数据保存到本地的sessionStorage中
        wx.setStorageSync('cart', this.globalData.cart)
        this.renderCartBadge()
            // console.log(this.globalData.cart);
    },
    // 更新商品数量
    updateCartCount(id, count) {
        const i = this.globalData.cart.findIndex(item => item.id == id)
        if (i !== -1) {
            this.globalData.cart[i].count = count
            wx.setStorageSync('cart', this.globalData.cart)
            this.renderCartBadge()
            return;
        }
    },
    // 商品选中状态
    checkedChange(status, id) {
        const i = this.globalData.cart.findIndex(item => item.id == id)
        if (i !== -1) {
            this.globalData.cart[i].isCheck = status
                // console.log(this.globalData.cart)
            wx.setStorageSync('cart', this.globalData.cart)
            this.renderCartBadge()
                // console.log("ok")
        }
    },
    // 删除商品
    removeGoods(id) {
        const i = this.globalData.cart.findIndex(item => item.id == id)
        if (i !== -1) {
            this.globalData.cart.splice(i, 1)
            wx.setStorageSync('cart', this.globalData.cart)
            this.renderCartBadge()
        }
    },
    // 点击全选
    allCheckedChange(status) {
        this.globalData.cart.forEach(e => {
            e.isCheck = status
        })
        wx.setStorageSync('cart', this.globalData.cart)
        this.renderCartBadge()
    }
})