//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    num: ['★', '★', '★', '★', '★', '★', '★', '★', '★'],
    hidden: true,
    success: '',
    time:0,
    t:''              //定时器
  },
  onLoad: function () {
    
  },
  //随机打乱数组
  sortArr: function (arr) {
    return arr.sort(function () {
      return Math.random() - 0.5
    })
  },
  onMoveTap: function (e) {
    var index = e.currentTarget.dataset.index;
    var item = e.currentTarget.dataset.item;
    if (this.data.num[index + 3] == 9) {
      this.down(e);
    }
    if (this.data.num[index - 3] == 9) {
      this.up(e);
    }
    if (this.data.num[index + 1] == 9 && index != 2 && index != 5) {
      this.right(e);
    }
    if (this.data.num[index - 1] == 9 && index != 3 & index != 6) {
      this.left(e);
    }
  },
  up: function (e) {
    var index = e.currentTarget.dataset.index; //当前数字下标
    var temp = this.data.num[index];
    this.data.num[index] = this.data.num[index - 3]
    this.data.num[index - 3] = temp;
    this.setData({
      num: this.data.num
    })
    if (this.data.num.toString() == [1, 2, 3, 4, 5, 6, 7, 8, 9].toString()) {
      this.success();
    }
  },
  down: function (e) {
    var index = e.currentTarget.dataset.index; //当前数字下标
    var temp = this.data.num[index];
    this.data.num[index] = this.data.num[index + 3]
    this.data.num[index + 3] = temp;
    this.setData({
      num: this.data.num
    })
    if (this.data.num.toString() == [1, 2, 3, 4, 5, 6, 7, 8, 9].toString()) {
      this.success();
    }
  },
  left: function (e) {
    var index = e.currentTarget.dataset.index; //当前数字下标
    var temp = this.data.num[index];
    this.data.num[index] = this.data.num[index - 1]
    this.data.num[index - 1] = temp;
    this.setData({
      num: this.data.num
    })
    if (this.data.num.toString() == [1, 2, 3, 4, 5, 6, 7, 8, 9].toString()) {
      this.success();
    }
  },
  right: function (e) {
    var index = e.currentTarget.dataset.index; //当前数字下标
    var temp = this.data.num[index];
    this.data.num[index] = this.data.num[index + 1]
    this.data.num[index + 1] = temp;
    this.setData({
      num: this.data.num
    })
    if (this.data.num.toString() == [1, 2, 3, 4, 5, 6, 7, 8, 9].toString()) {
      this.success();
    }
  },
  success: function () {
    var that = this;
    that.setData({
      success: 'you win !'
    })
    wx.showToast({
      title: '闯关成功',
      icon: 'success',
      success: function () {
        that.init();
      }
    })
  },
  fail: function () {
    var that = this;
    that.setData({
      success: 'you lost !'
    })
    wx.showToast({
      title: '闯关失败',
      icon: 'loading',
      success: function () {
        that.init();
      }
    })
  },
  //初始化拼图
  init:function(){
    this.setData({
      num:this.sortArr([1,2,3,4,5,6,7,8]).concat([9])
    })
  },
  timeCount:function(){
    var that = this;
    var timer = that.data.time;
    that.setData({
      t:setInterval(function(){
        timer++;
        that.setData({
          time:timer
        })
      },1000)
    })
  },
  timeBegin:function(){
    clearInterval(this.data.t);
    this.setData({
      time:0
    })
    this.timeCount();
    this.init();
  },
  timeStop:function(){
    clearInterval(this.data.t);
    if (this.data.num.toString() != [1, 2, 3, 4, 5, 6, 7, 8, 9].toString()) {
      this.fail();
    }
  }
})