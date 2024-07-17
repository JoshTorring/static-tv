import React, { useRef, useEffect} from 'react'
import './StaticCanvas.css';

const StaticCanvas: React.FC = () => {

    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current! as HTMLCanvasElement
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

        const resize = () => {
            canvas.width = window.innerWidth / 3.2;
            canvas.height = window.innerHeight / 1.8;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
        };

        const noise = (ctx: CanvasRenderingContext2D) => {

            const w = canvas.width
            const h = canvas.height
            const imageData = ctx.createImageData(w, h) //creates an image data object of width w and height h
            const buffer32 = new Uint32Array(imageData.data.buffer)
            const len = buffer32.length

            for (let i = 0; i < len; i++) {
                // Generate an 8-bit random number for the alpha channel
                const randomAlpha = ((Math.floor(Math.random() * 4)/3) * 0xFF) | 0;
                // Combine it with alpha channel (255 or 0xFF in hexadecimal)
                buffer32[i] = 0x00FFFFFF | (randomAlpha << 24);
            }

            ctx.putImageData(imageData, 0, 0)
        }

        function generateNoise() {
            noise(ctx)
            requestAnimationFrame(generateNoise)
        }
        
        resize()
        window.addEventListener('resize', resize)
        generateNoise()

        return () => {
            window.removeEventListener('resize', resize);
        };
  
    }, [])





    return (
        <canvas ref={canvasRef} className="noise-canvas"/>
    )
}

export default StaticCanvas