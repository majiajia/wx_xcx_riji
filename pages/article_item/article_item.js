// pages/case_item/case_item.js
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        content : "",
        id : "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;

        var id = options.id;
        that.setData({
            id : id,
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (options) {
        var that = this;
        var id = that.data.id;
        
        app.getUserInfo(function(user_info) {
            var user_id = user_info.user_id;
            var sign = user_info.sign;
            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/riji_new/article/get_article_item.php',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    user_id : user_id,
                    sign : sign,
                    id : id,
                },
                method: 'POST',
                success: function (res) {
                    var res_status = parseInt(res.data.status);
                    var res_msg = res.data.msg;
                    var res_data = res.data.data;
                    if (res_status != 0) {
                        wx.showToast({
                            title: res_msg,
                            mask : true,
                            duration: 3000,
                        });
                    } else {
                        var res_status = parseInt(res_data.status);
                        
                        that.setData({
                            title : res_data.title,
                            content : res_data.content,
                            id : id,
                            create_at : res_data.create_at,
                            update_at : res_data.update_at,
                        });
                    }
                },
                fail: function (res) {
                    wx.hideLoading();
                },
                complete: function (res) {
                    wx.hideLoading();
                }
            })    

        });
    },

    delete_item:function(res) {
        var id = res.currentTarget.dataset.id;
        wx.showModal({
            title: '确定要删除这篇文章吗?',
            content: '确定要删除这篇文章吗',
            showCancel: true,
            cancelText: '不删除',
            cancelColor: '#000000',
            confirmText: '删除',
            confirmColor: '#3CC51F',
            success: (result) => {
                if(result.confirm){
                    app.getUserInfo(function(user_info){
                        var user_id = user_info.user_id;
                        var sign = user_info.sign;
                        
                        wx.request({
                                url: 'https://xcx.hnfabang.cn/xcx/riji_new/article/delete_article_item.php',
                                header: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                data: {
                                    user_id : user_id,
                                    sign : sign,
                                    id : id,
                                },
                                method: 'POST',
                                success: function (res) {
                                    var res_status = parseInt(res.data.status);
                                    var res_msg = res.data.msg;
                                    var res_data = res.data.data;
                                    if (res_status != 0) {
                                        wx.showToast({
                                            title: res_msg,
                                            mask : true,
                                            duration: 3000,
                                        });
                                    } else {
                                        var res_status = parseInt(res_data.status);
                                        wx.navigateBack({
                                            delta: 1
                                        });
                                    }
                                },
                                fail: function (res) {
                                    wx.hideLoading();
                                },
                                complete: function (res) {
                                    wx.hideLoading();
                                }
                            })

                    })
                }
            },
        });
    },
    edit_item:function(res) {
        var id = res.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/edit_article/edit_article?id=' + id,
        });
    }
})