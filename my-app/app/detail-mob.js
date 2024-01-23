"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Detail from "./detail";

export default function Detailmob({
  artwork: { artwork, artworkwhole, order, index },
  onClose,
}) {



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArtwork, setCurrentArtwork] = useState(null);

  const goBack = () => {
    onClose();
  };

  const openModal = (artwork, index) => {
    const order = artwork.order;
    const artworkwhole = artworks;


    setCurrentArtwork({
      artwork,
      order,
      artworkwhole,
      index
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const title = document.querySelectorAll('.title-mob');
    title.forEach((title, i) => {
    if (i != index) {
      title.style.filter = "blur(3px)";
      title.style.opacity = "0";
      title.style.transition = "all 0.5s"
    } else {
      title.style.filter = "none";
      title.style.opacity = "1";
      title.style.transition = "all 0.5s"
    }
  });
},[]);

  
  const blurright = () => {
    const mainBody = document.getElementById('main-body');
    const title = document.querySelectorAll('.title-mob');

    if (index != 0){    
      index = index - 1
      if (mainBody) mainBody.style.left = `calc((-100vw + 3rem) * ${index} + 1.5rem)`;
      title.forEach((title, i) => {
        if (i != index) {
          title.style.filter = "blur(3px)";
          title.style.opacity = "0";
          title.style.transition = "all 0.5s"
        } else {
          title.style.filter = "none";
          title.style.opacity = "1";
          title.style.transition = "all 0.5s"
        }
      });
      
    }
  }
  const blurleft = () => {
    console.log("????")
    console.log(index);
    console.log(artworkwhole.length);
    const mainBody = document.getElementById('main-body');
    const title = document.querySelectorAll('.title-mob');
    if (index != artworkwhole.length - 1) {
      index = index + 1
      if (mainBody) mainBody.style.left = `calc((-100vw + 3rem) * ${index} + 1.5rem)`;
      title.forEach((title, i) => {
        if (i != index) {
          title.style.filter = "blur(3px)";
          title.style.opacity = "0";
          title.style.transition = "all 0.5s"
        } else {
          title.style.filter = "none";
          title.style.opacity = "1";
          title.style.transition = "all 0.5s"
        }
      });
    }
  }

  return (
    <div>
    <div
    id="toggle"
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
          left: `calc((-100vw + 3rem) * ${index} + 1.5rem)`,
        }}
      >
        <div id='blur-right' onClick={blurright} className="blur-mob" style={{backgroundColor:"rgba(255, 255, 255, 0.5)", position:"fixed",zIndex:"40", width:"1.5rem", height:"calc(100svh - 6rem)", top:"6rem", left:"0", cursor:"pointer"}}></div>
        <div id='blur-left' onClick={blurleft} className="blur-mob" style={{backgroundColor:"rgba(255, 255, 255, 0.5)", position:"fixed",zIndex:"40", width:"1.5rem", height:"calc(100svh - 6rem)", top:"6rem", right:"0", cursor:"pointer"}}></div>
        {artworkwhole?.map((artwork) => {
          const regex = /[가-힣]/g; 
          const titleElement = artwork.title.match(regex) ? (
            <div>{artwork.title},&nbsp;</div>
          ) : (
            <i>{artwork.title},&nbsp; </i>
          );
          return(
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
              {titleElement}
              <div>
                {artwork.material},&nbsp;
                {artwork.width} × {artwork.height} cm,&nbsp;
                {artwork.year}
              </div>
            </div>
            {/* 블러 + 이미지 */}

            <Image
              style={{ marginBottom: "1rem", cursor:"pointer" }}
              className="images-mob-detail"
              width={100}
              height={100}
              quality={100}
              layout="responsive"
              src={`/${artwork.id}.jpg`}
              alt={`${artwork.id}`}    
              onClick={() => openModal(artwork, index)}
            />
          </div>
        )})}{" "}
        {/* 이전 영역 */}
      </div>
    </div>
    {isModalOpen && <Detail artwork={currentArtwork} onClose={closeModal} />}

    </div>
  );
}

// id is the imageId
