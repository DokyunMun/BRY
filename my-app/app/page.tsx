


import Menu from "./menu"
import Right from "./right"
import ArtworksServer from "./artworkserver"
import About from "./about"





export default function page() {
    return(
        <div>
        <Menu></Menu>
        <Right></Right>
        <ArtworksServer></ArtworksServer>
        <About></About>
        </div>
    )
}