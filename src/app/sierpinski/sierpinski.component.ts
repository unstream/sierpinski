import {Component} from "@angular/core";
import {ViewChild} from "@angular/core";
import {AfterViewInit} from "@angular/core";

//import {HostListener} from "@angular/core";

@Component({
  selector: `fractal-app`,
  templateUrl: './sierpinski.component.html',
  styleUrls: ['./sierpinski.component.css']
})

export class Sierpinski implements AfterViewInit {
  iterations: number = 8;
  maxIterations: number = 9;

  static readonly SQRT075 = Math.sqrt(0.75);
  color: string = "#ff6b09";
  color2: string = "#ffad20";
  context: CanvasRenderingContext2D;

  @ViewChild("myCanvas") myCanvas;


  ngAfterViewInit() {
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");
    //this.context.translate(0.5, -0.5);
    this.draw();
  }

  //@HostListener('window:resize', ['$event.target'])
  resizeCanvas(event) {
    // var size = Math.min(event.innerWidth, event.innerHeight - 100);
    // this.context.canvas.width = size;
    // this.context.canvas.height = size;
    // this.draw();
  }


  drawTriangle(ctx, x, y, length, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();

    ctx.moveTo(x, y);
    ctx.lineTo(x + length, y);
    ctx.lineTo(x + length / 2, y - length * Sierpinski.SQRT075);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.closePath();
  }

  interpolateColor(color1: string, color2: string, interpolation: number): string {
    if (isNaN(interpolation)) interpolation = 0.5;
    let i = interpolation;
    let j = 1 - i;
    let r = Math.floor((j * parseInt(color1.substr(1, 2), 16)
      + i * parseInt(color2.substr(1, 2), 16)));
    let g = Math.floor((j * parseInt(color1.substr(3, 2), 16)
      + i * parseInt(color2.substr(3, 2), 16)));
    let b = Math.floor((j * parseInt(color1.substr(5, 2), 16)
      + i * parseInt(color2.substr(5, 2), 16)));
    let color: string = "#"
      + this.pad(r.toString(16), 2)
      + this.pad(g.toString(16), 2)
      + this.pad(b.toString(16), 2);
    return color;
  }

  pad(num, size): string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  recursion(ctx, x, y, length, i) {
    if (i < this.iterations) {
      this.recursion(ctx, x, y, length / 2, i + 1);
      this.recursion(ctx, x + length / 2, y, length / 2, i + 1);
      this.recursion(ctx, x + length / 4, y - length * Sierpinski.SQRT075 / 2, length / 2, i + 1);
    }
    var interpolated = this.interpolateColor(this.color, this.color2, i / this.iterations);
    this.drawTriangle(ctx, x, y, length, interpolated);

  }

  draw() {
    let ctx = this.context;
    ctx.fillStyle = this.color;
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    let l = Math.min(ctx.canvas.clientWidth, ctx.canvas.clientWidth);
    //let offset = l * (1 - Sierpinski.SQRT075) / 2;
    this.recursion(ctx, 0, l * Sierpinski.SQRT075, l, 0);
    ctx.closePath();
  }
}
