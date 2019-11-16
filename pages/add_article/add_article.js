// pages/case_item/case_item.js
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        content:"",
        title : "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (options) {
        
    },

    save_item:function(res) {
        var that = this;

        var id = res.currentTarget.dataset.id;
        var info = res.detail.value;

        var title = info.title;
        var content = info.content;

        app.getUserInfo(function(user_info){
            var user_id = user_info.user_id;
            var sign = user_info.sign;

            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/riji_new/article/add_article_item.php',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    user_id : user_id,
                    sign : sign,
                    title : title,
                    content : content,
                },
                method: 'POST',
                success: function (res) {
                    var res_status = parseInt(res.data.status);
                    var res_msg = res.data.msg;
                    var res_data = res.data.data;
                    if (res_status != 0) {
                        wx.showToast({
                            title: '更新失败',
                            icon: 'fail',
                            duration: 1500,
                            mask: false,
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
        });
    }
})