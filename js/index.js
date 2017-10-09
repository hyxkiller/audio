function music(){
    this.index = document.getElementById("audio");
    this.resource = [
        {
                "tittle" : "幻听",
                "record" : "幻听",
                "singer" : "许嵩",
                "path"   : "audio/许嵩-幻听.mp3"
            },
            {
                "tittle" : "一半",
                "record" : "绅士",
                "singer" : "薛之谦",
                "path"   : "audio/一半-薛之谦.mp3"
            },
            {
                "tittle" : "丑八怪",
                "record" : "绅士",
                "singer" : "薛之谦",
                "path"   : "audio/丑八怪-薛之谦.mp3"
            },
            {
                "tittle" : "演员",
                "record" : "绅士",
                "singer" : "薛之谦",
                "path"   : "audio/演员-薛之谦.mp3"
            },
            {
                "tittle" : "绅士",
                "record" : "绅士",
                "singer" : "薛之谦",
                "path"   : "audio/绅士-薛之谦.mp3"
            },
            {
                "tittle" : "认真的雪",
                "record" : "绅士",
                "singer" : "薛之谦",
                "path"   : "audio/认真的雪-薛之谦.mp3"
            }
    ]
    this.canvas();
    this.audio();
    this.voice();
    this.again();
    this.randPlay();
    this.list();
    this.tittle = document.getElementById("tittle");
    this.singer = document.getElementById("singer");
    this.records = document.getElementById("records");
    this.num = 0;
}
music.prototype = {
    canvas : function() {
        let canvas = document.getElementById("canvas1");
        let context = canvas.getContext('2d');
        context.beginPath();
        context.arc(60, 20, 20, 0 ,Math.PI * 2, true);
        context.strokeStyle='#fff';
        context.fillStyle='#fefefe';
        context.fill();        
        context.stroke();

        context.beginPath(); 
        context.lineWidth = 12;
        context.strokeStyle = "#EEEEF0"
        context.moveTo(60,40)
        context.lineTo(60,160);
        context.quadraticCurveTo(63, 180,40 , 200);
        context.stroke();
        
        context.beginPath();
        context.moveTo(40,200);
        context.lineTo(0,230);
        context.lineWidth = 20;
        context.fillStyle = "#f0f0f0";
        context.closePath();
        context.stroke();

        context.beginPath();  //arrow
        context.moveTo(15,210);
        context.lineTo(32,205);
        context.lineTo(24,220);
        context.strokeStyle = "#000";
        context.lineWidth = 5;
        context.lineCap='round';
        context.lineJoin='round';
        context.stroke();

        context.beginPath();
        context.arc(60, 20, 10, Math.PI / 180 * 1 ,Math.PI / 180 * 2, true);
        context.shadowOffsetX = "2"; 
        context.shadowOffsetY = "2"; 
        context.shadowBlur = "5"; 
        context.shadowColor = "red"; 
        context.fillStyle = "#9b9b9b";
        context.fill();
        context.stroke();
    },
    audio : function() {
        let that = this;
        this.play();
        this.prev();
        this.next();
        this.index.addEventListener("ended",function(){
            that.nextPlay();
        })
    },
    prev : function(){
        let prev = document.getElementById("prev"),
            that = this;
        prev.addEventListener("click",function(){
            if(that.num>0){
                that.message(that.resource[--that.num]);
            }else{
                that.num = that.resource.length - 1;
                that.message(that.resource[that.num])
            }
            that.plays();
        })
    },
    message : function(msg){
        this.index.src = msg.path; 
        this.tittle.innerHTML = msg.tittle ;
        this.singer.innerHTML = msg.singer;
        this.records.innerHTML = "专辑：" + msg.record;
    },
    play : function(){
        let that= this;
        let stop = document.getElementById("stop"),
            $can  = $(".rocker"),
            $record = $(".recordlist");
        stop.addEventListener("click",function(){
            if(that.index.paused){                
                that.plays();
            }else{
                that.index.pause();
                this.innerHTML = "&#xe62c";
                $can.css({"transform": "rotate(-30deg)"})     
                $record.css({"animation": ""})                
            }
        })
    },
    plays : function(){
        this.index.play();
        document.getElementById("stop").innerHTML = "&#xe62f";
        $(".rocker").css({"transform": "rotate(0deg)"})
        $(".recordlist").css({animation: "record 8s linear infinite"})
        this.time();
        this.drag();
        this.progress();
    },
    next : function(){
        let next = document.getElementById("next"),
            that = this;
        next.addEventListener("click",function(){
            that.nextPlay();
        })
    },
    time : function(){
        let that = this,
            alltime = this.index.duration;
        document.getElementById("all").innerHTML = that.cutTime(alltime / 60) + ":" + that.cutTime(alltime % 60)
        this.index.addEventListener("timeupdate",function(){
            let hadtime = that.index.currentTime;    
            document.getElementById("had").innerHTML = that.cutTime(hadtime / 60) + ":" + that.cutTime(hadtime % 60)
        })
        this.index.addEventListener("canplaythrough",function(){
            let alltime = that.index.duration;
            document.getElementById("all").innerHTML = that.cutTime(alltime / 60) + ":" + that.cutTime(alltime % 60)
        })        
    },
    cutTime :  function(time){
        let value = (time > 10 ? time + '' : '0' + time).substring(0, 2);
        return isNaN(value) ? '00' : value;
    },
    voice : function(){
        let voice = document.getElementById("voice"),
            muted = document.getElementById("muted"),
            voices = document.getElementById("voices"),
            big = document.getElementsByClassName("big")[0],
            that = this,
            isMuted = false;
        big.addEventListener("mouseenter",function(){
            voice.style.display = "block";
            vol = parseInt(voices.style.width);
        })
        big.addEventListener("mouseleave",function(){
            voice.style.display = "none";
        })
        muted.addEventListener("click",function(){
            if(!isMuted){
                that.index.muted = true;
                isMuted = true;
                muted.innerHTML = "&#xe614;"
                voice.children[0].style.height = 0
            }else{
                that.index.muted = false;
                isMuted = false;
                muted.innerHTML = "&#xe615;"
                voices.style.width = vol + "px";
                voices.style.height = "11px";
            }
        })
        voice.addEventListener("click",function(e){
            voices.style.width = e.offsetX + "px";
            that.index.volume = parseInt(voices.style.width)/100;
        })
    },
    drag :  function(){
        let drag = document.getElementsByClassName('drag')[0],
            has  = document.getElementsByClassName('has')[0],
            $main = $('main'),
            tag = document.getElementsByClassName("play-tag")[0],
            mains = document.getElementsByTagName("main")[0],            
            that = this;
        drag.addEventListener("mousedown",function(e){
            e.preventDefault();
            let mouse = e.offsetX,
                main = $main.offset().left;
            document.addEventListener("mousemove",move)
            drag.addEventListener("mouseup",function(){
                document.removeEventListener("mousemove",move);
                let rate = ((drag.offsetLeft + 5)/300).toFixed(2);
                    duT  = that.index.duration;
                that.index.currentTime = duT * rate;
            })
            function move(e){
                drag.style.left = Math.min($main.width() - drag.offsetWidth,Math.max(0,e.clientX - mouse - main)) + "px";                
            }
        })
        mains.addEventListener("mouseenter",function(e){
            e.preventDefault();
            let mou = e.offsetX;
            this.addEventListener("mousemove",function(e){
                let mou = e.offsetX;
                this.addEventListener("click",function(){
                    let rates = (mou/300).toFixed(2);
                    durT  = that.index.duration;
                    that.index.currentTime = durT * rates;
                })
            })
        })
    },
    progress : function(){
        let $pro = $('.has'),
            that = this,
            drag = document.getElementsByClassName('drag')[0],
            isDrag = false;
        this.index.addEventListener("canplaythrough",function(){
            let durT = that.index.duration;
            that.index.addEventListener("timeupdate",function(){
                let cutT = that.index.currentTime,
                    hasplay = (cutT/durT).toFixed(2)*300;
                $pro.width(hasplay);
                // drag.addEventListener("mousedown",function(){
                // })
                // function dragMove(){
                    drag.style.left = hasplay + "px";                
                // }
            })
        })
    },
    again : function(){
        let again = document.getElementById("again"),
            that = this;
        again.addEventListener("click",function(){
            that.index.currentTime = 0;
        })
    },
    randInt : function(min,max){
        return Math.round(Math.random()*(max-min)) + min;
    },
    randPlay : function(){
        let that = this,
            rand = document.getElementById("rand"),
            isRand = false;
        rand.addEventListener("click",function(){
            if(isRand){
                isRand = false;
            }else{
                that.index.addEventListener("ended",function(){
                    that.num = that.randInt(0,that.resource.length-1);
                    that.message(that.resource[that.num])
                    that.plays();
                })
                isRand = true;
            }
        })
    },
    nextPlay : function(n){
        if(this.num<this.resource.length-1){
            this.message(this.resource[++this.num])
        }else{
            this.num = 0;
            this.message(this.resource[this.num])
        }
        this.plays();
    },
    list : function(){
        let sing = document.getElementsByClassName("sing")[0],
            that = this;
        for(let a=0;a<this.resource.length;a++){
            let item = `<li>
                <ul class="sings">
                    <li class="stittle">${this.resource[a].tittle}</li>
                    <li class="ssinger">${this.resource[a].singer}</li>
                    <li class="srecord">${this.resource[a].record}</li>                        
                </ul>
            </li>`;
            sing.innerHTML += item;
        }
        for(let b=0; b<sing.children.length;b++){
            sing.children[b].addEventListener("click",function(){
                that.num = b;
                that.message(that.resource[that.num])
                that.plays();
            })
        }
        
    }
}