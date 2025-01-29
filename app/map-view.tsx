"use client";
import React, { useState, useRef } from "react";

export const MapView = () => {
  const X_START = 193;
  const Y_START = 511;

  const X_END = 242; //511;
  const Y_END = 560; //1023;

  // чз 217:511 - 242:536

  const mapMatrix: [number, number][][] = [];

  for (let y = Y_START; y <= Y_END; y++) {
    const yLine: [number, number][] = [];
    for (let x = X_START; x <= X_END; x++) {
      const isXEven = x % 2 === 0;
      const isYEven = y % 2 === 0;
      if (isXEven === isYEven) yLine.push([x, y]);
    }
    mapMatrix.push(yLine);
  }

  const dataMap = new Map();
  for (let ij = 0; ij <= 25; ij++) {
    for (let i = 0; i <= 25; i++) {
      dataMap.set(`${217 + i + ij}:${511 + i}`, { type: "wasteland" });
    }
  }

  dataMap.set(`${221}:${537}`, { type: "hill" });
  dataMap.set(`${222}:${536}`, { type: "hill" });
  dataMap.set(`${222}:${538}`, { type: "hill" });
  dataMap.set(`${223}:${537}`, { type: "hill" });

  dataMap.set(`${234}:${530}`, { type: "hill" });
  dataMap.set(`${235}:${531}`, { type: "hill" });

  dataMap.set(`${220}:${540}`, { type: "base", title: "Ветер62" });

  dataMap.set(`${218}:${536}`, { type: "fortress" });
  dataMap.set(`${220}:${534}`, { type: "trap" });
  dataMap.set(`${216}:${518}`, { type: "resource" });
  dataMap.set(`${218}:${516}`, { type: "storage" });
  dataMap.set(`${220}:${518}`, { type: "hospital" });

  dataMap.set(`${218}:${524}`, { type: "outpost" });
  dataMap.set(`${230}:${536}`, { type: "outpost" });
  dataMap.set(`${218}:${548}`, { type: "outpost" });
  dataMap.set(`${206}:${536}`, { type: "outpost" });

  const getBuildng = (x: number, y: number) => {
    const data = dataMap.get(`${x}:${y}`);
    const type = data?.type;

    if (type === "base") {
      return (
        <div
          className="absolute bottom-0 -rotate-45  rounded-sm  flex justify-center items-center"
          style={{
            height: `${size * 2 - gap}px`,
            width: `${size * 2 - gap}px`,
            marginBottom: `${(lineHeight - size) / 2}px`,
            background: "rgb(0 0 0 / 80%)",
          }}
        >
          <div className="rotate-45">{data.title}</div>
        </div>
      );
    }

    if (type === "fortress") {
      return (
        <div
          className="absolute bottom-0 -rotate-45  rounded-sm  flex justify-center items-center"
          style={{
            height: `${size * 2 - gap}px`,
            width: `${size * 2 - gap}px`,
            marginBottom: `${(lineHeight - size) / 2}px`,
            background: "rgb(79 49 115 / 80%)",
          }}
        >
          <div className="rotate-45">Крепость</div>
        </div>
      );
    }

    if (type === "trap") {
      return (
        <div
          className="absolute bottom-0 -rotate-45  rounded-sm  flex justify-center items-center"
          style={{
            height: `${size * 2 - gap}px`,
            width: `${size * 2 - gap}px`,
            marginBottom: `${(lineHeight - size) / 2}px`,
            background: "rgb(115 49 49 / 80%)",
          }}
        >
          <div className="rotate-45">Капкан</div>
        </div>
      );
    }

    if (type === "resource") {
      return (
        <div
          className="absolute bottom-0 -rotate-45  rounded-sm  flex justify-center items-center"
          style={{
            height: `${size * 2 - gap}px`,
            width: `${size * 2 - gap}px`,
            marginBottom: `${(lineHeight - size) / 2}px`,
            background: "rgb(115 49 49 / 80%)",
          }}
        >
          <div className="rotate-45">Ресурс</div>
        </div>
      );
    }

    if (type === "storage") {
      return (
        <div
          className="absolute bottom-0 -rotate-45  rounded-sm  flex justify-center items-center"
          style={{
            height: `${size * 2 - gap}px`,
            width: `${size * 2 - gap}px`,
            marginBottom: `${(lineHeight - size) / 2}px`,
            background: "rgb(115 49 49 / 80%)",
          }}
        >
          <div className="rotate-45">Хранилище</div>
        </div>
      );
    }

    if (type === "hospital") {
      return (
        <div
          className="absolute bottom-0 -rotate-45  rounded-sm  flex justify-center items-center"
          style={{
            height: `${size * 2 - gap}px`,
            width: `${size * 2 - gap}px`,
            marginBottom: `${(lineHeight - size) / 2}px`,
            background: "rgb(115 49 49 / 80%)",
          }}
        >
          <div className="rotate-45">Лазарет</div>
        </div>
      );
    }

    if (type === "outpost") {
      return (
        <div
          className="absolute bottom-0 -rotate-45  rounded-sm  flex justify-center items-center"
          style={{
            height: `${size - gap}px`,
            width: `${size - gap}px`,
            background: "rgb(79 49 115 / 80%)",
          }}
        >
          <div className="rotate-45">ФП</div>
        </div>
      );
    }

    return null;
  };

  const getColor = (x: number, y: number) => {
    const type = dataMap.get(`${x}:${y}`)?.type;

    if (type === "wasteland") return "#333";
    if (type === "hill") return "#5c5836";

    return "#3a5e3a";
  };

  const size = 40;
  const gap = 4;
  const lineHeight = size * Math.sqrt(2);
  const overflow = (lineHeight - size) / 2;

  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Текущее смещение
  const containerRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0 }); // Начальная позиция курсора

  const onStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    dragStartRef.current = { x: clientX, y: clientY }; // Запоминаем начальное положение
  };

  const onStartMouse = ({
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) => onStart(clientX, clientY);

  const onTouchStart = ({ touches }: React.TouchEvent<HTMLDivElement>) =>
    onStart(touches[0].clientX, touches[0].clientY);

  const onMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;

    // Пересчитываем смещение
    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;

    setOffset((prevOffset) => ({
      x: prevOffset.x + deltaX,
      y: prevOffset.y + deltaY,
    }));

    dragStartRef.current = { x: clientX, y: clientY };
  };

  const onMoveMouse = ({
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) => onMove(clientX, clientY);

  const onTouchMove = ({ touches }: React.TouchEvent<HTMLDivElement>) =>
    onMove(touches[0].clientX, touches[0].clientY);

  // Завершение перетаскивания
  const onEnd = () => setIsDragging(false);
  const onLeave = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      className="select-none relative overflow-hidden h-screen w-screen"
      // Обработчики для мыши
      onMouseMove={onMoveMouse}
      onMouseUp={onEnd}
      onMouseLeave={onLeave}
      // Обработчики для тач-экранов
      onTouchMove={onTouchMove}
      onTouchEnd={onEnd}
      onTouchStart={onTouchStart}
    >
      <div
        className="size-full absolute"
        // Обработчик для начала перетаскивания (для мыши и тач-экранов)
        onMouseDown={onStartMouse}
        onTouchStart={onTouchStart}
        style={{
          cursor: isDragging ? "grab" : "default",
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease-out",
        }}
      >
        <div className="flex flex-col shrink-0">
          {mapMatrix.map((yLine, yIndex) => (
            <div
              key={yIndex}
              style={{
                height: `${lineHeight}px`,
                paddingTop: `${(lineHeight - size) / 2}px`,
                paddingLeft: `${(lineHeight - size) / 2}px`,
                gap: `${overflow * 2}px`,
                marginLeft: yIndex % 2 === 0 ? 0 : lineHeight / 2,
                marginTop: yIndex % 2 === 0 ? 0 : -(lineHeight / 2),
                marginBottom: yIndex % 2 === 0 ? 0 : -(lineHeight / 2),
              }}
              className="flex shrink-0"
            >
              {yLine.map(([x, y]) => (
                <div
                  key={`${x}:${y}`}
                  style={{ height: `${size}px`, width: `${size}px` }}
                  className="rotate-45 flex justify-center items-center shrink-0 relative"
                >
                  <div
                    style={{ background: getColor(x, y) }}
                    className="rounded-sm"
                  >
                    <div
                      style={{
                        height: `${size - gap}px`,
                        width: `${size - gap}px`,
                      }}
                      className="flex flex-col shrink-0 justify-center items-center -rotate-45 text-xs "
                    >
                      <div className="text-gray-400">{x}</div>
                      <div className="text-gray-400/60">{y}</div>
                      {getBuildng(x, y)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
