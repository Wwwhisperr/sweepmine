var that;
class sweepmine {
    constructor(board, minenum) {
        that = this
        this.board = board;
        this.minenum = minenum;
        // 全局
        this.table = document.querySelector('table');
        this.tbody = this.table.querySelector('tbody');
        this.sumarr = [];
        this.tablearr = [];
        // 搞个数组来存已经被递归过的格子
        this.hadopenarr = []
        this.firstclick = []
        this.text = document.querySelector('.text')
        // 创建雷盘
        this.createtable();
        // 随机埋雷
        this.createmine();
        // 计算每一个格子周围的雷数
        this.sum()
        //绑定点击事件，点击开盖
        this.clickopen()
        // 切换难度更新下方提示
        this.inittext()
    }
    // 切换难度更新下方提示
    inittext() {

        if (this.minenum == 10) {
            that.text.innerHTML = "初级扫雷"
            that.text.style.color = '#000'
        }
        if (this.minenum == 40) {
            that.text.innerHTML = "中级扫雷"
            that.text.style.color = '#000'
        }
        if (this.minenum == 99) {
            that.text.innerHTML = "高级扫雷"
            that.text.style.color = '#000'
        }
    }
    // 更新tr
    init() {
        this.tr = this.tbody.querySelectorAll('tr');
    }

    // 创建雷盘
    createtable() {
        for (var i = 0; i < this.board; i++) {
            this.tbody.insertAdjacentHTML("beforeend", "<tr></tr>");
        }
        this.init();
        // this.tr = this.tbody.querySelectorAll('tr');
        for (var j = 0; j < this.tr.length; j++) {
            this.trr = this.tr[j]
            for (var i = 0; i < this.board; i++) {
                this.trr.insertAdjacentHTML('beforeend', '<td><div></div></td>');
                this.td = this.trr.querySelectorAll('td');
                this.td[i].id = j + '_' + i
            }
        }
    }

    // 生成雷数组
    createminearr() {
        for (var a = 0; a < this.minenum; a++) {
            var x = parseInt(Math.random() * this.board);//转为整数
            var y = parseInt(Math.random() * this.board);
            this.sumarr[a] = [x, y];

        }

    }
    // 随机插雷
    createmine() {
        this.createminearr();
        // 基础算法：找出数组中重复出现的元素
        this.sumarr = this.ifexit(this.sumarr)
        for (var a = 0; a < this.sumarr.length; a++) {
            this.init();
            // var tr = tbody.querySelectorAll('tr');
            // 每一行tr
            this.trr = this.tr[this.sumarr[a][0]];
            //  每一个tr的td
            this.td = this.trr.querySelectorAll('td');
            this.td[this.sumarr[a][1]].id = 'x'
            this.div = this.td[this.sumarr[a][1]].querySelector('div');
            this.div.innerHTML = "💣";
            // 注意这边的xy反了
        }
    }
    // 判断雷数组是否重复并替换掉
    ifexit() {
        for (var i = 0; i < this.sumarr.length - 1; i++) {
            for (var j = i + 1; j < this.sumarr.length; j++) {
                if (this.sumarr[i][0] == this.sumarr[j][0] && this.sumarr[i][1] == this.sumarr[j][1]) {
                    this.sumarr.splice(j, 1)
                    this.x = parseInt(Math.random() * this.board);//转为整数
                    this.y = parseInt(Math.random() * this.board);
                    this.sumarr.push([this.x, this.y]);
                    this.ifexit(this.sumarr);//递归
                }
            }
        }
        // 不和第一击相同
        //     for (var i = 0; i < this.sumarr.length; i++) {
        //     if (that.firstclick[0] == this.sumarr[i][0] && that.firstclick[1] == this.sumarr[i][1]) {
        //        console.log('hihihi');
        //         this.sumarr.splice(i, 1)
        //         this.x = parseInt(Math.random() * this.board);//转为整数
        //         this.y = parseInt(Math.random() * this.board);
        //         this.sumarr.push([this.x, this.y]);
        //         this.ifexit(this.sumarr);//递归
        //     }
        // }

        return this.sumarr
    }

    // 计算每一个格子周围的雷数
    sum() {
        this.init();
        for (var i = 0; i < this.tr.length; i++) {
            // 每一行tr的全部td
            this.td = this.tr[i].querySelectorAll('td');
            for (var j = 0; j < this.td.length; j++) {
                this.div = this.td[j].querySelector('div');
                var num = 0;
                for (var a = 0; a < this.sumarr.length; a++) {
                    if (i == this.sumarr[a][0] && j == this.sumarr[a][1]) {
                        break;

                    } else {
                        if (i - 1 == this.sumarr[a][0] && j - 1 == this.sumarr[a][1]) {
                            num += 1;
                        } else if (i - 1 == this.sumarr[a][0] && j == this.sumarr[a][1]) {
                            num += 1;
                        } else if (i - 1 == this.sumarr[a][0] && j + 1 == this.sumarr[a][1]) {
                            num += 1;
                        } else if (i == this.sumarr[a][0] && j - 1 == this.sumarr[a][1]) {
                            num += 1;
                        } else if (i == this.sumarr[a][0] && j + 1 == this.sumarr[a][1]) {
                            num += 1;
                        } else if (i + 1 == this.sumarr[a][0] && j - 1 == this.sumarr[a][1]) {
                            num += 1;
                        } else if (i + 1 == this.sumarr[a][0] && j == this.sumarr[a][1]) {
                            num += 1;
                        } else if (i + 1 == this.sumarr[a][0] && j + 1 == this.sumarr[a][1]) {
                            num += 1;
                        }
                    }
                    //每一个td，即y坐标 j
                    // 此td的tr，即x坐标 i
                    if (a == this.sumarr.length - 1) {
                        num = parseInt(num)
                        this.div.innerHTML = num;

                    }
                }
            }
        }
    }
    //绑定点击事件
    clickopen() {
        this.init();
        for (var i = 0; i < this.tr.length; i++) {
            this.td = this.tr[i].querySelectorAll('td');
            for (var j = 0; j < this.td.length; j++) {
                // 普通格子点击开盖事件
                this.td[j].addEventListener('click', this.click)
            }
        }

        // 点到雷
        for (var a = 0; a < this.sumarr.length; a++) {
            this.td = this.tr[this.sumarr[a][0]].querySelectorAll('td');
            this.td[that.sumarr[a][1]].addEventListener('click', that.failmine)
        }
        // 右键插棋子
        for (var j = 0; j < this.tr.length; j++) {
            this.td = this.tr[j].querySelectorAll('td')
            for (var i = 0; i < this.td.length; i++) {
                this.td[i].addEventListener('contextmenu', this.flag)
            }
        }
    }
    // 打开雷
    failmine() {

        if (this.className != 'on') {
            that.openmine();
            that.text.innerHTML = "点到雷，输了"
            that.text.style.color = 'red'
            this.style.backgroundColor = 'red';
            that.removemineclick()
            that.removeflag()
        }
    }
    // 移除点击开盖事件
    removemineclick() {
        this.init();
        for (var i = 0; i < this.tr.length; i++) {
            this.td = this.tr[i].querySelectorAll('td');
            for (var j = 0; j < this.td.length; j++) {
                // 普通格子移除点击开盖事件
                this.td[j].removeEventListener('click', that.click)
                // 移除雷特效
                this.td[j].removeEventListener('click', that.failmine)

            }
        }
    }
    // 插旗子函数
    flag(e) {
        if (this.className != 'open') {
            if (this.className != 'on') {
                this.style.backgroundColor = '#979797';
                this.removeEventListener('click', that.click);
                this.className = 'on'
            } else {
                this.style.backgroundColor = '#bbb'
                this.addEventListener('click', that.click);

                this.className = ''

            }
        }
        e.preventDefault();
    }
    // 插旗取消函数
    removeflag() {
        this.init();
        for (var i = 0; i < this.tr.length; i++) {
            this.td = this.tr[i].querySelectorAll('td');
            for (var j = 0; j < this.td.length; j++) {
                // 普通格子移除点击开盖事件
                this.td[j].removeEventListener('contextmenu', this.flag)
            }
        }
    }
    // 点击函数
    click() {

        this.div = this.querySelector('div');
        // if (this.div.outerText == 0) {
        //     // this.div.style.visibility = 'visible';
        //     this.style.backgroundColor = '#e5e5e5';
        // } else {
        //     this.div.style.visibility = 'visible';
        //     this.style.backgroundColor = '#e5e5e5';
        // }
      
        this.div.style.visibility = 'visible';
        this.style.backgroundColor = '#e5e5e5';
       
        // 第一击
        // if (that.hadopenarr.length == 0) {
        //     // console.log(this.id);
        //     that.firstclick = this.id.split('_')
        // }

        if (this.id != 'x' && that.hadopenarr.indexOf(this.id) == -1) {
            that.hadopenarr.push(this.id)

        }
        if (this.div.outerText == 0) {
            // console.log(this.div.outerText);
            this.div.style.visibility = 'hidden';
            // this.style.backgroundColor = '#e5e5e5';
            that.clickzero(this)
        }

        // 扫雷成功判断
        let boardd = parseInt(that.board)
        let minenumm = parseInt(that.minenum)
        let winnum = (boardd * boardd) - minenumm

        if (that.hadopenarr.length == winnum+1) {
            // that.openminewin()
            that.text.innerHTML = "你赢啦！"
            that.text.style.color = 'green'
            that.removemineclick()
            that.removeflag()
        }

    }
    // 点到0
    clickzero(thatt) {

        this.div = thatt.querySelector('div')
        this.div.style.visibility='hidden'
        this.idd = thatt.id.split('_')
        // y坐标
        let y = parseInt(this.idd[0])
        // x坐标
        let x = parseInt(this.idd[1])
        this.xp = x + 1
        this.yp = y + 1
        this.xj = x - 1
        this.yj = y - 1
        let bj = parseInt(this.board) - 1;
        // this.board=parseInt(this.board)
        // 获取坐标
        // 左侧
        // if (this.div.outerText == 0) {
            // this.div.style.visibility = 'hidden';
            if (x != 0) {
                this.zuo = y + '_' + this.xj
                // 上
                if (y != 0) {
                    this.zuoshang = this.yj + '_' + this.xj
                    that.otheropen(this.zuoshang)
                }
                // 下
                if (y != bj) {
                    this.zuoxia = this.yp + '_' + this.xj
                    that.otheropen(this.zuoxia)
                }
                that.otheropen(this.zuo)
            }
            // 右侧
            if (x != bj) {

                this.you = y + '_' + this.xp
                // 上
                if (y != 0) {
                    this.youshang = this.yj + '_' + this.xp
                    that.otheropen(this.youshang)
                }
                // 下
                if (y != bj) {
                    this.youxia = this.yp + '_' + this.xp
                    that.otheropen(this.youxia)
                }
                that.otheropen(this.you)
            }
            // 上侧
            if (y != 0) {
                this.shang = this.yj + '_' + x
                // 左
                if (x != 0) {
                    this.zuoshang = this.yj + '_' + this.xj
                    that.otheropen(this.zuoshang)
                }
                // 右
                if (x != bj) {
                    this.youshang = this.yj + '_' + this.xp
                    that.otheropen(this.youshang)
                }
                that.otheropen(this.shang)
            }
            // 下侧
            if (y != bj) {
                this.xia = this.yp + '_' + x
                // 左
                if (x != 0) {
                    this.zuoxia = this.yp + '_' + this.xj
                    that.otheropen(this.zuoxia)
                }
                // 右
                if (x != bj) {
                    this.youxia = this.yp + '_' + this.xp
                    that.otheropen(this.youxia)
                }
                that.otheropen(this.xia)
            }
        // }
    }
    // 打开其他坐标格子
    otheropen(o) {
        o = o.split('_')
        this.z = parseInt(o[0])
        this.y = parseInt(o[1])
        this.init();
        // console.log(this.tr[this.z]);
        this.td = this.tr[this.z].querySelectorAll('td')
        // console.log(this.td);
        this.divv = this.td[this.y].querySelector('div');
        
 
        if (this.td[this.y].className != 'on' && this.td[this.y].id != 'x') {
            // console.log(this.divv.outerText);
            this.divv.style.visibility = 'visible'; 
            this.td[this.y].style.backgroundColor = '#e5e5e5';
            this.td[this.y].className = 'open'
            
            if(this.divv.outerText==0){
                this.divv.style.visibility = 'hidden'; 

            }
            
        }
        if (that.hadopenarr.indexOf(this.td[this.y].id) == -1) {//避免递归重复计算
            that.hadopenarr.push(this.td[this.y].id)

            this.odiv = this.td[this.y].querySelector('div')
            var thisss = this.td[this.y]
            if (this.odiv.outerText == 0) {
                // 回调函数
                // this.odiv.style.visibility = 'hidden';
                setTimeout(function () { that.yibu(thisss) }, 2)//异步
            }
        } else {
            return;
        }

    }
    // 异步调用的clickzero()
    yibu(td) {
        // 如何避免递归的重复计算？
        that.clickzero(td);
    }
    //打开雷
    openmine() {
        this.init();
        for (var a = 0; a < that.sumarr.length; a++) {
            this.td = this.tr[that.sumarr[a][0]].querySelectorAll('td');
            this.div = this.td[that.sumarr[a][1]].querySelector('div');
            this.td[that.sumarr[a][1]].style.backgroundColor = '#cc8f8f';
            this.td[that.sumarr[a][1]].className = ''
            this.div.style.visibility = 'visible';
        }
    }

    //   赢了打开雷背景颜色不一样
    openminewin() {
        this.init();
        for (var a = 0; a < that.sumarr.length; a++) {
            this.td = this.tr[that.sumarr[a][0]].querySelectorAll('td');
            this.div = this.td[that.sumarr[a][1]].querySelector('div');
            this.td[that.sumarr[a][1]].style.backgroundColor = '#bbb';
            this.td[that.sumarr[a][1]].className = ''
            this.div.style.visibility = 'visible';
        }
    }
}
// (棋盘，雷数)
// 初级
new sweepmine(9, 10)

// 中级
// new sweepmine(16, 40)
// 高级
// new sweepmine(22, 99)
// var mineboard=null;

let box = document.querySelector('.level')
let btn = box.querySelectorAll('button')

function initboard() {
    var table = document.querySelector('table');
    var tbody = table.querySelector('tbody');
    var tr = tbody.firstElementChild
    while (tr) {
        tr.remove()
        tr = tbody.firstElementChild
    }
}
btn[0].addEventListener('click', function () {
    // history.go(0)
    initboard()
    this.one = new sweepmine(9, 10)
    this.one = null

})
btn[1].addEventListener('click', function () {
    initboard()
    this.two = new sweepmine(16, 40)
    this.two = null
})
btn[2].addEventListener('click', function () {
    initboard()
    this.three = new sweepmine(22, 99)
    this.three = null

})
