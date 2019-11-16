var app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        article_list_is_empty : false,
        search_word:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that = this;
        wx.showLoading({
            title: '加载中...',
            mask: true,
        });
        app.getUserInfo(function(user_info){
            var user_id = user_info.user_id;
            var sign = user_info.sign;

            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/riji_new/article/get_article_list.php',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    user_id : user_id,
                    sign : sign,
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
                        that.setData({
                            article_list : res_data,
                        });
                        var article_list_len = parseInt(that.data.article_list.length) ;

                        if(article_list_len <= 0) {
                            that.setData({
                                article_list_is_empty:true,
                            });
                        } else {
                            that.setData({
                                article_list_is_empty:false,
                            });
                        }
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

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    see_item:function(res) {
        var that = this;
        var id = res.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/article_item/article_item?id=' + id,
            fail: ()=>{
                wx.showToast({
                    title: '找不到对应的文章',
                    icon: 'none',
                    duration: 1500,
                });
            },
        });
    },
    nav_to_add_article:function(res){
        wx.navigateTo({
            url: '/pages/add_article/add_article',
        });
    },
    handle_search:function(res) {
        var that = this;
        app.getUserInfo(function(user_info){
            var user_id = user_info.user_id;
            var sign = user_info.sign;

            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/riji_new/article/get_article_list.php',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    user_id : user_id,
                    sign : sign,
                    keyword : that.data.search_word,
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
                        that.setData({
                            article_list : res_data,
                        });
                        var article_list_len = parseInt(that.data.article_list.length) ;

                        if(article_list_len <= 0) {
                            that.setData({
                                article_list_is_empty:true,
                            });
                        } else {
                            that.setData({
                                article_list_is_empty:false,
                            });
                        }
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
    handle_input_search_word:function(res) {
        var that = this;
        var search_word = res.detail.value;
        that.setData({
            search_word : search_word,
        });
    },
})