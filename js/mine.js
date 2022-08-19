  // 全局
  var table = document.querySelector('table');
  var tbody = table.querySelector('tbody');
  var sumarr = [];
  var tablearr = [];
  // 搞个数组来存已经被递归过的格子
  var hadopenarr = []
  var text = document.querySelector('.text')


  // 创建雷盘
  var createtable = function () {
      for (var i = 0; i < 10; i++) {
          tbody.insertAdjacentHTML("beforeend", "<tr></tr>");
      }
      var tr = tbody.querySelectorAll('tr');
      for (var j = 0; j < tr.length; j++) {
          var trr = tr[j]
          for (var i = 0; i < 10; i++) {
              trr.insertAdjacentHTML('beforeend', '<td><div></div></td>');
              var td = trr.querySelectorAll('td');
              td[i].id = j + '' + i
          }
      }
  }
  // 生成雷数组
  var createminearr = function () {
      for (var a = 0; a < 10; a++) {
          var x = parseInt(Math.random() * 10);//转为整数
          var y = parseInt(Math.random() * 10);
          sumarr[a] = [x, y];

      }

  }
  // 随机插雷
  var createmine = function () {
      createminearr();
      // 基础算法：找出数组中重复出现的元素
      sumarr = ifexit(sumarr)
      for (var a = 0; a < sumarr.length; a++) {
          var tr = tbody.querySelectorAll('tr');
          // 每一行tr
          var trr = tr[sumarr[a][0]];
          //  每一个tr的td
          var td = trr.querySelectorAll('td');
          td[sumarr[a][1]].id = 'x'
          var div = td[sumarr[a][1]].querySelector('div');
          div.innerHTML = "雷";
          // 注意这边的xy反了
      }
  }
  // 判断雷数组是否重复并替换掉
  var ifexit = function (arr) {
      for (var i = 0; i < arr.length - 1; i++) {
          for (var j = i + 1; j < arr.length; j++) {
              if (arr[i][0] == arr[j][0] && arr[i][1] == arr[j][1]) {
                  arr.splice(j, 1)
                  var x = parseInt(Math.random() * 10);//转为整数
                  var y = parseInt(Math.random() * 10);
                  arr.push([x, y]);
                  ifexit(arr);//递归
              }
          }
      }
      return arr
  }
  // 计算每一个格子周围的雷数
  var sum = function () {
      var tr = tbody.querySelectorAll('tr');
      for (var i = 0; i < tr.length; i++) {
          // 每一行tr的全部td
          var td = tr[i].querySelectorAll('td');
          for (var j = 0; j < td.length; j++) {
              var div = td[j].querySelector('div');
              var num = 0;
              for (var a = 0; a < sumarr.length; a++) {
                  if (i == sumarr[a][0] && j == sumarr[a][1]) {
                      break;

                  } else {
                      if (i - 1 == sumarr[a][0] && j - 1 == sumarr[a][1]) {
                          num += 1;
                      } else if (i - 1 == sumarr[a][0] && j == sumarr[a][1]) {
                          num += 1;
                      } else if (i - 1 == sumarr[a][0] && j + 1 == sumarr[a][1]) {
                          num += 1;
                      } else if (i == sumarr[a][0] && j - 1 == sumarr[a][1]) {
                          num += 1;
                      } else if (i == sumarr[a][0] && j + 1 == sumarr[a][1]) {
                          num += 1;
                      } else if (i + 1 == sumarr[a][0] && j - 1 == sumarr[a][1]) {
                          num += 1;
                      } else if (i + 1 == sumarr[a][0] && j == sumarr[a][1]) {
                          num += 1;
                      } else if (i + 1 == sumarr[a][0] && j + 1 == sumarr[a][1]) {
                          num += 1;
                      }
                  }
                  //每一个td，即y坐标 j
                  // 此td的tr，即x坐标 i
                  if (a == sumarr.length - 1) {
                      num = parseInt(num)
                      div.innerHTML = num;

                  }
              }
          }
      }
  }

  //绑定点击事件
  var clickopen = function () {
      var tr = tbody.querySelectorAll('tr');
      for (var i = 0; i < tr.length; i++) {
          var td = tr[i].querySelectorAll('td');
          for (var j = 0; j < td.length; j++) {
              // 普通格子点击开盖事件
              td[j].addEventListener('click', click)
          }
      }
      // 点到雷

      for (var a = 0; a < sumarr.length; a++) {
          var td = tr[sumarr[a][0]].querySelectorAll('td');
          td[sumarr[a][1]].addEventListener('click', function () {
              // 打开雷
              if (this.className != 'on') {
                  openmine();
                  text.innerHTML = "点到雷，输了"
                  text.style.color='red'

                  // 雷移除点击开盖事件

                  for (var i = 0; i < tr.length; i++) {
                      var td = tr[i].querySelectorAll('td');
                      for (var j = 0; j < td.length; j++) {
                          // 普通格子移除点击开盖事件
                          td[j].removeEventListener('click', click)

                      }
                  }
              }
          })
      }
      // 右键插棋子
      for (var j = 0; j < tr.length; j++) {
          var td = tr[j].querySelectorAll('td')
          for (var i = 0; i < td.length; i++) {
              td[i].addEventListener('contextmenu', function (e) {
                  if (this.className != 'open') {
                      if (this.className != 'on') {
                          this.style.backgroundColor = 'red';
                          this.removeEventListener('click', click);
                          this.className = 'on'
                      
                   
                      } else {
                          this.style.backgroundColor = '#bbb'
                          this.addEventListener('click', click);
                        
                          this.className = ''
                          
                      }
                  }
                  e.preventDefault();
              })
          }
      }
  }

  // 点击函数
  var click = function () {
      var div = this.querySelector('div');
      div.style.visibility = 'visible';
      this.style.backgroundColor = '#e5e5e5';
      clickzero(this)
      if (this.id != 'x' && hadopenarr.indexOf(this.id) == -1) {
          hadopenarr.push(this.id)
     
      }
      // 扫雷成功判断
      if (hadopenarr.length == 90) {
          openmine()
          text.innerHTML = "你赢啦！"
          text.style.color='green'
      }

  }
  // 点到0
  var clickzero = function (that) {
      var div = that.querySelector('div')
      if (div.outerText == 0) {
          // 获取坐标
          // 左侧
          if (that.id.charAt(1) != 0) {
              var zuo = (parseInt(that.id) - 1) + ''
              // 上
              if (that.id.charAt(0) != 0) {
                  var zuoshang = (parseInt(that.id) - 11) + ''
                  otheropen(zuoshang)
              }
              // 下
              if (that.id.charAt(0) != 9) {
                  var zuoxia = (parseInt(that.id) + 9) + ''
                  otheropen(zuoxia)
              }
              otheropen(zuo)
          }
          // 右侧
          if (that.id.charAt(1) != 9) {
              var you = (parseInt(that.id) + 1) + ''
              // 上
              if (that.id.charAt(0) != 0) {
                  var youshang = (parseInt(that.id) - 9) + ''
                  otheropen(youshang)
              }
              // 下
              if (that.id.charAt(0) != 9) {
                  var youxia = (parseInt(that.id) + 11) + ''
                  otheropen(youxia)
              }
              otheropen(you)
          }
          // 上侧
          if (that.id.charAt(0) != 0) {
              var shang = (parseInt(that.id) - 10) + ''
              // 左
              if (that.id.charAt(1) != 0) {
                  var zuoshang = (parseInt(that.id) - 11) + ''
                  otheropen(zuoshang)
              }
              // 右
              if (that.id.charAt(1) != 9) {
                  var youshang = (parseInt(that.id) - 9) + ''
                  otheropen(youshang)
              }
              otheropen(shang)
          }
          // 下侧
          if (that.id.charAt(0) != 9) {
              var xia = (parseInt(that.id) + 10) + ''
              // 左
              if (that.id.charAt(1) != 0) {
                  var zuoxia = (parseInt(that.id) + 9) + ''
                  otheropen(zuoxia)
              }
              // 右
              if (that.id.charAt(1) != 9) {
                  var youxia = (parseInt(that.id) + 11) + ''
                  otheropen(youxia)
              }
              otheropen(xia)


          }
      }
  }
  // 打开其他坐标格子
  var otheropen = function (zuo) {
      if (zuo.length == 1) {
          zuo = '0' + zuo
      } 
      var z = parseInt(zuo.charAt(0))
      var y = parseInt(zuo.charAt(1))
      var tr = tbody.querySelectorAll('tr')
      var td = tr[z].querySelectorAll('td')
      var divv = td[y].querySelector('div');
      if (td[y].className != 'on' && td[y].id != 'x') {
          divv.style.visibility = 'visible';
          td[y].style.backgroundColor = '#e5e5e5';
          td[y].className = 'open'
      }
      if (hadopenarr.indexOf(td[y].id) == -1) {//避免递归重复计算
          hadopenarr.push(td[y].id)
      
          var odiv = td[y].querySelector('div')
          if (odiv.outerText == 0) {
              // 回调函数
              setTimeout(function () { yibu(td[y]) }, 20)//异步
          }
      } else {
          return;
      }
  }
  // 异步调用的clickzero()
  var yibu = function (td) {
      // 如何避免递归的重复计算？
      clickzero(td);
  }
  //打开雷
  var openmine = function () {
      var tr = tbody.querySelectorAll('tr');
      for (var a = 0; a < sumarr.length; a++) {
          var td = tr[sumarr[a][0]].querySelectorAll('td');
          var div = td[sumarr[a][1]].querySelector('div');
          td[sumarr[a][1]].style.backgroundColor = 'pink';
          div.style.visibility = 'visible';
      }
  }
  // 创建雷盘
  createtable();
  // 随机埋雷10个
  createmine();
  // 计算每一个格子周围的雷数
  sum()
  //绑定点击事件，点击开盖
  clickopen()
// 鼠标右键