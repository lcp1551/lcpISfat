思路&功能：
1.初始化，将数字1~8存放在数组中，随机打乱后拼接一个9(空白格),修改空白格的样式
2.点击数字，判断空白格对于其所在位置的方向，进行相应的上下左右移动
3.上下左右移动，及把移动的两个数字互换在数组中的位置
4.判断数组中元素是否是[1,2,3,4,5,6,7,8,9]，是则游戏成功，
5.计时，利用定时器，结束，清除定时器

代码：

项目中所用到的数据：data: {    
    num: ['★', '★', '★', '★', '★', '★', '★', '★', '★'],   //初始化前    
    hidden: true,   //隐藏空白格中的数字    
    time:0,           //秒数    
    t:''                  //定时器  
},
构建页面：index.wxml
<view class="container">
  <view class="row" wx:for="{{num}}" wx:for-item="item" wx:for-index="index">
    <button class="btn {{item == 9?'active':''}}" catchtap='onMoveTap'  data-item="{{item}}" data-index="{{index}}">{{item}}</button>
  </view>
</view>

需要传两个数据过去，一个是被点击块的下标index和块中的数字item动态为空白格[9]添加样式active{{item == 9?'active':''}}

游戏初始化：
init:function(){
    this.setData({
      num:this.sortArr([1,2,3,4,5,6,7,8]).concat([9])
    })
  },
  
  初始化的时候，这里用了sortArr(arr)打乱数组，并拼接个空白格[9]，这样让空白格初始化的时候永远处于最后一位。
 
 
 随机打乱数组:
  sortArr: function (arr) {
    return arr.sort(function () {
      return Math.random() - 0.5
    })
  }
  
  这里用了最简单的打乱方法，缺点就是打乱不完全
  
  给每个块添加点击事件
  
  onMoveTap:onMoveTap: function (e) {
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
    }
    如果空白格的下标比所点击的块的下表大3，则表示空白格在所点击块的下方，那么点击后向下移动；
    如果空白格的下标比所点击的块的下表小3，则表示空白格在所点击块的上方，那么点击后向上移动；
    如果空白格的下标比所点击的块的下表大1，则表示空白格在所点击块的右方，那么点击后向右移动，需考虑点击快是否在容器右边缘；
    如果空白格的下标比所点击的块的下表小1，则表示空白格在所点击块的左方，那么点击后向左移动，需考虑点击快是否在容器左边缘；
    
    移动：以向上移动举例 
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
  }
  
  移动后，将所点击块与空白格互换在数组中的位置，并判断目前的数组是否满足游戏成功的条件，判断数组相等，我这里把数组转化成字符串做的比较
  
  游戏成功：
  success: function () {
    var that = this;
    wx.showToast({
      title: '闯关成功',
      icon: 'success',
      success: function () {
        that.init();
      }
    })
  }
  游戏成功，弹出交互反馈窗口，并初始化重新打乱数组
  
  定时器： timeCount:function(){
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
  }
  
  开始结束游戏：
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
  
  给开始按钮绑定timeBegin事件，初始化游戏给结束按钮绑定timeStop事件，判断是否游戏成功

