import React from 'react';

interface Iprop {
    a: number;
    b: number;
}
interface ICanvasRenderingContext2D {
    textBaseline: string;
    textAlign: string;
}
const TestModule = (object: Iprop): JSX.Element => {
    const { a, b } = object;
    const canvas = document.getElementById('canvasId') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    console.log(ctx);
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();

    // const arrayNumber = [1, 2, 3, 4, 5];

    // const x = 3;
    // const y = 4;
    // arrayNumber.splice(x - 1, 1, ...arrayNumber.splice(y - 1, 1, arrayNumber[x - 1]));
    return <p className="computed-one">{`Hi, I'm computed one, my sum is ${b}.`}</p>;
};

export default TestModule;
