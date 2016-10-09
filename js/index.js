$(function () {
    var r=Math.floor(Math.random()*255)
    var g=Math.floor(Math.random()*255)
    var b=Math.floor(Math.random()*255)
    var color="rgba("+r+","+g+","+b+",0.5)"

    //绘制地图
    for(var i=0;i<20;i++){
        for(var j=0;j<20;j++){
            $('<div>')
                .attr('id',i+'_'+j)
                .addClass('block')
                .appendTo('.box')
                .css("backgroundColor",color)
        }
    }
    //起始位置
    var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}]

    //给每个方块加编号
    function findDiv(x,y){
        return $('#'+x+'_'+y)
    }
    $.each(she,function(i,v){
        findDiv(v.x,v.y).addClass('she')
    })
    //放入食物
    var sheshen={}

    function fangshiwu(){
        do{
            var x=Math.floor(Math.random()*20)
            var y=Math.floor(Math.random()*20)
        }while(sheshen[x+'_'+y]){
            findDiv(x,y).addClass('shiwu')
            return {x:x,y:y}
        }
    }
    var shiwu=fangshiwu()

    var direction='you';
    var move=function(){
        var jiutou=she[she.length-1]
        if(direction=='you'){
            var xintou={x:jiutou.x,y:jiutou.y+1}
        }
        if(direction=='xia'){
            var xintou={x:jiutou.x+1,y:jiutou.y}
        }
        if(direction=='shang'){
            var xintou={x:jiutou.x-1,y:jiutou.y}
        }
        if(direction=='zuo'){
            var xintou={x:jiutou.x,y:jiutou.y-1}
        }
        if(xintou.x<0||xintou.x>20||xintou.y<0||xintou.y>20){
            clearInterval(t)
            $('.lost').css({
                display:'block'
            })
            return
        }
        if(sheshen[xintou.x+'_'+xintou.y]){
            clearInterval(t)
            alert('eat yourself')
            return
        }
        she.push(xintou);
        sheshen[xintou.x+'_'+xintou.y]=true
        findDiv(xintou.x,xintou.y).addClass('she')
        if(xintou.x==shiwu.x&&xintou.y==shiwu.y){
            findDiv(shiwu.x,shiwu.y).removeClass('shiwu')
            shiwu=fangshiwu()
        }else{
            var weiba=she.shift()
            delete sheshen[weiba.x+'_'+weiba.y]
            findDiv(weiba.x,weiba.y).removeClass('she')
        }


    }

    // var t=setInterval(move,500)

    //点击按钮准备开始游戏
    $('.snake-start').on('click',function () {
        $(this).find('ul').slideToggle('down')
    })
    var snakeEasy=$('.snake-start .snake-easy')
    var snakeMedium=$('.snake-start .snake-medium')
    var snakeHard=$('.snake-start .snake-hard')
    var aaa=0;
    snakeEasy.on('click',function () {
        t=setInterval(move,500)
        aaa=500;
    })
    snakeMedium.on('click',function () {
        t=setInterval(move,250)
        aaa=250;
    })
    snakeHard.on('click',function () {
        t=setInterval(move,100)
        aaa=100;
    })
    //点击暂停
    // console.log(aaa)
    var snakePause=$('.snake-paused')
    snakePause.on('click',function () {
        $(this).toggleClass('start-paused')
        clearInterval(t)
    })
    var snakeStarts=$('.start-paused')
    snakeStarts.on('click',function () {
        // t=setInterval(move,aaa)
    })
    //点击结束按钮
    var snakeStop=$('.snake-stop')
    snakeStop.on('click',function () {
        if(confirm('是否结束')){
            $('.stopped').css({
                display:'block'
            })
        }
    })


    //控制蛇的方向
    $(document).on('keyup',function(e){
        var keynum={37:'zuo',38:'shang',39:'you',40:'xia'}
        var fannum={'zuo':37,'shang':38,'you':39,'xia':40}

        if(Math.abs(e.keyCode-fannum[direction])==2){
            return
        }else{
            direction=keynum[e.keyCode]
        }
    })
})