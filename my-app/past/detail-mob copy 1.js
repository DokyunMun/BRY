"use client";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";

export default function Detail({
  artwork: { artwork, artworkwhole, order },
  onClose,
}) {
  order = order - 1;

  console.log(order);
  console.log(artworkwhole[order]);

  const goBack = () => {
    onClose();
  };
  useEffect(() => {
    const blurs = document.querySelectorAll(".blur-mob");

    blurs.forEach((blur) => {
      blur.addEventListener("mouseover", () => {
        blurs.forEach((blur) => {
          blur.style.transition = "all 0.5s";
          blur.style.opacity = "1";
          blur.style.visibility = "visible";
          blur.parentElement.querySelector(".title-mob").style.color = "black";
        });
        blur.parentElement.querySelector(".blur-mob").style.opacity = "0";
        blur.parentElement.querySelector(".blur-mob").style.visibility =
          "hidden";
      });
      blur.addEventListener("mouseout", () => {
        blurs.forEach((blur) => {
          blur.style.opacity = "1";
          blur.style.visibility = "visible";
          blur.style.transition = "all 0s";
        });
      });
    });
  }, []);
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        top: "0",
        position: "fixed",
        height: "100svh",
        zIndex: "10",
        backgroundColor: "white",
      }}
    >
      {/* 닫기버튼 */}
      <div
        className="btn"
        onClick={goBack}
        style={{
          position: "fixed",
          top: "0",
          right: "0",
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
          position: "fixed",
          top: "3.5rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        {artworkwhole?.map(
          (artwork, index) =>
            index >= order - 1 &&
            index <= order + 1 && (
              <div
                className="slide-mob"
                style={{
                  position: "relative",
                  width: "calc(100vw - 3rem)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  left: "calc(-100vw + 4.5rem)",
                }}
              >
                <div
                  className="title-mob"
                  style={{
                    width: "100%",
                    height: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    color: "rgba(0, 0, 0, 0.2)",
                    flexWrap: "nowrap",
                    alingItems: "flex-start",
                    marginBottom: "0.5rem",
                  }}
                >
                  <i>{artwork.title},&nbsp;</i>
                  <div>
                    {artwork.material},&nbsp;
                    {artwork.width} × {artwork.height} cm,&nbsp;
                    {artwork.year}
                  </div>
                </div>
                {/* 블러 + 이미지 */}
                <div
                  className="blur-mob"
                  style={{
                    position: "absolute",
                    top: "2.5rem",
                    width: "calc(100vw - 3rem)",
                    height: "100%",
                    zIndex: "10",
                    backgroundColor: "rgb(255, 255, 255, 0.6)",
                    backdropFilter: "blur(10px)",
                  }}
                ></div>
                <Image
                  style={{ marginBottom: "1rem" }}
                  className="images-mob-detail"
                  width={100}
                  height={100}
                  quality={100}
                  layout="responsive"
                  src={`/${artwork.filename}`}
                  alt={`/${artwork.filename}`}
                />
              </div>
            ),
        )}{" "}
        {/* 이전 영역 */}
      </div>
    </div>
  );
}

// id is the imageId
