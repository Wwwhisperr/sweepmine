let that;
class sweepmine {
  constructor(board, minenum) {
    that = this;
    this.board = board;
    this.minenum = minenum;
    // 全局
    this.changepart = document.querySelector(".changemouse");
    this.changebtn = this.changepart.querySelector("button");
    this.changetext = this.changepart.querySelector("span");
    this.table = document.querySelector("table");
    this.tbody = this.table.querySelector("tbody");
    this.text = document.querySelector(".text");
    // 计时器
    this.timer = document.querySelector(".timer");
    this.nowtime = "";
    this.second = 0;
    // 雷数组
    this.sumarr = [];
    this.tablearr = [];
    // 搞个数组来存已经被递归过的格子
    this.hadopenarr = [];
    this.firstclick = [];
    // 是否输赢 0是输 1是赢
    this.gamewinorlost = 2;
    // 第一击
    // this.firstclickm;

    // 切换功能的boolean
    this.changeemoji = true;
    // 创建雷盘
    this.createtable();
    // 第一次点击可能要单独处理
    // this.firstclickfunction()
    // 随机埋雷
    this.createmine();
    // 计算每一个格子周围的雷数
    this.sum();
    //绑定点击事件，点击开盖
    this.clickopen();
    // 切换难度更新下方提示
    this.inittext();
    // 切换左键功能
    // this.changemouse()
    // 定时器
    this.mytimer();
  }
  // 定时器
  mytimer() {
    this.starttimer();
  }
  //   开始定时器
  starttimer() {
    this.second = 0;
    this.timer.innerText = "00:00:00";
    // 开始记时
    this.thistimer = setInterval(that.settimer, 1000);
  }
  //   消除定时器
  endtimer() {
    // 结束记时
    clearInterval(that.thistimer);
  }
  // 设置定时器并innerHTML
  settimer() {
    that.second += 1;
    that.timerfunction();
    that.timer.innerText = that.nowtime;
  }
  // 计时器逻辑
  timerfunction() {
    // this.second=parseInt(this.second);

    let second = "";
    let hour = "";
    let minute = "";
    // 秒
    if (this.second % 60 != 0) {
      if (this.second % 60 < 10) {
        second = "0" + (this.second % 60);
      } else {
        second = this.second % 60;
      }
    } else {
      second = "00";
    }
    // 分
    let myminute = Math.floor((this.second / 60) % 60);
    if (myminute != 0) {
      if (myminute < 10) {
        minute = "0" + myminute;
      } else {
        minute = myminute;
      }
    } else {
      minute = "00";
    }
    // 时
    let myhour = Math.floor(this.second / 3600);
    if (this.second > 3600) {
      if (myhour < 10) {
        hour = "0" + myhour;
      } else {
        hour = myhour;
      }
    } else {
      hour = "00";
    }

    // 要改nowtime
    this.nowtime = hour + ":" + minute + ":" + second;
  }

  // 切换难度更新下方提示
  inittext() {
    if (this.minenum == 10) {
      that.text.innerHTML = "初级扫雷";
      that.text.style.color = "#000";
    }
    if (this.minenum == 40) {
      that.text.innerHTML = "中级扫雷";
      that.text.style.color = "#000";
    }
    if (this.minenum == 99) {
      that.text.innerHTML = "高级扫雷";
      that.text.style.color = "#000";
    }
  }
  // 切换功能具体函数
  changefunction() {
    that.changeemoji = !that.changeemoji;

    if (that.changeemoji) {
      that.changetext.innerHTML = "👆🏻";
      // 移除左键插棋子
      for (let j = 0; j < that.tr.length; j++) {
        that.td = that.tr[j].querySelectorAll("td");
        for (let i = 0; i < that.td.length; i++) {
          // 移除左键插旗
          that.td[i].removeEventListener("click", that.flag);
          // 恢复普通格子移除点击开盖事件
          that.td[i].addEventListener("click", that.click);
        }
      }
      // that.clickopen()
    } else {
      that.changetext.innerHTML = "🚩";
      for (let j = 0; j < that.tr.length; j++) {
        that.td = that.tr[j].querySelectorAll("td");
        for (let i = 0; i < that.td.length; i++) {
          // 左键插棋子
          that.td[i].addEventListener("click", that.flag);
          // 移除普通格子移除点击开盖事件
          that.td[i].removeEventListener("click", that.click);
          // 便携恢复
          that.td[i].addEventListener("click", function () {
            let div = this.querySelector("div");
            if (
              this.id != "x" &&
              this.className == "open" &&
              div.outerText != 0
            ) {
              // 便捷打开格子
              that.openeasy(div.outerText, this);
            }
          });
          // 弥补左键插旗遗失的click功能
          that.td[i].addEventListener("click", that.clickflagfunction);
        }
      }
    }
  }
  // 弥补左键插旗遗失的click功能
  clickflagfunction() {
    if (this.id != "x" && that.hadopenarr.indexOf(this.id) == -1) {
      that.hadopenarr.push(this.id);
    }
    that.win();
  }
  // 更新tr
  init() {
    this.tr = this.tbody.querySelectorAll("tr");
  }
  // 创建雷盘
  createtable() {
    for (let i = 0; i < this.board; i++) {
      this.tbody.insertAdjacentHTML("beforeend", "<tr></tr>");
    }
    this.init();
    // this.tr = this.tbody.querySelectorAll('tr');
    for (let j = 0; j < this.tr.length; j++) {
      this.trr = this.tr[j];
      for (let i = 0; i < this.board; i++) {
        this.trr.insertAdjacentHTML("beforeend", "<td><div></div></td>");
        this.td = this.trr.querySelectorAll("td");
        this.td[i].id = j + "_" + i;
      }
    }
  }
  // 生成雷数组
  createminearr() {
    for (let a = 0; a < this.minenum; a++) {
      let x = parseInt(Math.random() * this.board); //转为整数
      let y = parseInt(Math.random() * this.board);
      this.sumarr[a] = [x, y];
    }
  }
  //绑定点击事件
  clickopen() {
    this.init();
    for (let i = 0; i < this.tr.length; i++) {
      this.td = this.tr[i].querySelectorAll("td");
      for (let j = 0; j < this.td.length; j++) {
        // 普通格子点击开盖事件
        this.td[j].addEventListener("click", this.click);
      }
    }
    // 切换左键功能
    this.changebtn.addEventListener("click", this.changefunction);

    // 点到雷
    // for (let a = 0; a < this.sumarr.length; a++) {
    //     this.td = this.tr[this.sumarr[a][0]].querySelectorAll('td');
    //     this.td[that.sumarr[a][1]].addEventListener('click', that.failmine)
    // }
    // 右键插棋子
    for (let j = 0; j < this.tr.length; j++) {
      this.td = this.tr[j].querySelectorAll("td");
      for (let i = 0; i < this.td.length; i++) {
        this.td[i].addEventListener("contextmenu", this.flag);
      }
    }
  }
  // 随机插雷
  createmine() {
    this.createminearr();
    // 基础算法：找出数组中重复出现的元素
    this.sumarr = this.ifexit(this.sumarr);
    for (let a = 0; a < this.sumarr.length; a++) {
      this.init();
      // let tr = tbody.querySelectorAll('tr');
      // 每一行tr
      this.trr = this.tr[this.sumarr[a][0]];
      //  每一个tr的td
      this.td = this.trr.querySelectorAll("td");
      this.td[this.sumarr[a][1]].id = "x";
      this.div = this.td[this.sumarr[a][1]].querySelector("div");
      this.div.innerHTML = "💣";
      // 注意这边的xy反了
    }
  }
  // 判断雷数组是否重复并替换掉
  ifexit() {
    for (let i = 0; i < this.sumarr.length - 1; i++) {
      for (let j = i + 1; j < this.sumarr.length; j++) {
        if (
          this.sumarr[i][0] == this.sumarr[j][0] &&
          this.sumarr[i][1] == this.sumarr[j][1]
        ) {
          this.sumarr.splice(j, 1);
          this.x = parseInt(Math.random() * this.board); //转为整数
          this.y = parseInt(Math.random() * this.board);
          this.sumarr.push([this.x, this.y]);
          this.ifexit(this.sumarr); //递归
        }
      }
    }
    // 不和第一击相同
    //     for (let i = 0; i < this.sumarr.length; i++) {
    //     if (that.firstclick[0] == this.sumarr[i][0] && that.firstclick[1] == this.sumarr[i][1]) {

    //         this.sumarr.splice(i, 1)
    //         this.x = parseInt(Math.random() * this.board);//转为整数
    //         this.y = parseInt(Math.random() * this.board);
    //         this.sumarr.push([this.x, this.y]);
    //         this.ifexit(this.sumarr);//递归
    //     }
    // }

    return this.sumarr;
  }
  // 计算每一个格子周围的雷数
  sum() {
    this.init();
    for (let i = 0; i < this.tr.length; i++) {
      // 每一行tr的全部td
      this.td = this.tr[i].querySelectorAll("td");
      for (let j = 0; j < this.td.length; j++) {
        this.div = this.td[j].querySelector("div");
        let num = 0;
        for (let a = 0; a < this.sumarr.length; a++) {
          if (i == this.sumarr[a][0] && j == this.sumarr[a][1]) {
            break;
          } else {
            if (i - 1 == this.sumarr[a][0] && j - 1 == this.sumarr[a][1]) {
              num += 1;
            } else if (i - 1 == this.sumarr[a][0] && j == this.sumarr[a][1]) {
              num += 1;
            } else if (
              i - 1 == this.sumarr[a][0] &&
              j + 1 == this.sumarr[a][1]
            ) {
              num += 1;
            } else if (i == this.sumarr[a][0] && j - 1 == this.sumarr[a][1]) {
              num += 1;
            } else if (i == this.sumarr[a][0] && j + 1 == this.sumarr[a][1]) {
              num += 1;
            } else if (
              i + 1 == this.sumarr[a][0] &&
              j - 1 == this.sumarr[a][1]
            ) {
              num += 1;
            } else if (i + 1 == this.sumarr[a][0] && j == this.sumarr[a][1]) {
              num += 1;
            } else if (
              i + 1 == this.sumarr[a][0] &&
              j + 1 == this.sumarr[a][1]
            ) {
              num += 1;
            }
          }
          //每一个td，即y坐标 j
          // 此td的tr，即x坐标 i
          if (a == this.sumarr.length - 1) {
            num = parseInt(num);
            this.div.innerHTML = num;
          }
        }
      }
    }
  }
  // 输了打开雷
  failmine(thistd) {
    if (thistd.className != "on") {
      that.removemineclick();
      that.openmine();
      that.changebtn.removeEventListener("click", that.changefunction);
      that.text.innerHTML = "😟输了";
      that.text.style.color = "red";
      thistd.style.backgroundColor = "#E37979";
      that.removeflag();
      this.endtimer();
    }
  }
  // 移除点击开盖事件
  removemineclick() {
    this.init();
    for (let i = 0; i < this.tr.length; i++) {
      this.td = this.tr[i].querySelectorAll("td");
      for (let j = 0; j < this.td.length; j++) {
        // 普通格子移除点击开盖事件
        this.td[j].removeEventListener("click", that.click);
        // 移除雷特效
        this.td[j].removeEventListener("click", that.failmine);
        // 移除左键插旗为了方便加上的clickflagfunction
        this.td[j].removeEventListener("click", that.clickflagfunction);
        // 移除左键插棋子
        this.td[j].removeEventListener("click", that.flag);
      }
    }
  }
  // 插旗子函数
  flag(e) {
    if (this.className != "open") {
      if (this.className != "on") {
        this.style.backgroundColor = "#979797";
        this.removeEventListener("click", that.click);
        this.className = "on";
      } else {
        this.style.backgroundColor = "#bbb";
        this.addEventListener("click", that.click);
        this.className = "";
      }
    }
    e.preventDefault();
  }
  // 插旗取消函数
  removeflag() {
    this.init();
    for (let i = 0; i < this.tr.length; i++) {
      this.td = this.tr[i].querySelectorAll("td");
      for (let j = 0; j < this.td.length; j++) {
        // 普通格子移除点击开盖事件
        this.td[j].removeEventListener("contextmenu", this.flag);
      }
    }
  }

  // 点到0 打开周围
  clickzero(thistd) {
    let div = thistd.querySelector("div");
    if (div.outerText == 0) {
      div.style.visibility = "hidden";
    }

    let idd = thistd.id.split("_");
    // y坐标
    let y = parseInt(idd[0]);
    // x坐标
    let x = parseInt(idd[1]);

    let xp = x + 1;
    let yp = y + 1;
    let xj = x - 1;
    let yj = y - 1;
    let bj = parseInt(this.board) - 1;
    // 获取坐标
    let checknum = 0;
    // 左侧
    if (x != 0) {
      let zuo = y + "_" + xj;
      // 上
      if (y != 0) {
        let zuoshang = yj + "_" + xj;
        that.otheropen(zuoshang);
      }
      // 下
      if (y != bj) {
        let zuoxia = yp + "_" + xj;
        that.otheropen(zuoxia);
      }
      that.otheropen(zuo);
    }
    // 右侧
    if (x != bj) {
      let you = y + "_" + xp;
      // 上
      if (y != 0) {
        let youshang = yj + "_" + xp;
        that.otheropen(youshang);
      }
      // 下
      if (y != bj) {
        let youxia = yp + "_" + xp;
        that.otheropen(youxia);
      }
      that.otheropen(you);
    }
    // 上侧
    if (y != 0) {
      let shang = yj + "_" + x;
      that.otheropen(shang);
    }
    // 下侧
    if (y != bj) {
      let xia = yp + "_" + x;
      that.otheropen(xia);
    }
  }
  // 便捷打开格子
  openeasy(thisnum, thistd) {
    // 旗子和数字一样，可以判断
    if (that.checkflagandnum(thistd)[0] == thisnum) {
      if (that.checkflagandnum(thistd)[1].length == 0) {
        that.clickzero(thistd);
      } else {
        // 雷上没插旗子的数组不是空的，直接爆雷
        let falsetd = that.checkflagandnum(thistd)[1];
        for (let i = 0; i < that.sumarr.length; i++) {
          console.log(
            that.sumarr[i][0],
            that.sumarr[i][1],
            parseInt(falsetd[0][0]),
            parseInt(falsetd[0][1])
          );

          if (
            that.sumarr[i][0] == parseInt(falsetd[0][0]) &&
            that.sumarr[i][1] == parseInt(falsetd[0][1])
          ) {
            let tr = that.tbody.querySelectorAll("tr");
            let tdlist = tr[that.sumarr[i][0]];
            let td = tdlist.querySelectorAll("td");
            let thismytd = td[that.sumarr[i][1]];

            console.log(thismytd);
            //需要爆雷
            that.failmine(thismytd);
          }
        }
      }
    }
  }
  // 便捷打开格子-检查周围棋子和雷(错误扫雷逻辑，后续修改)是否一一对应，返回对应的条数
  // 便捷打开格子-检查周围棋子和数字是否一一对应，返回对应的条数和是否插旗错误（）
  checkflagandnum(thistd) {
    let div = thistd.querySelector("div");
    let idd = thistd.id.split("_");
    // y坐标
    let y = parseInt(idd[0]);
    // x坐标
    let x = parseInt(idd[1]);

    let xp = x + 1;
    let yp = y + 1;
    let xj = x - 1;
    let yj = y - 1;
    let bj = parseInt(this.board) - 1;
    // 获取坐标
    let checknum = 0;
    // 雷上没插旗子的数组
    let arr = [];

    // 左侧
    if (x != 0) {
      let zuo = y + "_" + xj;
      // 上
      if (y != 0) {
        let zuoshang = yj + "_" + xj;
        checknum += that.checkfunction(zuoshang)[0];
        if (that.checkfunction(zuoshang)[1] != 0) {
          arr.push(that.checkfunction(zuoshang)[1]);
        }
      }
      // 下
      if (y != bj) {
        let zuoxia = yp + "_" + xj;
        checknum += that.checkfunction(zuoxia)[0];
        if (that.checkfunction(zuoxia)[1] != 0) {
          arr.push(that.checkfunction(zuoxia)[1]);
        }
      }
      checknum += that.checkfunction(zuo)[0];
      if (that.checkfunction(zuo)[1] != 0) {
        arr.push(that.checkfunction(zuo)[1]);
      }
    }
    // 右侧
    if (x != bj) {
      let you = y + "_" + xp;
      // 上
      if (y != 0) {
        let youshang = yj + "_" + xp;
        checknum += that.checkfunction(youshang)[0];
        if (that.checkfunction(youshang)[1] != 0) {
          arr.push(that.checkfunction(youshang)[1]);
        }
      }
      // 下
      if (y != bj) {
        let youxia = yp + "_" + xp;
        checknum += that.checkfunction(youxia)[0];
        if (that.checkfunction(youxia)[1] != 0) {
          arr.push(that.checkfunction(youxia)[1]);
        }
      }
      checknum += that.checkfunction(you)[0];
      if (that.checkfunction(you)[1] != 0) {
        arr.push(that.checkfunction(you)[1]);
      }
    }
    // 上侧
    if (y != 0) {
      let shang = yj + "_" + x;
      checknum += that.checkfunction(shang)[0];
      if (that.checkfunction(shang)[1] != 0) {
        arr.push(that.checkfunction(shang)[1]);
      }
    }
    // 下侧
    if (y != bj) {
      let xia = yp + "_" + x;
      checknum += that.checkfunction(xia)[0];
      if (that.checkfunction(xia)[1] != 0) {
        arr.push(that.checkfunction(xia)[1]);
      }
    }
    return [checknum, arr];
  }

  // 检查周围棋子和雷（错误）是否一一对应,返回值
  // 检查周围棋子和点击格子数字是否一一对应,返回值，并返回是否差错旗子（插在数字上或者雷没有插旗子）
  // 返回数组
  checkfunction(aaa) {
    aaa = aaa.split("_");
    this.z = parseInt(aaa[0]);
    this.y = parseInt(aaa[1]);
    this.init();

    // 要返回的数组[旗子和雷成功对应返回1,是雷但没插旗子返回1] 否则返回0
    let arr = [];
    this.td = this.tr[this.z].querySelectorAll("td");
    let tdd = this.td[this.y];

    this.div = this.td[this.y].querySelector("div");
    // 是雷但没插旗子
    if (tdd.id == "x" && tdd.className != "on") {
      arr[1] = aaa;
    } else {
      arr[1] = 0;
    }
    // 计算旗子的数量
    if (tdd.className == "on") {
      arr[0] = 1;
    } else {
      arr[0] = 0;
    }
    return arr;
  }
  // 点击函数
  click() {
    if (this.id != "x" && that.hadopenarr.indexOf(this.id) == -1) {
      that.hadopenarr.push(this.id);
    }
    if (this.className != "on") {
      this.div = this.querySelector("div");
      this.div.style.visibility = "visible";
      this.style.backgroundColor = "#e5e5e5";
      this.className = "open";
    }
    // if(that.hadopenarr.length==0){
    //     //第一击
    //     this.firstclick=this.id
    // }

    if (this.id == "x" && this.className != "on") {
      that.failmine(this);
    }
    // 第一击
    // if (that.hadopenarr.length == 0) {

    //     that.firstclick = this.id.split('_')
    // }

    if (this.id != "x" && this.className == "open" && this.div.outerText != 0) {
      // 便捷打开格子
      that.openeasy(this.div.outerText, this);
    }

    if (this.div.outerText == 0) {
      this.div.style.visibility = "hidden";
      // this.style.backgroundColor = '#e5e5e5';
      that.clickzero(this);
    }
    that.win();
  }
  win() {
    // 扫雷成功判断
    let boardd = parseInt(that.board);
    let minenumm = parseInt(that.minenum);
    let winnum = boardd * boardd - minenumm;

    if (that.hadopenarr.length == winnum) {
      // that.openminewin()
      that.text.innerHTML = "你赢啦！🎉";
      that.text.style.color = "green";
      that.changebtn.removeEventListener("click", that.changefunction);
      that.removemineclick();
      that.removeflag();
      this.endtimer();
    }
  }
  // 打开其他坐标格子
  otheropen(o) {
    o = o.split("_");
    this.z = parseInt(o[0]);
    this.y = parseInt(o[1]);
    this.init();

    let tdlist = this.tr[this.z].querySelectorAll("td");

    let td = tdlist[this.y];

    let div = td.querySelector("div");

    if (td.className != "on" && td.id != "x") {
      div.style.visibility = "visible";
      td.style.backgroundColor = "#e5e5e5";
      td.className = "open";

      if (div.outerText == 0) {
        div.style.visibility = "hidden";
      }
      if (that.hadopenarr.indexOf(td.id) == -1) {
        //避免递归重复计算
        that.hadopenarr.push(td.id);

        let odiv = td.querySelector("div");
        let thisss = td;
        if (odiv.outerText == 0) {
          // 回调函数
          // this.odiv.style.visibility = 'hidden';
          setTimeout(function () {
            that.yibu(thisss);
          }, 2); //异步
        }
      } else {
        return;
      }
    }
  }
  // 异步调用的clickzero()
  yibu(td) {
    // 如何避免递归的重复计算？
    that.clickzero(td);
  }
  //打开全部雷
  openmine() {
    this.init();
    for (let a = 0; a < that.sumarr.length; a++) {
      this.td = this.tr[that.sumarr[a][0]].querySelectorAll("td");
      this.div = this.td[that.sumarr[a][1]].querySelector("div");
      this.td[that.sumarr[a][1]].style.backgroundColor = "#D2B4B4";
      this.td[that.sumarr[a][1]].className = "";
      this.div.style.visibility = "visible";
    }
  }
  //   赢了打开雷背景颜色不一样
  openminewin() {
    this.init();
    for (let a = 0; a < that.sumarr.length; a++) {
      this.td = this.tr[that.sumarr[a][0]].querySelectorAll("td");
      this.div = this.td[that.sumarr[a][1]].querySelector("div");
      this.td[that.sumarr[a][1]].style.backgroundColor = "#bbb";
      this.td[that.sumarr[a][1]].className = "";
      this.div.style.visibility = "visible";
    }
  }
}
// (棋盘，雷数)
// 初级
new sweepmine(9, 10);
// 中级
// new sweepmine(16, 40)
// 高级
// new sweepmine(22, 99)
// let mineboard=null;
let box = document.querySelector(".level");
let btn = box.querySelectorAll("button");

function initboard() {
  let table = document.querySelector("table");
  let tbody = table.querySelector("tbody");
  let tr = tbody.firstElementChild;
  while (tr) {
    tr.remove();
    tr = tbody.firstElementChild;
  }
}
btn[0].addEventListener("click", function () {
  // history.go(0)
  that.endtimer();
  initboard();
  that.changetext.innerHTML = "👆🏻";
  this.one = new sweepmine(9, 10);
  this.one = null;
});
btn[1].addEventListener("click", function () {
  that.endtimer();
  initboard();
  that.changetext.innerHTML = "👆🏻";
  this.two = new sweepmine(16, 40);
  this.two = null;
});
btn[2].addEventListener("click", function () {
  that.endtimer();
  initboard();
  that.changetext.innerHTML = "👆🏻";
  this.three = new sweepmine(22, 99);
  this.three = null;
});
