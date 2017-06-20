/**
 * Created by 79807 on 2017/3/21.
 */
function animate(opt) {
    var time = 0;
    var ele = opt.ele;
    var target = opt.target;
    var duration = opt.duration || 1000;
    var callback = opt.callback;
    var begin = {};
    var change = {};
    for (var key in target) {
        begin[key] = utils.Css(ele, key);
        change[key] = target[key] - begin[key];
    }
    var effect = {
        linear: function(t, b, c, d) {
            return t / d * c + b;
        }
    };
    ele.timer && window.clearInterval(ele.timer);
    ele.timer = window.setInterval(function() {
        time += 8;
        if (time >= duration) {
            utils.Css(ele, target);
            window.clearInterval(ele.timer);
            if (typeof callback == 'function') {
                callback.call(ele);
            }
        }
        for (var key in change) {
            if (change[key]) {
                var val = effect.linear(time, begin[key], change[key], duration);
                utils.Css(ele, key, val);
            }
        }
    }, 8)
}
//开头登录
var header = utils.getEleByClass('header')[0];;
(function() {
    var login = utils.getEleByClass('login', header)[0];
    var loginlist = utils.getEleByClass('headleft-list', login)[0];
    var hl_icon = utils.getEleByClass('icon', login)[0];
    login.onmouseenter = function() {
        loginlist.style.display = 'block';
        hl_icon.style.display = 'none';
    };
    login.onmouseleave = function() {
        loginlist.style.display = 'none';
        hl_icon.style.display = 'block';
    };
})();
//地址选择
;
(function() {
    var adress = utils.getEleByClass('adress', header)[0];
    var select = utils.getEleByClass('addressdef', adress)[0];
    var addressList = utils.getEleByClass('addressList', adress)[0];
    adress.onmouseover = function() {
        select.style.borderBottomColor = '#fff';
        addressList.style.display = 'block';
    };
    adress.onmouseout = function() {
        select.style.borderBottomColor = '#dbdbdb';
        addressList.style.display = 'none';
    }
})();
//地址位置改变
;
(function() {
    var adress = utils.getEleByClass('adress', header)[0];
    var letter = utils.getEleByClass('letter', adress)[0];
    var letters = letter.getElementsByTagName('li'); //字母集合
    var wrap = utils.getEleByClass('ad-wrap', adress)[0];
    var inner = utils.getEleByClass('inner', wrap)[0];
    var divs = utils.getEleByClass('area', inner);
    for (var i = 0; i < letters.length; i++) {
        letters[i].index = i;
        var cur = letters[i];
        var top = divs[i].offsetTop;

        cur.onmouseover = function() {
            this.style.backgroundColor = '#e50012';
            this.style.color = '#fff';
        };
        cur.onmouseout = function() {
            this.style.backgroundColor = '#eee';
            this.style.color = '#c0c2bc';
        };
        cur.onclick = function() {
            var top = divs[this.index].offsetTop;
            var curtop = wrap.scrollTop;
            wrap.timer && window.clearInterval(wrap.timer);
            wrap.timer = window.setInterval(function() {
                if (curtop < top) {
                    curtop += 30;
                    wrap.scrollTop = curtop;
                    if (curtop >= top) {
                        window.clearInterval(wrap.timer);
                    }
                } else {
                    curtop -= 30;
                    wrap.scrollTop = curtop;
                    if (curtop <= top) {
                        window.clearInterval(wrap.timer);
                    }
                }
            }, 10)
        };
    }
})();
//导肮右面下拉菜单
;
(function() {
    var right = utils.getEleByClass('headerRight', header)[0];
    var site = utils.getEleByClass('site', right)[0];
    var lis = site.getElementsByTagName('li');
    var lists = utils.getEleByClass('rightList', site);
    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onmouseenter = function() {
            this.style.borderColor = '#ccc';
            this.style.backgroundColor = '#fff';
            lists[this.index].style.display = 'block';
        };
        lis[i].onmouseleave = function() {
            this.style.borderColor = 'transparent';
            this.style.backgroundColor = 'transparent';
            lists[this.index].style.display = 'none';
        }

    }
    var attent = utils.getEleByClass('attent', right)[0];
    var wechat = utils.getEleByClass('wechat', attent)[0];
    var store = utils.getEleByClass('store', attent)[0];
    wechat.onmouseenter = function() {
        store.style.display = 'block';
    };
    wechat.onmouseleave = function() {
        store.style.display = 'none';
    }
})();
//搜索表单
;
(function() {
    var logo = utils.getEleByClass('logo')[0];
    var form = utils.getEleByClass('serchform', logo)[0];
    var range = utils.getEleByClass('serchrange', form)[0];
    var choose = range.getElementsByTagName('a');
    var pointer = range.getElementsByTagName('i')[0];
    var input = utils.getEleByClass('keywords', form)[0];
    var list = utils.getEleByClass('serchlist', form)[0];
    var cart = utils.getEleByClass('shoppingCart')[0];
    var line = utils.getEleByClass('line', cart)[0];
    var cartList = utils.getEleByClass('cartList', cart)[0];
    range.onmouseenter = function() {
        range.style.height = 56 + 'px';
        range.style.borderBottomWidth = '1px';
        pointer.style.backgroundPosition = '-330px -80px';
    };
    range.onmouseleave = function() {
        range.style.height = 28 + 'px';
        range.style.borderBottomWidth = 0;
        pointer.style.backgroundPosition = '-330px -70px';
    };
    for (var i = 0; i < choose.length; i++) {
        choose[i].index = i;
        choose[i].onclick = function() {
            var inner = choose[this.index].innerHTML;
            choose[this.index].innerHTML = choose[0].innerHTML;
            choose[0].innerHTML = inner;
            range.style.height = 28 + 'px';
            range.style.borderBottomWidth = 0;
            pointer.style.backgroundPosition = '-330px -70px';
        }
    };
    input.onfocus = function() {
        list.style.display = 'block';
    };
    input.onblur = function() {
        list.style.display = 'none';
    };
    cart.onmouseenter = function() {
        cartList.style.display = 'block';
        this.style.backgroundColor = '#fff';
        line.style.top = '43px';
    };
    cart.onmouseleave = function() {
        cartList.style.display = 'none';
        this.style.backgroundColor = '#f7f7f7';
        line.style.top = '44px';
    };
})();
//轮播图
var data = null;
(function() {
    var xhe = new XMLHttpRequest();
    xhe.open('get', 'data.txt', false);
    xhe.onreadystatechange = function() {
        if (xhe.readyState == 4 && xhe.status == 200) {
         data = utils.jsonParse(xhe.responseText);
        }
    };
    xhe.send();
})();
(function() {
    var menu = utils.getEleByClass('menu')[0];
    var wrap = utils.getEleByClass('wrap', menu)[0];
    var inner = utils.getEleByClass('inner', wrap)[0];
    var focus = utils.getEleByClass('focus', wrap)[0];
    var focuslis = focus.getElementsByTagName('li');
    var left = utils.getEleByClass('left', wrap)[0];
    var right = utils.getEleByClass('right', wrap)[0];
    var lis = inner.getElementsByTagName('li');
    var imgs = inner.getElementsByTagName('img');
    var dataimg = data;
    if (dataimg && dataimg.length) {
        var str = '';
        var str2 = '';
        for (var i = 0; i < dataimg.length; i++) {
            str += '<li style="background-color:' + dataimg[i].bg + '">';
            str += '<div class="main">';
            str += '<a href="javascript:;">';
            str += '<img real="' + dataimg[i].src + '" >';
            str += '</a>';
            str += '</div>';
            str += '</li>';
            str2 += i == 0 ? '<li class = cur></li>' : '<li></li>';
        }
    }
    inner.innerHTML = str;
    focus.innerHTML = str2;

    function checkimg() {
        for (var i = 0; i < imgs.length; i++) {
            var temp = document.createElement('img');
            temp.src = imgs[i].getAttribute('real');
            temp.index = i;
            temp.onload = function() {
                imgs[this.index].src = this.src;
                if (this.index == 0) {
                    lis[0].style.zIndex = 1;
                    animate({
                        ele: lis[0],
                        target: {
                            opacity: 1
                        },
                        duration: 500
                    })
                }
            }
        }
    }
    checkimg();
    var index = 0;

    function setImg() {
        for (var i = 0; i < lis.length; i++) {
            if (i == index) {
                lis[i].style.zIndex = 1;
                focuslis[i].className = 'cur';
                animate({
                    ele: lis[i],
                    target: {
                        opacity: 1
                    },
                    duration: 500,
                    callback: function() {
                        for (var i = 0; i < lis.length; i++) {
                            if (i !== index) {
                                lis[i].style.opacity = 0;
                            }
                        }
                    }
                })
            } else {
                lis[i].style.zIndex = 0;
                focuslis[i].className = '';
            }
        }
    }

    function automove() {
        index++;
        if (index == dataimg.length) {
            index = 0;
        }
        setImg();
    }
    var timer = window.setInterval(automove, 3500);
    wrap.onmouseenter = function() {
        window.clearInterval(timer);
        left.style.display = right.style.display = 'block';
    };
    wrap.onmouseleave = function() {
        timer = window.setInterval(automove, 3500);
        left.style.display = right.style.display = 'none';
    };
    left.onclick = function() {
        index--;
        if (index == -1) {
            index = dataimg.length - 1;
        }
        setImg();
    };
    right.onclick = function() {
        automove();
    };

    function focusmove() {
        for (var i = 0; i < focuslis.length; i++) {
            focuslis[i].index = i;
            focuslis[i].onmouseenter = function() {
                index = this.index;
                setImg();
            }
        }
    }
    focusmove();
})();
//绑定鼠标划过事件
;(function() {
    var list = utils.getEleByClass('menu-list')[0];
    var hid = utils.getEleByClass('menu-list-hid')[0];
    var lis = hid.getElementsByTagName('li');
    var lists = list.getElementsByTagName('li');
    for (var i = 0; i < lists.length; i++) {
        lists[i].a = i;
        lists[i].onmouseenter = function() {
            enter.call(this);
        };
        lists[i].onmouseleave = function() {
            leave.call(this);
        }
    }

    list.onmouseleave = hid.onmouseleave = function() {
        hid.style.display = 'none';
    };

    function enter() {
        var that = this;
        var p = this.getElementsByTagName('p')[0];
        p.style.backgroundColor = "#872222";
        p.style.marginLeft = "17px";
        hid.style.display = 'block';
        lis[that.a].style.display = "block";
        hid.onmouseenter = function() {
            hidenter.call(that);
        };
    }

    function hidenter() {
        hid.style.display = 'block';
        lis[this.a].style.display = "block";
    }

    function leave() {
        var p = this.getElementsByTagName('p')[0];
        p.style.backgroundColor = "#c23131";
        p.style.marginLeft = "12px";
        // hid.style.display = 'none';
        lis[this.a].style.display = "none";
    }
})();
;(function () {
    var right = utils.getEleByClass('menu-right')[0];
    var rightBom = utils.getEleByClass('right-bom',right)[0];
    var toUp = utils.getEleByClass('toup',rightBom);
    var bomHid = utils.getEleByClass('right-bom-hid',right)[0];
    var title = utils.getEleByClass('bom-hid-title',bomHid)[0];
    var titles = utils.listToArray(title.getElementsByTagName('li'));
    var content = utils.getEleByClass('bom-content',bomHid)[0];
    var span = content.getElementsByTagName('span')[0];
    var contents = utils.getEleByClass('cur',content);
    var close = utils.getEleByClass('icon',bomHid)[0];
    var keys = utils.getEleByClass('key',contents[0]);
    var lists = contents[0].getElementsByTagName('li');
    function select() {
                titles[this.temp].style.borderColor = '#e60012';
                contents[this.temp].style.display = 'block';
                span.style.left = this.temp*80 +'px';
                for(var j = 0;j<contents.length;j++){
                    if(j !==this.temp){
                        contents[j].style.display = 'none';
                        titles[j].style.borderColor = '#eee'
                    }
                }
            };
    for(var i = 0;i<toUp.length;i++){
        toUp[i].temp = i;
    toUp[i].onmouseenter = function () {
        bomHid.style.bottom = '1px';
        select.call(this);
    };
    titles[i].temp = i;
    titles[i].onmouseenter = function () {
        select.call(this);
    }
}
    close.onclick = function () {
        bomHid.style.bottom = '-185px';
    }
    for(var i =0;i<keys.length;i++){
        keys[i].a = i;
        keys[i].onmouseenter = function () {
           lists[this.a].className = 'open';
           for(var k = 0;k<lists.length;k++){
               if(k !== this.a){
                   lists[k].className = '';
               }
           }
        };
    }

})();
//活动专属
;(function () {
    var active = utils.getEleByClass('active')[0];
    var main = utils.getEleByClass('main',active)[0];
    var focus = utils.getEleByClass('focus',active)[0];
    var wrap = utils.getEleByClass('wrap',active)[0];
    var focusList = focus.getElementsByTagName('li'); //焦点集合
    var inner = utils.getEleByClass('inner',main)[0];
    var lis = utils.getEleByClass('ban',inner);//轮播内容
    var imgs = inner.getElementsByTagName('img');
    var left = utils.getEleByClass('left',main)[0];
    var right = utils.getEleByClass('right',main)[0];

    var index = 0;
    var oneWidth = utils.Css(wrap,'width');
   right.onclick = function () {
       if(index == lis.length-1){
           inner.style.left = 0;
           index = 0;
       }
       index++;
       for(var i =0 ;i<focusList.length;i++){
           if(i == index){
               focusList[i].style.backgroundColor = " #ff6137";
           }else if(index == focusList.length){
               focusList[0].style.backgroundColor = " #ff6137";
           }else{
               focusList[i].style.backgroundColor = "#e6dcdc";
           }
       }
       animate({
           ele:inner,
           target:{
               left:-index*oneWidth+21
           },
           duration:500
       });

   };
   left.onclick = function () {
       if(index == 0){
           inner.style.left = -(lis.length-1)*oneWidth +'px';
           index = lis.length-1;
       }
       index--;
       for(var i =0 ;i<focusList.length;i++){
           if(i == index){
               focusList[i].style.backgroundColor = " #ff6137";
           }else if(index == -1){
               focusList[focusList.length-1].style.backgroundColor = " #ff6137";
           }else{
               focusList[i].style.backgroundColor = "#e6dcdc";
           }
       }
       animate({
           ele:inner,
           target:{
               left:-index*oneWidth-21
           },
           duration:500
       });
   };
   for(var i = 0;i< imgs.length;i++){
       imgs[i].onmouseenter = function () {
           this.style.height = 110 +'px';
           this.style.width = 110 +'px';
           this.style.marginLeft = -55+'px';
           this.style.marginTop = -55 +'px';
       }
       imgs[i].onmouseleave = function () {
           this.style.height = 100 +'px';
           this.style.width = 100 +'px';
           this.style.marginLeft = -50+'px';
           this.style.marginTop = -50 +'px';
       }
   }
})();
//团购活动里小图片移动
;(function () {
    var group = utils.getEleByClass('group')[0];
    var moves = utils.getEleByClass('move',group);
    for(var i =0;i<moves.length;i++){
        moves[i].onmouseenter = function () {
            this.style.marginLeft = -90+'px';
        };
        moves[i].onmouseleave= function () {
            this.style.marginLeft = -80+'px';
        };
    }
})();
//主题里的小轮播
var theme = utils.getEleByClass('theme')[0];
var wraps = utils.getEleByClass('wrap',theme);
;(function () {
    function Banner(wrap) {
        this.wrap = wrap;
        this.inner = utils.getEleByClass('inner',this.wrap)[0];
        this.imgs = this.inner.getElementsByTagName('img');
        this.moveWidth = utils.Css(wrap,'width');
        console.log(this.moveWidth);
        this.focus = utils.getEleByClass('focus',wrap)[0];
        this.focuslist = this.focus.getElementsByTagName('li');
        this.spans = this.focus.getElementsByTagName('span');
        this.index= 0;
        this.timer = null;
        this.init();
    }
    Banner.prototype.setImg = function () {
        for(var i = 0;i<this.imgs.length;i++){
            if(i === this.index) {
                animate({
                    ele: this.inner,
                    target: {
                        left: -i * this.moveWidth+3
                    },
                    duration: 500
                });
            }
        }
    };
    Banner.prototype.autoMove = function () {

        this.index++;
        if(this.index == this.imgs.length){
            this.inner.style.left = 0;
            this.index = 1;
        }
        this.setImg();
        for(var i =0;i<this.focuslist.length;i++){
            if(i===this.index ){
                this.focuslist[this.index].className = 'cur';
            }else if(this.index === this.imgs.length-1){
                this.focuslist[this.index-1].className = '';
                this.focuslist[0].className = 'cur';
            }
            else{
                this.focuslist[i].className = '';
            }
        }

    };
    Banner.prototype.focusEvent = function () {
        var that =this;
        for(var i = 0;i<this.focuslist.length;i++){
            this.focuslist[i].flag = i;
            this.focuslist[i].onmouseenter = function () {
                that.index = this.flag;
                this.className = 'cur';
                that.setImg();
                for(var i =0;i<that.focuslist.length;i++){
                    if( that.focuslist[i] !== this){
                        that.focuslist[i].className = '';
                    }
                }
            }
        }
    };
    Banner.prototype.removeInterval = function () {
        var that = this;
        // console.log(wrap);
        this.wrap.onmouseenter = function () {
            window.clearInterval(that.timer)
        };
        this.wrap.onmouseleave = function () {
            that.timer = window.setInterval(function () {
                that.autoMove();
            },2500);
        }
    };
    Banner.prototype.init = function () {
        var that = this;
        this.timer = window.setInterval(function () {
            that.autoMove();
        },2500);
        this.focusEvent();
        this.removeInterval();
    };
    window.Banner = Banner;
})();
;(function () {
    for(var i = 0;i<wraps.length;i++){
        var cur = wraps[i];
        new Banner(cur);
    }
})();
