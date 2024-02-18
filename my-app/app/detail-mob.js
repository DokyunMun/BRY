"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Detail from "./detail";
import UrlImageFetcher from "./urlimagefetcher";

export default function Detailmob({
  artwork: { artwork, artworkwhole, order, index: initialIndex },
  onClose,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArtwork, setCurrentArtwork] = useState(null);
  const [index, setIndex] = useState(initialIndex); // index를 state로 관리
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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
      index,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const title = document.querySelectorAll(".title-mob");
    title.forEach((title, i) => {
      if (i != index) {
        title.style.filter = "blur(3px)";
        title.style.opacity = "0";
        title.style.transition = "all 0.5s";
      } else {
        title.style.filter = "none";
        title.style.opacity = "1";
        title.style.transition = "all 0.5s";
      }
    });
  }, []);

  const blurright = () => {
    const mainBody = document.getElementById("main-body");
    const title = document.querySelectorAll(".title-mob");

    if (index != 0) {
      const newIndex = index - 1; // 새로운 index 값
      setIndex(newIndex); // index 업데이트 // index 업데이트
      if (mainBody)
        mainBody.style.left = `calc((-100vw + 1.6rem) * ${index} + 0.8rem)`;
      title.forEach((title, i) => {
        if (i != newIndex) {
          title.style.filter = "blur(3px)";
          title.style.opacity = "0";
          title.style.transition = "all 0.5s";
        } else {
          title.style.filter = "none";
          title.style.opacity = "1";
          title.style.transition = "all 0.5s";
        }
      });
    }
  };
  const blurleft = () => {
    const mainBody = document.getElementById("main-body");
    const title = document.querySelectorAll(".title-mob");
    if (index != artworkwhole.length - 1) {
      const newIndex = index + 1; // 새로운 index 값
      setIndex(newIndex); // index 업데이트 // index 업데이트
      if (mainBody)
        mainBody.style.left = `calc((-100vw + 1.6rem) * ${index} + 0.8rem)`;
      title.forEach((title, i) => {
        if (i != newIndex) {
          title.style.filter = "blur(3px)";
          title.style.opacity = "0";
          title.style.transition = "all 0.5s";
        } else {
          title.style.filter = "none";
          title.style.opacity = "1";
          title.style.transition = "all 0.5s";
        }
      });
    }
  };

  return (
    <div>
      <div id="toggle">
        {/* 닫기버튼 */}
        <div
          id="closebtn"
          className="btn"
          onClick={goBack}
          style={{
            position: "fixed",
            top: "0rem",
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
            top: "3.6rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            left: `calc((-100vw + 1.6rem) * ${index} + 0.8rem)`,
          }}
        >
          <div
            id="blur-right"
            onClick={blurright}
            className="blur-mob"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              position: "fixed",
              zIndex: "40",
              width: "0.8rem",
              height: "calc(100svh - 5rem)",
              top: "6.1rem",
              left: "0",
              cursor: "pointer",
            }}
          ></div>
          <div
            id="blur-left"
            onClick={blurleft}
            className="blur-mob"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              position: "fixed",
              zIndex: "40",
              width: "0.8rem",
              height: "calc(100svh - 5rem)",
              top: "6.1rem",
              right: "0",
              cursor: "pointer",
            }}
          ></div>
          {artworkwhole?.map((artwork, i) => {
            const regex = /[가-힣]/g;
            const isPriority =
              i === index || i === index - 1 || i === index + 1;

            const titleElement = artwork.title.match(regex) ? (
              <div>{artwork.title},&nbsp;</div>
            ) : (
              <i>{artwork.title},&nbsp; </i>
            );
            return (
              <div
                className="slide-mob"
                style={{
                  position: "relative",
                  width: "calc(100vw - 1.6rem)",
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
                    paddingLeft: "0.2rem",
                    lineHeight: "1.1rem",
                  }}
                >
                  {titleElement}
                  <div>
                    {artwork.material},&nbsp;
                    {artwork.height} × {artwork.width} cm,&nbsp;
                    {artwork.year}
                  </div>
                </div>
                {/* 블러 + 이미지 */}
                <UrlImageFetcher
                  artworkId={artwork.filename}
                  alt={`${artwork.id}`}
                  className="images-mob-detail"
                  style={{ marginBottom: "1rem", cursor: "pointer" }}
                  onClick={() => openModal(artwork, index)}
                  onTouchStart={(e) => {
                    setTouchStart(e.touches[0].clientX);
                  }}
                  onTouchMove={(e) => {
                    setTouchEnd(e.touches[0].clientX);
                  }}
                  onTouchEnd={() => {
                    if (touchStart - touchEnd > 150) {
                      blurleft();
                    } else if (touchStart - touchEnd < -150) {
                      blurright();
                    }
                  }}
                />
                {/* <Image
                  style={{ marginBottom: "1rem", cursor: "pointer" }}
                  className="images-mob-detail"
                  width={100}
                  height={100}
                  quality={100}
                  layout="responsive"
                  src={`/${artwork.id}.jpg`}
                  alt={`${artwork.id}`}
                  onClick={() => openModal(artwork, index)}
                  priority={isPriority}
                  onTouchStart={(e) => {
                    setTouchStart(e.touches[0].clientX);
                  }}
                  onTouchMove={(e) => {
                    setTouchEnd(e.touches[0].clientX);
                  }}
                  onTouchEnd={() => {
                    if (touchStart - touchEnd > 150) {
                      // the swipe is more than 150px to the left
                      blurleft();
                    } else if (touchStart - touchEnd < -150) {
                      // the swipe is more than 150px to the right
                      blurright();
                    }
                  }}
                /> */}
              </div>
            );
          })}{" "}
          {/* 이전 영역 */}
        </div>
      </div>
      {isModalOpen && <Detail artwork={currentArtwork} onClose={closeModal} />}
    </div>
  );
}

// id is the imageId
