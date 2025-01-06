import React, { useRef, useState, useEffect } from "react";
import "./white.css";
import styles from "./white.module.css";
import {
  FaCropSimple,
  FaFile,
  FaHouseChimney,
  FaPencil,
  FaRegFaceSmileWink,
  FaStar,
  FaTextWidth,
} from "react-icons/fa6";
import { BsSearchHeart } from "react-icons/bs";
import { FaMousePointer, FaRedo, FaUndo } from "react-icons/fa";
import { LuPaintBucket } from "react-icons/lu";
import { CiBookmarkPlus, CiSettings } from "react-icons/ci";
import { MdResetTv } from "react-icons/md";
const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  // const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
  }, []);

  // getContext;
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);

    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // setCursor({x,y});

    const ctx = canvas.getContext("2d");
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setDrawing(false);
  };
  const resetCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

  return (
    <div className={styles.bodys}>
      <div className={styles.sidebars}>
        <div className={styles.leftcontaser}>
          <FaMousePointer size={20} />
        </div>
        <div className={styles.leftcontaser}>
          <FaCropSimple size={20} />
        </div>
        <div className={styles.leftcontaser}>
          <FaPencil size={20} />
        </div>
        <div className={styles.leftcontaser}>
          <FaStar size={20} />
        </div>
        <div className={styles.leftcontaser}>
          <FaRegFaceSmileWink size={20} />
        </div>
        <div className={styles.leftcontaser}>
          <FaTextWidth size={20} />
        </div>
        <div className={styles.leftcontaser}>
          <LuPaintBucket size={20} />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className={styles.leftcontaser} onClick={downloadAsSVG}>
          <CiBookmarkPlus size={20} />
        </div>
        <div className={styles.leftcontaser}>
          <FaFile size={20} />
        </div>
        <div className={styles.leftcontaser} onClick={resetCanvas}>
          <MdResetTv size={20} />
        </div>
        <div className={styles.leftcontaser}>
          <CiSettings size={20} />
        </div>
      </div>
      <div className={styles.board}>
        <canvas
          ref={canvasRef}
          width={791}
          height={600}
          className={styles.boardborder}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
      <div className={styles.rightsidebars}>
        <div className={styles.rightscontaser}>
          <FaHouseChimney size={20} />
        </div>
        <div className={styles.rightscontaser}>
          <BsSearchHeart size={20} />
        </div>
        <div className={styles.rightscontaser}>
          <FaUndo size={20} />
        </div>
        <div className={styles.rightscontaser}>
          <FaRedo size={20} />
        </div>
      </div>
    </div>
  );
};

export default Whiteboard;
