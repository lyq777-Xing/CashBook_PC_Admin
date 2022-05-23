// window.onload = function() {
//     var canvas = document.getElementById("canvas")
//     canvas.width = window.innerWidth
//     canvas.height = window.innerHeight
//     var ctx = canvas.getContext("2d")
//     var particlesArray = []
//     var count = parseInt(canvas.height / 100 * canvas.width / 100)
//     class Particle {
//         constructor(x, y) {
//             this.x = x
//             this.y = y
//             this.directionY = 0.5 - Math.random()
//             this.directionX = 0.5 - Math.random()
//         }
//         update() {
//             this.y += this.directionY
//             this.x += this.directionX
//         }
//         draw() {
//             ctx.beginPath()
//             ctx.arc(this.x, this.y, 2, 0, Math.PI * 2)
//             ctx.fillStyle = "white"
//             ctx.fill()
//         }
//     }

//     function createParticle() {
//         var x = Math.random() * canvas.width
//         var y = Math.random() * canvas.height
//         particlesArray.push(new Particle(x, y))
//     }

//     function handleParticle() {
//         for (var i = 0; i < particlesArray.length; i++) {
//             var particle = particlesArray[i]
//             particle.update()
//             particle.draw()
//             if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
//                 particlesArray.splice(i, 1)
//             }
//             for (var j = i; j < particlesArray.length; j++) {
//                 dx = particlesArray[i].x - particlesArray[j].x
//                 dy = particlesArray[i].y - particlesArray[j].y
//                 long = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
//                 if (long < 100) {
//                     ctx.beginPath()
//                     ctx.strokeStyle = "rgba(255,255,255," + (1 - long / 200) + ")"
//                     ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
//                     ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
//                     ctx.lineWidth = 1
//                     ctx.stroke()
//                 }
//             }
//         }
//     }

//     function draw() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height)
//         if (particlesArray.length < count) {
//             createParticle()
//         }
//         handleParticle()
//     }
//     setInterval(() => {
//         draw(), 1
//     })

//     // var cn;
//     // var c;
//     // var u = 10;
//     // const m = {
//     //     x: 0,
//     //     y: 0
//     // };
//     // // 获取鼠标移动的位置
//     // window.onmousemove = function(e) {
//     //         m.x = e.clientX;
//     //         m.y = e.clientY;
//     //     }
//     //     // 设置随机颜色
//     // function gc() {
//     //     var s = "0123456789ABCDEF";
//     //     var c = "#";
//     //     for (var i = 0; i < 6; i++) {
//     //         c += s[Math.ceil(Math.random() * 15)]
//     //     }
//     //     return c
//     // }
//     // var a = [];
//     // // 创建画布
//     // window.onload = function myfunction() {
//     //     cn = document.getElementById('canvas');
//     //     c = cn.getContext('2d');
//     //     c.lineWidth = "2"; //多粗的线
//     //     c.globalAlpha = 0.5; //透明度
//     //     resize();
//     //     anim()
//     // }

//     // function ob(x, y, r, cc, o, s) {
//     //     this.x = x;
//     //     this.y = y;
//     //     this.r = r;
//     //     this.cc = cc;
//     //     this.theta = Math.random() * Math.PI * 2;
//     //     this.s = s;
//     //     this.o = o;
//     //     this.t = Math.random() * 150;
//     //     this.o = o;
//     //     this.dr = function() {
//     //         const ls = {
//     //             x: this.x,
//     //             y: this.y
//     //         };
//     //         this.theta += this.s;
//     //         // 随机角度圆弧  这是转起来的必要
//     //         this.x = m.x + Math.cos(this.theta) * this.t;
//     //         this.y = m.y + Math.sin(this.theta) * this.t;

//     //         c.beginPath(); //开始一段新路径
//     //         c.lineWidth = this.r;
//     //         c.strokeStyle = this.cc;
//     //         c.moveTo(ls.x, ls.y); //先保存一个坐标
//     //         c.lineTo(this.x, this.y); // 从moveTo提供的坐标绘制到现在这个坐标
//     //         c.stroke(); //通过此函数将以上绘制的图形绘制到画布上
//     //         c.closePath(); // 使用闭合路径解决锯齿(自动将起点和结束点连接起来)
//     //     }
//     // }
//     // // canvas自适应页面宽度 
//     // function resize() {
//     //     cn.height = window.innerHeight;
//     //     cn.width = window.innerWidth;
//     //     for (var i = 0; i < 180; i++) {
//     //         // 创建元素
//     //         a[i] = new ob(window.innerWidth / 2, window.innerHeight / 2, 4, gc(), Math.random() * 200 + 20, 0.02);
//     //     }
//     // }
//     // // window.requestAnimationFrame() 方法跟 setTimeout 类似，都是推迟某个函数的执行。不同之处在于，setTimeout 必须指定推迟的时间;
//     // // window.requestAnimationFrame() 则是推迟到浏览器下一次重流时执行，执行完才会进行下一次重绘。重绘通常是 16.7ms(60fps / s) 执行一次，不过浏览器会自动调节这个速率，比如网页切换到后台 Tab 页时
//     // // ，window.requestAnimationFrame() 会暂停执行。
//     // // 如果某个函数会改变网页的布局，一般就放在 window.requestAnimationFrame() 里面执行，这样可以节省系统资源，使得网页效果更加平滑。因为慢速设备会用较慢的速率重流和重绘，而速度更快的设备会有更快的速率。
//     // // 该方法接受一个回调函数作为参数 window.requestAnimationFrame(callback)  window.cancelAnimationFrame()，用来取消回调函数的执行。

//     // function anim() {
//     //     requestAnimationFrame(anim); // 动画
//     //     c.fillStyle = "rgba(0.5,0,0,0.05)"; // 背景填充黑色  让路径隐藏
//     //     c.fillRect(0, 0, cn.width, cn.height); // 画一个矩形  宽高与页面一样  填充上面黑色
//     //     a.forEach(function(e, i) {
//     //         e.dr();
//     //     });

//     // }
// };