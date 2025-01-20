"use client";

export default function Map() {
  // const matrix = [
  //   [[0,0], [0,2]],
  //   [[1,1], [1,3]],
  // ];

  const X_START = 0;
  const Y_START = 0;

  const X_END = 50; //511;
  const Y_END = 50; //1023;

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

  const size = 40;
  const lineHeight = size * Math.sqrt(2);
  const overflow = (lineHeight - size) / 2;

  return (
    <div className="p-10">
      <div className="flex flex-col">
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
            className={`flex ${yIndex % 2 === 0 ? "" : ""}`}
          >
            {yLine.map((value) => (
              <div
                key={`${value[0]}:${value[1]}`}
                style={{ height: `${size}px`, width: `${size}px` }}
                className={` bg-gray-600 rotate-45`}
              >
                <div
                  style={{ height: `${size}px`, width: `${size}px` }}
                  className={`flex justify-center items-center -rotate-45`}
                >
                  {value[0]}:{value[1]}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
