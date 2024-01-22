'use client'

import Menu from "./menu"
import Right from "./right"
import About from "./about"
import Yearbtn  from "./year-btn"

// import ArtworksServermob from "./artworkserver-mob"
// import Artworks from "./artworks"
// import ArtworkAndYear from "./awandyear"




export default function page() {
    return(
        <div>
        <Menu></Menu>
        <About></About>
        <Yearbtn></Yearbtn>
        <Right></Right>


        {/* <Artworks></Artworks> */}
        {/* <ArtworkAndYear></ArtworkAndYear> */}
        {/* <ArtworksServermob></ArtworksServermob> */}

        </div>
    )
}