"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Detail from "./detail-mob";

export default function Artworks({ artworks }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArtwork, setCurrentArtwork] = useState(null);

  const openModal = (artwork) => {
    const order = artwork.order;
    const artworkwhole = artworks;

    setCurrentArtwork({
      artwork,
      order,
      artworkwhole,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
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
                    onClick={() => openModal(artwork)}
                  />
                </div>
              ),
          )}
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
                    onClick={() => openModal(artwork)}
                  />
                </div>
              ),
          )}
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
