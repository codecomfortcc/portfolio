import React, { CSSProperties, useMemo } from "react";
import "../app/globals.css";

/**
 * 5x7 bitmap font type:
 * keys are single characters, value is array of 7 strings each length 5 using '1'/'0'.
 */
type BitmapChar = [string, string, string, string, string, string, string];
type FontMap = Record<string, BitmapChar>;

/** Minimal 5x7 font for letters used in examples. Add characters as needed. */
const FONT_5x7: FontMap = {
  A: [
    "01110",
    "10001",
    "10001",
    "11111",
    "10001",
    "10001",
    "10001",
  ],
  B: [
    "11110",
    "10001",
    "10001",
    "11110",
    "10001",
    "10001",
    "11110",
  ],
  C: [
    "01110",
    "10001",
    "10000",
    "10000",
    "10000",
    "10001",
    "01110",
  ],
  D: [
    "11110",
    "10001",
    "10001",
    "10001",
    "10001",
    "10001",
    "11110",
  ],
  E: [
    "11111",
    "10000",
    "10000",
    "11110",
    "10000",
    "10000",
    "11111",
  ],
  G: [
    "01110",
    "10001",
    "10000",
    "10011",
    "10001",
    "10001",
    "01110",
  ],
  I: [
    "01110",
    "00100",
    "00100",
    "00100",
    "00100",
    "00100",
    "01110",
  ],
  L: [
    "10000",
    "10000",
    "10000",
    "10000",
    "10000",
    "10000",
    "11111",
  ],
  N: [
    "10001",
    "11001",
    "10101",
    "10011",
    "10001",
    "10001",
    "10001",
  ],
  O: [
    "01110",
    "10001",
    "10001",
    "10001",
    "10001",
    "10001",
    "01110",
  ],
  P: [
    "11110",
    "10001",
    "10001",
    "11110",
    "10000",
    "10000",
    "10000",
  ],
  R: [
    "11110",
    "10001",
    "10001",
    "11110",
    "10100",
    "10010",
    "10001",
  ],
  S: [
    "01111",
    "10000",
    "10000",
    "01110",
    "00001",
    "00001",
    "11110",
  ],
  T: [
    "11111",
    "00100",
    "00100",
    "00100",
    "00100",
    "00100",
    "00100",
  ],
  V: [
    "10001",
    "10001",
    "10001",
    "10001",
    "01010",
    "01010",
    "00100",
  ],
  Y: [
    "10001",
    "10001",
    "01010",
    "00100",
    "00100",
    "00100",
    "00100",
  ],
  ".": [
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
    "01100",
    "01100",
  ],
  " ": [
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
  ],
  // add more characters (numbers, punctuation) as needed
};

/** Props */
export interface PixelBoardProps {
  text?: string;
  cellSize?: number; // px
  gap?: number; // px between cells
  color?: string; // lit cell color
  bg?: string; // background color for board
  charGapCells?: number; // gap between characters expressed as number of off cells
  radius?: number; // border-radius for cells in px
  className?: string;
  style?: CSSProperties;
}

/** Helper: ensures uppercase and fallback to space if char missing */
const getCharMatrix = (font: FontMap, ch: string): BitmapChar => {
  const key = ch.toUpperCase();
  return font[key] ?? font[" "]!;
};

export const PixelBoard: React.FC<PixelBoardProps> = ({
  text = "LOADING...",
  cellSize = 18,
  gap = 4,
  color = "#d883ff",
  bg = "#0f0f0f",
  charGapCells = 2,
  radius = 6,
  className,
  style,
}) => {
  const chars = Array.from(text);

  const charWidth = 5;
  const charHeight = 7;

  const totalCols =
    chars.length * charWidth + Math.max(0, chars.length - 1) * charGapCells;

  /** Build rows -> flattened cells using useMemo for perf */
  const cells = useMemo(() => {
    const rows: { on: boolean; row: number; col: number }[] = [];
    for (let r = 0; r < charHeight; r++) {
      for (let c = 0; c < totalCols; c++) {
        rows.push({ on: false, row: r, col: c });
      }
    }

    let colOffset = 0;
    chars.forEach((ch, idx) => {
      const matrix = getCharMatrix(FONT_5x7, ch);
      for (let r = 0; r < charHeight; r++) {
        const rowStr = matrix[r];
        for (let c = 0; c < charWidth; c++) {
          const bit = rowStr[c] === "1";
          const index = r * totalCols + (colOffset + c);
          rows[index] = { on: bit, row: r, col: colOffset + c };
        }
      }
      colOffset += charWidth;
      if (idx < chars.length - 1) {
        colOffset += charGapCells;
      }
    });

    return rows;
  }, [chars, charGapCells, charHeight, charWidth, totalCols]);

  const rootStyle: CSSProperties = {
    ["--cell-size" as any]: `${cellSize}px`,
    ["--gap" as any]: `${gap}px`,
    ["--color" as any]: color,
    ["--bg" as any]: bg,
    ["--rows" as any]: String(charHeight),
    ["--cols" as any]: String(totalCols),
    ["--radius" as any]: `${radius}px`,
    ...style,
  };

  return (
    <div
      className={`pixelboard-root ${className ?? ""} inline-block self-center`}
      style={rootStyle}
      aria-hidden={false}
      role="img"
      aria-label={`Pixel board showing ${text}`}
    >
      <div
        className="pixelboard-grid"
        style={{
          gridTemplateColumns: `repeat(${totalCols}, var(--cell-size))`,
          gridTemplateRows: `repeat(${charHeight}, var(--cell-size))`,
          gap: "var(--gap)",
        }}
      >
        {cells.map((cell, i) => (
          <div
            key={i}
            className={`pixelboard-cell ${cell.on ? "on" : "off"}`}
            data-row={cell.row}
            data-col={cell.col}
            title={cell.on ? "lit" : ""}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
};

export default PixelBoard;
