"use client";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";

export default function Detail({
  artwork: { artwork, prevArtwork, nextArtwork },
  onClose,
}) {
  const goBack = () => {
    onClose();
  };
  useEffect(() => {
    const blurs = document.querySelectorAll(".blur-mob");
    const mainblur = document.querySelector("#blur-mob-main");

    blurs.forEach((blur) => {
      blur.addEventListener("mouseover", () => {
        blurs.forEach((blur) => {
          blur.style.transition = "all 0.5s";
          blur.style.opacity = "1";
          blur.style.visibility = "visible";
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
        mainblur.style.opacity = "0";
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
          top: "3rem",
          left: "calc(-100vw + 4.5rem)",
        }}
      >
        {/* 제목영역 */}
        <div
          className="title_con"
          style={{
            position: "relative",
            display: "flex",
            height: "2rem",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.5rem 0 0.5rem 0",
          }}
        >
          {/* 이전 제목 */}
          <div
            id="title"
            style={{
              width: "calc(100vw - 3rem)",
              justifyContent: "center",
              color: "rgba(0, 0, 0, 0.2)",
            }}
          >
            <i>{prevArtwork.title},&nbsp;</i>
            <div>
              {prevArtwork.material},&nbsp;{prevArtwork.width} ×{" "}
              {prevArtwork.height} cm,&nbsp;{prevArtwork.year}
            </div>
          </div>
          {/* 현재 제목 */}
          <div
            id="title"
            style={{
              width: "calc(100vw - 3rem)",
              justifyContent: "center",
            }}
          >
            <i>{artwork.title},&nbsp;</i>
            <div>
              {artwork.material},&nbsp;{artwork.width} × {artwork.height}{" "}
              cm,&nbsp;{artwork.year}
            </div>
          </div>
          {/* 다음 제목 */}
          <div
            id="title"
            style={{
              width: "calc(100vw - 3rem)",
              justifyContent: "center",
              color: "rgba(0, 0, 0, 0.2)",
            }}
          >
            <i>{nextArtwork.title},&nbsp;</i>
            <div>
              {nextArtwork.material},&nbsp;{nextArtwork.width} ×{" "}
              {nextArtwork.height} cm,&nbsp;{nextArtwork.year}
            </div>
          </div>
        </div>
        <div
          className="image-con"
          style={{
            position: "relative",
            display: "flex",
            height: "calc(100svh - 6rem)",
            justifyContent: "center",
          }}
        >
          {/* 이전 이미지 */}
          <div
            style={{
              width: "calc(100vw - 3rem)",
              position: "relative",
            }}
          >
            <div
              className="blur-mob"
              style={{
                position: "absolute",
                width: "calc(100vw - 3rem)",
                height: "calc(100svh - 6rem)",
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
              src={`/${prevArtwork.filename}`}
              alt="1"
            />
          </div>
          {/* 현재이미지 */}
          <div
            style={{
              width: "calc(100vw - 3rem)",
              position: "relative",
            }}
          >
            <div
              className="blur-mob"
              id="blur-mob-main"
              style={{
                position: "absolute",
                width: "calc(100vw - 3rem)",
                height: "calc(100svh - 6rem)",
                zIndex: "10",
                backgroundColor: "rgb(255, 255, 255, 0.6)",
                backdropFilter: "blur(10px)",
                visibility: "hidden",
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
              alt="1"
            />
          </div>
          {/* 다음이미지 */}
          <div
            style={{
              width: "calc(100vw - 3rem)",
              position: "relative",
            }}
          >
            <div
              className="blur-mob"
              style={{
                position: "absolute",
                width: "calc(100vw - 3rem)",
                height: "calc(100svh - 6rem)",
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
              src={`/${nextArtwork.filename}`}
              alt="1"
            />
          </div>
        </div>
      </div>

      <div
        style={{
          height: "calc(100svh - 3rem)",
          position: "fixed",
          top: "3rem",
        }}
      >
        <div
          className="title_con"
          style={{
            position: "relative",
            display: "flex",
            height: "2rem",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.5rem",
          }}
        ></div>
      </div>

      <div
        style={{
          height: "calc(100svh - 3rem)",
          position: "fixed",
          top: "3rem",
          left: "calc( 100vw - 2rem )",
        }}
      >
        <div
          className="title_con"
          style={{
            position: "relative",
            display: "flex",
            height: "2rem",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.5rem",
          }}
        ></div>
      </div>
    </div>
  );
}

// id is the imageId
