"use client";

import "./layout.css"
import { useState } from "react";

function HomeLayout({children}: Readonly<{children: React.ReactNode;}>)
{
  const [width, setWidth] = useState(10);
  const [isMouseDown, setIsMouseDown] = useState(false);
  // const [mousePosition, setMousePosition] = useState({x:100,y:100});
  const handleMouseDown = ()=>{
    setIsMouseDown(true);
    console.log("PUSH");
  }
  const handleMouseUp = ()=>{
    setIsMouseDown(false);
    // console.log(mousePosition);
  }

  // const handleMouseMove: MouseMoveHandler = (e) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isMouseDown) return;
    // setMousePosition({
    //   x: e.clientX,
    //   y: e.clientY,
    // });
    const innerWidth = window.innerWidth;
    const clientX = e.clientX;
    console.log(innerWidth, clientX);
    const result = Math.ceil(clientX * 100 / innerWidth);
    setWidth(result);
  };

  return (
    <div className="container" onMouseMove={handleMouseMove}>
      <div
        className="left" 
        style={{'width': width + '%'}}
      >
      </div>
      <div
        className="sider"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        
      ></div>
      <div
        className="right"
      >
        <button onClick={()=>{
          if(width < 100){
            setWidth(width+10);
          };
        }}>按钮
        </button>
      </div>
      {/* {children} */}
    </div>
  );
}


export default HomeLayout;