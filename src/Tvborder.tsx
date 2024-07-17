import React, { useRef, useEffect} from 'react'
import './TvBorder.css';

const TvBorder: React.FC = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current! as HTMLCanvasElement
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

        const resize = () => {
            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

             // Draw the background
            ctx.fillStyle = 'rgba(20, 10, 0, 1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
    
             // Draw the squircle shape
            // drawSquircle(ctx, 150, 150, 100, 50);
            // ctx.fillStyle = 'blue';
            // ctx.fill();
        };

        const drawSquircle = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, cutting: boolean, strokeWidth: number, style: number) => {
            const radius = 30; // Adjust this for more or less rounded corners
            ctx.lineWidth = 0
            ctx.beginPath();
            ctx.moveTo(x - width / 2, y - height / 2);
            ctx.quadraticCurveTo(width / 2, y - height / 2 - radius, x + width / 2, y - height / 2);
            ctx.quadraticCurveTo(x + width / 2 + radius, height / 2, x + width / 2, y + height / 2);
            ctx.quadraticCurveTo(width / 2, y + height / 2 + radius, x - width / 2, y + height / 2);
            ctx.quadraticCurveTo(x - width / 2 - radius, height / 2, x - width / 2, y - height / 2);
            ctx.closePath();
            if (!cutting) {
                const grad = ctx.createLinearGradient(0,0, 280,0);
                if (style === 1) {
                    grad.addColorStop(0, "rgba(140, 128, 90, 1)");
                    grad.addColorStop(1, "rgba(190, 158, 120, 1)");
                } else if (style === 2) {
                    grad.addColorStop(0, "rgba(75, 50, 40, 1)");
                    grad.addColorStop(1, "rgba(110, 80, 60, 1)");
                }

                ctx.lineWidth = strokeWidth
                ctx.strokeStyle = grad
                ctx.stroke()
            }
        };

  
        const cutHole = () => {
            // Set composite operation to 'destination-out' to cut the hole
            ctx.globalCompositeOperation = 'destination-out';
      
            // Draw the squircle shape to cut it out
            drawSquircle(ctx, innerWidth / 2, innerHeight / 2, innerWidth - (innerWidth * 0.15), innerHeight - (innerHeight * 0.15), true, 0, 1);
            ctx.fill();
      
            // Reset composite operation to default
            ctx.globalCompositeOperation = 'source-over';
        };
    
        // Initial resize and setup
        resize();
        cutHole();
        drawSquircle(ctx, innerWidth / 2, innerHeight / 2, innerWidth - (innerWidth * 0.15), innerHeight - (innerHeight * 0.15), false, 6, 1);
        drawSquircle(ctx, innerWidth / 2, innerHeight / 2, innerWidth - (innerWidth * 0.13), innerHeight - (innerHeight * 0.135), false, 15, 2);

        
        window.addEventListener('resize',() => {
            resize()
            cutHole()
        })


        return () => {
            window.removeEventListener('resize', () => {
                resize()
                cutHole()
            });
        };
  
    }, [])





    return (
        <canvas ref={canvasRef} className="tv-border"/>
    )
}

export default TvBorder