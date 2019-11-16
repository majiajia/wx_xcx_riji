//app.js
App({
    onLaunch: function () {
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
                            this.globalData.userInfo = res.userInfo;
                            
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res);
                            }
                        }
                    })
                }
            }
        })
    },
    onShow:function(options) {
        var scene_option = wx.getLaunchOptionsSync();
        
        console.log(scene_option.query);
 
    },
    getUserInfo: function (cb) {
        var that = this;
        
        if(that.globalData.user_id == "" || that.globalData.sign == "" || that.globalData.open_id == "") {
            wx.login({
                success: function(data) {
                    var code = data.code;
                    wx.request({
                        url: 'https://xcx.hnfabang.cn/xcx/riji_new/user_info/get_user_session.php',
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: {
                            code: code,
                        },
                        method: 'POST',
                        success: function (res) {
                            var res_status = parseInt(res.data.status);
                            var res_data = res.data.data;
                            var res_msg = res.data.msg;
    
                            if (res_status != 0) {
                                wx.showModal({
                                    title: res_msg,
                                    content: res_msg,
                                    showCancel: false,
                                    confirmText: '确定',
                                    confirmColor: '#3CC51F',
                                    success: function(result)  {
                                        
                                    },
                                    fail: function(result){
                                
                                    },
                                    complete: function(result){
                                    
                                    }
                                });
                            }
                            var user_id = res_data.user_id;
                            var sign = res_data.sign;
                            var open_id = res_data.open_id;

                            that.globalData.user_id = user_id;
                            that.globalData.sign = sign;
                            that.globalData.open_id = open_id;

                            var user_info = {
                                user_id: user_id,
                                sign: sign,
                                open_id : open_id,
                            }
                            
                            typeof cb == "function" && cb(user_info);
                        },
                        fail: function (res) {
    
                        },
                        complete: function (res) {
    
                        }
                    })
                }
            })
        } else {
            var user_info = {
                user_id : that.globalData.user_id,
                sign : that.globalData.sign,
                open_id : that.globalData.open_id,
            }
            typeof cb == "function" && cb(user_info);
        }
    },
    globalData: {
        userInfo: null,
        user_id : "",
        sign : "",

    }
})