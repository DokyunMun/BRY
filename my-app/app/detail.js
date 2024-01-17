'use client'



export default function Detail({artwork, onClose}) {
  
  const goBack = () => {
    onClose();
  };
  console.log(artwork.title);
  console.log(artwork.material);
  return (
    <div
    style={{width:'100vw', display:"flex", justifyContent:'center', position:'fixed', top:"0",height:'100vh', zIndex:'101', backgroundColor:'white'}}>
          <div className='title_con' style={{display:"flex",height:"100vh", width:"-webkit-fill-available", justifyContent:"center", alignItems:'center',padding:"0.5rem"}}>
            <div id="title" style={{display:"flex",   width: "100%", flexWrap:'wrap', justifyContent:'center'}}>
                        <i>{artwork.title},&nbsp;</i>
                        <div>{artwork.material},&nbsp; </div>
                        <div>{artwork.width} × {artwork.height} cm,&nbsp; </div>
                        <div>{artwork.year}</div>
            </div>
          </div>
              <img
                  className="images"
                  src={`/${artwork.id}.jpg`}
                  alt="1"
                      />
              <div className='close' onClick={goBack}  style={{display:"flex",height:"100vh", width:"-webkit-fill-available", justifyContent:"center",alignItems:'center',padding:"0.5rem"}}> Close </div>
    </div>
  )
}
  
  // id is the imageId
