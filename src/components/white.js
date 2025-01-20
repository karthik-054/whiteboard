import React, { useRef, useState, useEffect } from "react";
import "./white.css";
import styles from "./white.module.css";
import confetti from "canvas-confetti";
import { FaRegFaceSmileWink, FaTextWidth } from "react-icons/fa6";
import { FaMousePointer, FaRedo, FaUndo } from "react-icons/fa";
import { LuPaintBucket } from "react-icons/lu";
import { CiBookmarkPlus } from "react-icons/ci";
import { MdResetTv } from "react-icons/md";
import { TiZoomIn, TiZoomOut } from "react-icons/ti";
import Model from "./modal";

const colorSuggestions = [
  '#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD', '#E74C3C', '#2ECC71', '#1F77B4', '#F39C12'
];

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [color, setColor] = useState("#000000");
  const [circleColor, setCircleColor] = useState("green"); // Default color
  const [showColors, setShowColors] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  


  const close = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;

    if (ctx) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
    } else {
      console.error("Canvas context is not available");
    }
  }, [color]);

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas ? canvas.getContext("2d") : null;
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);

      setDrawing(true);
      setCurrentPath([{ x, y }]);
    }
  };

  const draw = (e) => {
    if (!drawing) return;

    const newPoint = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    setCurrentPath((prevPath) => [...prevPath, newPoint]);

    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;
    if (ctx) {
      ctx.lineTo(newPoint.x, newPoint.y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (drawing) {
      setDrawing(false);
      setUndoStack((prevStack) => [...prevStack, currentPath]);
      setRedoStack([]);
    }
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      undoStack.forEach((path) => {
        ctx.beginPath();
        path.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
      });
    }
  };

  const undo = () => {
    if (undoStack.length === 0) return;
    const lastPath = undoStack[undoStack.length - 1];
    setRedoStack((prevStack) => [lastPath, ...prevStack]);
    setUndoStack((prevStack) => prevStack.slice(0, -1));
    resetCanvas();
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const redoPath = redoStack[0];
    setUndoStack((prevStack) => [...prevStack, redoPath]);
    setRedoStack((prevStack) => prevStack.slice(1));
    resetCanvas();
  };

  
  const toggleColorOptions = () => {
    setShowColors(prevState => !prevState);
  };

  // Function to set selected color
  // const handleColorSelect = (color) => {
  //   setCircleColor(color);
  //   setShowColors(false); // Hide color options after selection
  // };

  const handleDragStart = (e, color) => {
    e.dataTransfer.setData('color', color);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const color = e.dataTransfer.getData('color');
    setCircleColor(color);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const downloadAsSVG = () => {
    const canvas = canvasRef.current;
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${
      canvas.height
    }">
        <image href="${canvas.toDataURL()}" x="0" y="0" />
      </svg>
    `;
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "whiteboard.svg";
    link.click();
  };

  const Colors = (e) => {
    setColor(e.target.value);
  };

  const confettiBtn = () => {
    confetti({
      particleCount: 30,
      spread: 100,
    });
  };

  return (
    <>
      <div className={styles.bodys}>
        <div className={styles.sidebars}>
          <div className={styles.leftcontaser}>
            <FaMousePointer size={20} className={styles.icons} />
          </div>
          <div className={styles.leftcontaser} onClick={Colors}>
            <input
              type="color"
              id="color"
              name="color"
              value={color}
              onChange={Colors}
              className={styles.colors}
            />
          </div>
          <div className={styles.leftcontaser} onClick={confettiBtn}>
            <FaRegFaceSmileWink size={20} className={styles.icons} />
          </div>
          <div className={styles.leftcontaser}>
            <FaTextWidth size={20} className={styles.icons} />
          </div>
          <div className={styles.leftcontaser}onClick={toggleColorOptions}>
          <div 
        styles={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          backgroundColor: circleColor,
          margin: '20px auto',
          border: '2px solid #333'}} onDrop={handleDrop}
          onDragOver={handleDragOver}></div>
          <LuPaintBucket size={20} className={styles.icons} />
           
           

          {showColors && (
        <div style={{ marginTop: '20px' }}>
          {colorSuggestions.map((color, index) => (
            <button
              key={index}
              draggable="true"
              style={{
                backgroundColor: color,
                border: 'none',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                marginLeft: '100px',
                cursor: 'pointer',
                zIndex:'50',
              }}
              onDragStart={(e) => handleDragStart(e, color)}
            />
          ))}
        </div>
         )}
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <div className={styles.leftcontaser} onClick={resetCanvas}>
            <MdResetTv size={20} className={styles.icons} />
          </div>
          <div className={styles.leftcontaser} onClick={downloadAsSVG}>
            <CiBookmarkPlus size={20} className={styles.icons} />
          </div>
        </div>

        <div className={styles.board}>
          <canvas
            ref={canvasRef}
            width={790}
            height={600}
            className={styles.boardborder}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
          />
        </div>

        <div className={styles.rightsidebars}>
          <div className={styles.rightscontaser} onClick={handleZoomIn}>
            <TiZoomIn size={20} className={styles.icons} />
          </div>
          <div className={styles.rightscontaser} onClick={handleZoomOut}>
            <TiZoomOut size={20} className={styles.icons} />
          </div>
          <div
            className={styles.rightscontaser}
            onClick={undo}
            disabled={undoStack.length === 0}
          >
            <FaUndo size={20} className={styles.icons} />
          </div>
          <div
            className={styles.rightscontaser}
            onClick={redo}
            disabled={redoStack.length === 0}
          >
            <FaRedo size={20} className={styles.icons} />
          </div>
        </div>
      </div>
      {isVisible && <Model close={close} />}
    </>
  );
};

export default Whiteboard;
