"use client";
import { useEffect } from "react";
import Image from "next/image";

export default function Detail({
  artwork: { artwork, artworkwhole, order, index },
  onClose,
}) {
  order = order - 1;
  console.log(artworkwhole[order]);
  console.log(order);
  console.log(index);

  const blurright = () => {
    console.log("right");
  };
  const blurleft = () => {
    console.log("left");
  };

  const goBack = () => {
    onClose();
  };
  
  return (
    <div
    id="toggle"
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        top: "0",
        position: "fixed",
        height: "100svh",
        zIndex: "12",
        backgroundColor: "white",
        // overflowY: "scroll",
      }}
    >
      {/* 닫기버튼 */}
      <div
        id="closebtn"
        className="btn"
        onClick={goBack}
        style={{
          position: "fixed",
          top: "0",
        }}
      >
        {" "}
        Close{" "}
      </div>

      {/* 하단영역 */}
      <div
        id="main-body"
        style={{
          height: "calc(100svh - 3rem)",
          position: "absolute",
          top: "3.5rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <div id="blur_right" style={{width:"1.5rem", backgroundColor:"lightgrey", height:"calc(100svh - 5rem)", marginTop:"2.5rem"}} onClick={blurright()}>

        </div>
          <div
            className="slide-mob"
            style={{
              position: "relative",
              width: "calc(100vw - 3rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              className="title-mob"
              style={{
                width: "100%",
                height: "2rem",
                display: "flex",
                flexDirection: "column",
                color: "black",
                flexWrap: "nowrap",
                alingItems: "flex-start",
                marginBottom: "0.5rem",
                paddingLeft:"0.5rem",
                lineHeight:"1.1rem"
              }}
            >
              <i>{artworkwhole[index].title},&nbsp;</i>
              <div>
                {artworkwhole[index].material},&nbsp;
                {artworkwhole[index].width} × {artworkwhole[index].height} cm,&nbsp;
                {artworkwhole[index].year}
              </div>
            </div>
            {/* 블러 + 이미지 */}

            <Image
              style={{ marginBottom: "1rem" }}
              className="images-mob-detail"
              width={100}
              height={100}
              quality={100}
              layout="responsive"
              src={`/${artworkwhole[index].id}.jpg`}
              alt={`${artworkwhole[index].id}`}              
            />
          </div>
          <div id="blur_left" style={{width:"1.5rem", backgroundColor:"lightgrey", height:"calc(100svh - 5rem)", marginTop:"2.5rem"}} onClick={blurleft()}>

        </div>

        {/* 이전 영역 */}
      </div>
    </div>
  );
}

// id is the imageId
