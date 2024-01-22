"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Detail from "./detail-mob";

export default function Artworks({ artworks }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArtwork, setCurrentArtwork] = useState(null);

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
    const blurs = document.querySelectorAll(".blur");
    const titles = document.querySelectorAll(".title");
    const about = document.getElementById("about_btn");
    const yearscon = document.getElementById("years-con");

    blurs.forEach((blur) => {
      blur.style.visibility = "hidden";
    });
    yearscon.style.display = "flex";
    about.style.display = "flex";

    document.querySelectorAll(".images").forEach((image) => {
      image.addEventListener("mouseover", () => {
        blurs.forEach((blur) => {
          blur.style.transition = "all 0.5s";
          blur.style.opacity = "1";
          blur.style.visibility = "visible";
          titles.forEach((title) => {
            title.style.visibility = "hidden";
          });
        });
        image.parentElement.querySelector(".blur").style.opacity = "0";
        image.parentElement.querySelector(".blur").style.visibility = "hidden";
        image.parentElement.querySelector(".title").style.visibility =
          "visible";
        about.style.display = "none";
        yearscon.style.display = "none";

        console.log("hover");
      });
      image.addEventListener("mouseout", () => {
        blurs.forEach((blur) => {
          blur.style.opacity = "0";
          blur.style.visibility = "hidden";
          blur.style.transition = "all 0s";

          titles.forEach((title) => {
            title.style.visibility = "hidden";
          });
          const about_container = document.getElementById("about_con");
          if (about_container.style.display == "flex") {
            about.style.display = "none";
          } else {
            about.style.display = "flex";
            yearscon.style.display = "flex";
          }
          const yearmenus = document.querySelectorAll(".yearbtn");

          yearmenus.forEach((menu) => {
            menu.style.display = "none";
          });
        });
      });
    });
  }, [artworks]);

  return (
    <div>
      <div id="artworks">
        {artworks?.map((artwork, index) => (
          <div className="slide" id={artwork.filename}>
            <div className="title">
              <i>{artwork.title},&nbsp;</i>
              <div>{artwork.material},&nbsp; </div>
              <div>
                {artwork.width} × {artwork.height} cm,&nbsp;{" "}
              </div>
              <div>{artwork.year}</div>
            </div>
            <div className="blur"></div>
            <Image
              id={artwork.order}
              className="images"
              src={`/${artwork.id}.jpg`}
              alt={artwork.title}
              width={0}
              height={0}
              layout="responsive"
              onClick={() => openModal(artwork, index)}
            />
          </div>
        ))}
      </div>
      <div id="artworks-mob">
        <div id="A-side-mob" style={{ width: "calc( 49.5vw - 1.5rem )" }}>
          {artworks?.map(
            (artwork, index) =>
              index % 2 === 0 && (
                <div
                  className="slide-A-mob"
                  style={{ paddingBottom: "0.5vw" }}
                  id={artwork.filename}
                >
                  <Image
                    id={artwork.order}
                    className="images-mob"
                    src={`/${artwork.id}.jpg`}
                    alt={artwork.title}
                    width={0}
                    height={0}
                    layout="responsive"
                    onClick={() => openModal(artwork, index)}
                  />
                </div>
              ),
          )}
          <div style={{ height: "auto", backgroundColor: "red" }}></div>
        </div>
        <div
          id="B-side-mob"
          style={{ width: "calc( 49.5vw - 1.5rem )", marginLeft: "1vw" }}
        >
          {artworks?.map(
            (artwork, index) =>
              index % 2 === 1 && (
                <div
                  className="slide-B-mob"
                  id={artwork.filename}
                  style={{ paddingBottom: "0.5vw" }}
                >
                  <Image
                    id={artwork.order}
                    className="images-mob"
                    src={`/${artwork.id}.jpg`}
                    alt={artwork.title}
                    width={0}
                    height={0}
                    layout="responsive"
                    onClick={() => openModal(artwork, index)}
                  />
                </div>
              ),
          )}
          <div style={{ height: "auto", backgroundColor: "red" }}></div>
        </div>
        <div
          style={{
            width: "100vw",
            position: "relative",
            height: "1rem",
            display: "flex",
            justifyContent: "end",
          }}
        ></div>
      </div>
      {isModalOpen && <Detail artwork={currentArtwork} onClose={closeModal} />}
    </div>
  );
}
