const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
 
let w = (canvas.width = window.innerWidth);
let h = (canvas.height = window.innerHeight);
 
let t = 0;
let speed = 3;
let interval;
 
ctx.imageSmoothingQuality = "high";
 
class GenesisTypewriter {
  constructor() {
    this.tl = null;
    this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.text = this.letters[random(0, this.letters.length)];
    this.font1 = { size: random(20, 100) };
    this.font2 = { size: random(160, 600) };
    this.pos1 = { x: random(0, w), y: random(0, h) };
    this.pos2 = { x: random(0, w), y: random(0, h) };
    this.line1 = { width: 1 };
    this.line2 = { width: random(3, 7) };
    this.rot1 = { angle: random(1, 44) };
    this.rot2 = { angle: random(1, 44) };
 
    ctx.font = `${this.font1.size}px bold serif`;
    ctx.lineWidth = this.line1.width;
    ctx.strokeStyle = "white";
    ctx.fillStyle = "black";
 
    this.getTweens();
 
    this.draw = () => {
      ctx.fillText(this.text, this.pos1.x, this.pos1.y);
      ctx.strokeText(this.text, this.pos1.x, this.pos1.y);
 
      t++;
      if (t % 1000 === 0) {
        this.tl.kill();
        this.text = this.letters[random(0, this.letters.length)];
        this.font1 = { size: random(20, 100) };
        this.font2 = { size: random(160, 600) };
        this.pos1 = { x: random(0, w), y: random(0, h) };
        this.pos2 = { x: random(0, w), y: random(0, h) };
        this.line1 = { width: 1 };
        this.line2 = { width: random(3, 7) };
        this.rot1 = { angle: random(1, 44) };
        this.rot2 = { angle: random(1, 44) };
 
        ctx.font = `${this.font1.size}px bold serif`;
        ctx.lineWidth = this.line1.width;
        ctx.strokeStyle = Math.random() < 0.25 ? "white" : randomColor();
        ctx.fillStyle = "black";
 
        this.getTweens();
      }
      ctx.translate(w / 2, h / 2);
      ctx.rotate((this.rot1.angle * 180) / Math.PI);
      ctx.translate(-w / 2, -h / 2);
      interval = requestAnimationFrame(this.draw);
    };
  }
 
  getTweens() {
    this.tl = gsap.timeline({
      defaults: { repeat: -1, yoyo: true, easing: "back.out(1.7)" }
    });
    this.tl
      .to(
        this.font1,
        {
          duration: random(12, 40),
          size: this.font2.size,
          onUpdate: () => (ctx.font = `${this.font1.size}px bold serif`)
        },
        "<"
      )
      .to(
        this.pos1,
        {
          duration: random(15, 50),
          x: this.pos2.x
        },
        "<"
      )
      .to(
        this.pos1,
        {
          duration: random(15, 50),
          y: this.pos2.y
        },
        "<"
      )
      .to(
        this.line1,
        {
          duration: random(6, 14),
          width: this.line2.width,
          onUpdate: () => (ctx.lineWidth = this.line1.width)
        },
        "<"
      );
  }
}
 
const test = new GenesisTypewriter();
test.draw();
 
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}
 
function randomColor(minC = 0, maxC = 255, minA = 0.1, maxA = 1) {
  const r = random(minC, maxC);
  const g = random(minC, maxC);
  const b = random(minC, maxC);
  const a = Math.random() * (maxA - minA) + minA;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
 
