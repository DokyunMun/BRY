
import Menu from "./menu"
import Right from "./right"
import ArtworksServer from "./artworkserver"
import About from "./about"
import ArtworksServermob from "./artworkserver-mob"
import YearServer from "./yearserver"





export default function page() {
    return(
        <div>
        <YearServer></YearServer>
        <Menu></Menu>
        <Right></Right>
        <ArtworksServer></ArtworksServer>
        <ArtworksServermob></ArtworksServermob>
        <About></About>
        </div>
    )
}