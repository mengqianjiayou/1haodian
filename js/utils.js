/**
 * Created by 79807 on 2017/3/1.
 */
var isStanderBrowser = !!window.getComputedStyle;
var utils = {
    listToArray: function (list) { //类数组转化成数组
        try {
            return Array.prototype.slice.call(list, 0);
        } catch (e) {
            var ary = [];
            for (var i = 0; i < list.length; i++) {
                ary.push(list[i]);
            }
            return ary;
        }
    },
    offset: function (ele) {
        var l = null;
        var t = null;
        l += ele.offsetLeft;
        t += ele.offsetTop;
        var par = ele.offsetParent;
        while (par) {
            l += par.clientLeft + par.offsetLeft;
            t += par.clientTop + par.offsetTop;
            par = par.offsetParent;
        }
        return {left: l, top: t};
    },
    win: function (attr, val) {
        if (typeof val != 'undefined') {
            document.documentElement[attr] = val;
            document.body[attr] = val;
            return;
        }
        return document.documentElement[attr] || document.body[attr];
    },
    jsonParse: function (jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval('(' + jsonStr + ')');
    },
    getCss: function (ele, attr) {
        var val = null;
        if (window.getComputedStyle) {
            val = window.getComputedStyle(ele)[attr];
        } else { // ie
            if (attr == 'opacity') {
                val = ele.currentStyle.filter; // alpha(opacity=55.5)  \d+
                var reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = ele.currentStyle[attr];
            }
        }
        // 100px -100px 100.5px  "1"
        var reg = /^-?\d+(\.\d+)?(px)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    },
    setCss: function (ele, attr, val) {
        if (attr == 'opacity') {
            ele.style.opacity = val;
            ele.style.filter = 'alpha(opacity=' + val * 100 + ')';
            return;
        }
        if (attr == 'float') {
            ele.style.cssFloat = val;
            ele.style.styleFloat = val; // ieLow
            return;
        }
        var reg = /width|height|top|left|right|bottom|(margin|padding)(Left|Right|Top|Bottom)?/;
        if (reg.test(attr)) { // 如果验证属性名字通过，就是来设置width等属性
            if (!isNaN(val)) {
                val += 'px';
            }
        }
        ele.style[attr] = val;
    },
    setGroupCss:function (ele,group) {
        if(Object.prototype.toString.call(group) == '[object object]'){
            for(key in group){
                setCss(ele,key,group[key]);
            }
        }
    },
    Css:function (ele) {
        var second = arguments[1];
        var third = arguments[2];
        if(typeof second == 'string'){
            if(typeof third == 'undefined'){
                return this.getCss(ele,second);
            }
            this.setCss(ele,second,third);
        }
        second = second || []; //防止第二个参数没有传
        if(second.toString() == '[object object]'){
            this.setGroupCss(ele,second);
        }
    },
    getEleByClass:function (className,context) {
        context = context|| document;
        if (context.getElementsByClassName){
            return this.listToArray( context.getElementsByClassName(className));
        }
        var classAry = className.replace(/(^ +)|( +$)/g ,"").split(/ +/);
        var tags = context.getElementsByTagName("*");
        var ary =[];
        for(var i = 0;i < tags.length;i++){
            var curtag = tags[i];
            var flag = true;
            for(var j=0;j<classAry.length;j++){
                var curclass = classAry[j];
                var reg = new RegExp('(^| +)'+ curclass+ '( +|$)');
                if(!reg.test(curtag)){
                    flag =false;
                    break;
                }
            }
            // if(flag){
            //     ary.push(curtag);
            // }
            flag && ary.push(curtag);
        }
        return ary;
    },
    hasClass:function (ele,name) {//判断ele中是否包含name这个类
        return new RegExp('(^| +)'+name +'( +|$)').test(ele.className);
    },
    addClass:function (ele,name) { //给ele增加name这个类
        var nameAry = name.replace(/(^ +| +$)/g,"").split(/ +/);
        for(var i =0;i<nameAry.length;i++){
            //如果原来有这个类那么就不增加了
            if(!this.hasClass(ele,nameAry[i])){
               ele.className += ' '+nameAry[i];
            }
        }
    },
    remove:function (ele,name) {
      var nameAry = name.replace(/(^ +| +$)/g,"").split(/ +/);
        for(i=0;i<nameAry.length;i++){
            var cur = nameAry[i];
            if(this.hasClass(ele,cur)){
                var reg= new RegExp('(^| +)'+cur+'( +|$)','g');
                ele.className = ele.className.replace(reg," ");
            }
        }
    },
    prev:function (ele) {
        if(isStanderBrowser){
            return ele.previousElementSibling;
        }
        var pre = ele.previousSibling;
        while (pre && pre.nodeType !=1){
            pre =pre.previousSibling;
        }
        return pre;
    },
    next:function (ele) {
        if(isStanderBrowser){
            return ele.nextElementSibling;
        }
        var next = ele.nextSibling;
        while (next && next.nodeType !=1){
            next =next.nextSibling;
        }
        return next;
    },
    prevAll:function (ele) {//所有哥哥元素
        var ary =[];
        var pre = this.prev(ele);//先获取一个元素哥哥回来
        while(pre){
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    },
    nextAll:function (ele) {//所有哥哥元素
        var ary =[];
        var next = this.next(ele);//先获取一个元素哥哥回来
        while(next){
            ary.push(next);
            next = this.next(next);
        }
        return ary;
    },
    siblings:function (ele) {
        return this.prevAll(ele).concat(this.nextAll(ele));
    },
    index:function (ele) {
        return this.prevAll(ele).length;
    },
    childs:function (ele,tagname) {//所有元素子节点
        var ary =[];
        if(isStanderBrowser){
            ary =  this.listToArray(ele.children);
        }else{
            var childs = ele.childNodes;
            for(var i =0;i<childs.length;i++){
                if(childs[i].nodeType == 1){
                    ary.push(childs[i]);
                }
            }
        }
        if(typeof tagname == 'string'){
            for(var i =0;i<ary.length;i++){
                if(ary[i].nodename == tagname.toUpperCase()){
                    ary.splice(i,1);
                    i--;
                }
            }
        }
        return ary;
    }
};
/*
* dom.classList.add("abc");增加类
* dom.classList.remove("abc");移除类
* dom.classList.toggle("abc");切换  true增加false移除
* */
