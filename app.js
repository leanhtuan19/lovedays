const yourDate = new Date("2025-02-25T00:00:00"),
      music = ['nhactinhyeu'];

      document.addEventListener('DOMContentLoaded', function(){
            var rootTime = document.querySelector("time");

            document.querySelector("anni").textContent = `${(yourDate.getDate()>9)?yourDate.getDate():"0"+yourDate.getDate()}-${(yourDate.getMonth()>8)?(yourDate.getMonth()+1):"0"+(yourDate.getMonth()+1)}-${yourDate.getFullYear()}`;
            
            document.querySelector("date").textContent = Math.floor( Math.floor((new Date() - yourDate) / 1000) / 60 / 60 / 24)+" DAYS";

            function olock() {
                  var today = new Date(),
                  hrs = (Math.floor( Math.floor((today - yourDate) / 1000) / 60 / 60)) % 24,
                  min = (Math.floor( Math.floor((today - yourDate) / 1000) / 60)) % 60,
                  sec =  Math.floor((today - yourDate) / 1000) % 60;
                  rootTime.textContent = `${(hrs>9)?hrs:"0"+hrs}:${(min>9)?min:"0"+min}:${(sec>9)?sec:"0"+sec}`;
            } olock();
            var timer = setInterval(function(){olock()}, 1000);
            document.querySelector("audio").setAttribute("src", `music/${music[Math.floor(Math.random()*music.length)]}.mp3`);

            const audio = document.querySelector("audio");
            audio.play();

            document.body.addEventListener('click', function playMusicOnce() {
      audio.play();
      document.body.removeEventListener('click', playMusicOnce);
      });

            audio.addEventListener('error', function() {
            document.body.addEventListener('click', function once() {
                  audio.play();
                  document.body.removeEventListener('click', once);
            });
            });

            const heart = document.getElementById('heart');
            const loveColors = [
                  "#FF69B4", 
                  "#FF1493",
                  "#FF6F91",
                  "#FFB6C1", 
                  "#FF4F81", 
                  "#FF3366",
                  "#FF1744", 
                  "#F06292", 
                  "#E040FB", 
                  "#F48FB1" 
            ];
            let colorIndex = 0;

            heart.addEventListener('animationiteration', function() {
                  colorIndex = (colorIndex + 1) % loveColors.length;
                  heart.style.color = loveColors[colorIndex];
            });

            heart.addEventListener('click', function() {
                  colorIndex = (colorIndex + 1) % loveColors.length;
                  heart.style.color = loveColors[colorIndex];
                  heart.style.animation = "heartbeat 0.5s";
                  setTimeout(() => {
                        heart.style.animation = "heartbeat 2s infinite";
                  }, 500);
            });

            // --- Canvas Heart Animation ---
            var c = document.getElementById("c");
            if (c) {
            var ctx = c.getContext("2d");

            function resizeCanvas() {
            c.width = window.innerWidth;
            c.height = window.innerHeight;
            cw = c.width;
            ch = c.height;
            }
            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();

            var cw = c.width,
                  cx = cw / 2;
            var ch = c.height,
                  cy = ch / 2;

            var rad = Math.PI / 180;
            var stopped = true;
            var howMany = 100;
            var Circles = [];
            ctx.strokeStyle = "red";
            ctx.fillStyle = "rgba(255, 234, 234, 0.59)";
            ctx.globalAlpha = 0.75;

            function Circle() {
                  this.R = randomIntFromInterval(50, 200);
                  this.X = randomIntFromInterval(this.R, cw - this.R);
                  this.Y = randomIntFromInterval(this.R, ch - this.R);
                  this.iX = 2 * Math.random() * (Math.random() < 0.5 ? -1 : 1);
                  this.iY = 2 * Math.random() * (Math.random() < 0.5 ? -1 : 1);

                  this.r = randomIntFromInterval(5, 50);
                  this.r1 = randomIntFromInterval(this.R / 2, this.R);

                  this.a = ~~(Math.random() * 360) + 1;
                  this.x = this.X + this.r1 * Math.cos(this.a * rad);
                  this.y = this.Y + this.r1 * Math.sin(this.a * rad);
                  this.l = randomIntFromInterval(50, 80);
            }

            Circles = [];
            for (var i = 0; i < howMany; i++) {
                  var circle = new Circle();
                  Circles.push(circle);
            }

            function Draw() {
                  ctx.clearRect(0, 0, cw, ch);
                  ctx.fillRect(0, 0, cw, ch);

                  for (var i = 0; i < Circles.length; i++) {
                        var p = Circles[i];
                        if (p.X < p.R || p.X > cw - p.R || p.Y < p.R || p.Y > ch - p.R) {
                        p.iX *= -1;
                        p.iY *= -1;
                        }

                        p.X += p.iX;
                        p.Y += p.iY;
                        p.a += 1;
                        p.x = p.X + p.r1 * Math.cos(p.a * rad);
                        p.y = p.Y + p.r1 * Math.sin(p.a * rad);
                        p.gx = p.x + p.r * Math.cos(p.a * rad);
                        p.gy = p.y + p.r * Math.sin(p.a * rad);

                        ctx.save();
                        ctx.fillStyle = Grd(p.gx, p.gy, p.r, p.l);
                        heart(p.x, p.y, p.r, p.a);
                        ctx.restore();
                  }
                  requestId = window.requestAnimationFrame(Draw);
            }

            function randomIntFromInterval(mn, mx) {
                  return ~~(Math.random() * (mx - mn + 1) + mn);
            }

            function Grd(x, y, r, l) {
                  var grd = ctx.createRadialGradient(x, y, 0, x, y, r);
                  grd.addColorStop(0, "hsla(0, 99%," + l + "%,.9)");
                  grd.addColorStop(1, "hsla(0, 99%," + l + "%, 0.1)");
                  return grd;
            }

            function heart(x, y, r, a) {
                  ctx.beginPath();
                  var x1 = x + r * Math.cos(a * rad);
                  var y1 = y + r * Math.sin(a * rad);
                  var cx1 = x + r * Math.cos((a + 22.5) * rad);
                  var cy1 = y + r * Math.sin((a + 22.5) * rad);

                  var cx2 = x + r * Math.cos((a - 22.5) * rad);
                  var cy2 = y + r * Math.sin((a - 22.5) * rad);
                  var chord = 2 * r * Math.sin((22.5 * rad) / 2);

                  ctx.beginPath();
                  ctx.moveTo(x1, y1);
                  ctx.arc(cx1, cy1, chord, (270 + a) * rad, (270 + a + 225) * rad);
                  ctx.lineTo(x, y);
                  ctx.moveTo(x1, y1);
                  ctx.arc(cx2, cy2, chord, (90 + a) * rad, (90 + a + 135) * rad, true);
                  ctx.lineTo(x, y);
                  ctx.fill();
            }

            function start() {
                  requestId = window.requestAnimationFrame(Draw);
                  stopped = false;
            }

            function stopAnim() {
                  if (requestId) {
                        window.cancelAnimationFrame(requestId);
                  }
                  stopped = true;
            }

            start();
            c.addEventListener(
                  "click",
                  function () {
                        stopped == true ? start() : stopAnim();
                  },
                  false
            );
            }
      }, false);