import {Component} from '@angular/core';
import {ViewChild} from '@angular/core';
import {AfterViewInit} from '@angular/core';


@Component({
  selector: `app-fractal`,
  templateUrl: './sierpinski.component.html',
  styleUrls: ['./sierpinski.component.css']
})

export class SierpinskiComponent implements AfterViewInit {
  static readonly SQRT075 = Math.sqrt(0.75);

  iterations = 8;
  maxIterations = 9;
  color = '#ff6b09';
  color2 = '#ffad20';
  context: CanvasRenderingContext2D;

  @ViewChild('myCanvas') myCanvas;

  ngAfterViewInit() {
    const canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext('2d');
    this.draw();
  }

  drawTriangle(ctx, x, y, length, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();

    ctx.moveTo(x, y);
    ctx.lineTo(x + length, y);
    ctx.lineTo(x + length / 2, y - length * SierpinskiComponent.SQRT075);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.closePath();
  }

  interpolateColor(color1: string, color2: string, interpolation: number): string {
    if (isNaN(interpolation)) {
      interpolation = 0.5;
    }
    const i = interpolation;
    const j = 1 - i;
    const r = Math.floor((j * parseInt(color1.substr(1, 2), 16)
      + i * parseInt(color2.substr(1, 2), 16)));
    const g = Math.floor((j * parseInt(color1.substr(3, 2), 16)
      + i * parseInt(color2.substr(3, 2), 16)));
    const b = Math.floor((j * parseInt(color1.substr(5, 2), 16)
      + i * parseInt(color2.substr(5, 2), 16)));
    const color: string = '#'
      + this.pad(r.toString(16), 2)
      + this.pad(g.toString(16), 2)
      + this.pad(b.toString(16), 2);
    return color;
  }

  pad(num, size): string {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }

  recursion(ctx, x, y, length, i) {
    if (i < this.iterations) {
      this.recursion(ctx, x, y, length / 2, i + 1);
      this.recursion(ctx, x + length / 2, y, length / 2, i + 1);
      this.recursion(ctx, x + length / 4, y - length * SierpinskiComponent.SQRT075 / 2, length / 2, i + 1);
    }
    const interpolated = this.interpolateColor(this.color, this.color2, i / this.iterations);
    this.drawTriangle(ctx, x, y, length, interpolated);

  }

  draw() {
    const ctx = this.context;
    ctx.fillStyle = this.color;
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    const l = Math.min(ctx.canvas.clientWidth, ctx.canvas.clientWidth);
    this.recursion(ctx, 0, l * SierpinskiComponent.SQRT075, l, 0);
    ctx.closePath();
  }
}
