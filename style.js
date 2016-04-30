//封装改变任意样式函数
  function changeStyle(obj,json,fn) {
      //增加obj，形成一一对应的样式变化，一开始就清除所有定时器
      var flag = true;//假设所有运动都到达目标值
      clearInterval(obj.timer);
      obj.timer = setInterval(function () {
        //添加json数据形式，实现同时多运动
      for(var attr in json)
      {
        //1.设置属性值
        var icur = 0;
        if (attr == 'opacity') {
          icur = Math.round(parseFloat(getStyle(obj,attr))*100);
        }else{
          icur = parseInt(getStyle(obj,attr));
        }
        //2.计算速度
        var speed = (json[attr] - icur)/5;
        speed = speed>0?Math.ceil(speed):Math.floor(speed);
        //3.判断停止
        if (icur != json[attr]) {
          //所有运动条件是否满足
          flag = false;
          if (attr == 'opacity') {
            obj.style.filter = 'alpha(opacity:'+(icur+speed)+')';
            obj.style.opacity = (icur+speed)/100;
          }else{
             obj.style[attr] = icur + speed +'px';
          }
        }
      }
      //当所有运动都到达目标，才停止计时器
      if (flag) {
        clearInterval(obj.timer);
          //判断是否有回调函数
            if (fn) {
              fn();
            }
      }
      },50);
    }
//getStyle函数，取得属性值
  function getStyle(obj,attr) {
    if (obj.currentStyle) {
      return obj.currentStyle[attr]
    }else{
      return getComputedStyle(obj,false)[attr];
    }
  }