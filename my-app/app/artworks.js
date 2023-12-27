'use client'


import Image from "next/image"
import { useEffect, useState } from 'react';
import Detail from "./detail";

export default function Artworks({artworks}){


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArtwork, setCurrentArtwork] = useState(null);

  const openModal = (artwork) => {
    setCurrentArtwork(artwork);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

    useEffect(() => {
        const blurs = document.querySelectorAll('.blur');
        const titles = document.querySelectorAll('.title');
        const about = document.getElementById('about_btn')


        
        document.querySelectorAll('.images').forEach((image) => {
            image.addEventListener('mouseover', () => {
                blurs.forEach((blur) => {
                    blur.style.transition = 'all 0.5s';

                    blur.style.opacity = '1';
                    blur.style.visibility = 'visible';
                titles.forEach((title) => {
                    title.style.color = 'white';
                })
                about.style.display = 'none';
                });
                image.parentElement.querySelector('.blur').style.opacity = '0';
                image.parentElement.querySelector('.blur').style.visibility = 'hidden';
                image.parentElement.querySelector('.title').style.color = 'black';
            });
            image.addEventListener('mouseout', () => {
                blurs.forEach((blur) => {
                    blur.style.opacity = '0';
                    blur.style.visibility = 'hidden';
                    blur.style.transition = 'all 0s';

                titles.forEach((title) => {
                    title.style.color = 'white';
                    })
                    about.style.display = 'flex';
                });
            });
        });




    }, []);

    return(
        <div>
        <div id="artworks">
            {artworks?.map((artwork) => (
                <div className="slide"
                id={artwork.filename}>
                    <div className="title">
                        <i>{artwork.title},&nbsp;</i>
                        <div>{artwork.material},&nbsp; </div>
                        <div>{artwork.width} × {artwork.height} cm,&nbsp; </div>
                        <div>{artwork.year}</div>
                    </div>
                    <div className="blur"></div>
                    <Image
                            id={artwork.order}
                            className="images"
                            src={`/${artwork.filename}`}
                            alt={artwork.title}
                            width={0}
                            height={0}
                            layout="responsive"
                            onClick={() => openModal(artwork)}
                            />
                </div>
            ))}
        </div>
        {isModalOpen && <Detail artwork={currentArtwork} onClose={closeModal} />}
        </div> )
}
