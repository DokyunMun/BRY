"use client";

export default function Detail({
  artwork: { artwork, artworkwhole, order, index },
  onClose,
}) {
  const goBack = () => {
    onClose();
  };
  console.log(artwork.title);
  console.log(artwork.material);

  const regex = /[가-힣]/g;
  const titleElement = artwork.title.match(regex) ? (
    <div>{artwork.title},&nbsp;</div>
  ) : (
    <i>{artwork.title},&nbsp; </i>
  );

  if (artwork.height > artwork.width) {
    return (
      <div
        className="toggle-body"
        onClick={goBack}
        style={{
          cursor: "pointer",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: "0",
          right: "0",
          left: "revert-layer",
          height: "100svh",
          zIndex: "101",
          backgroundColor: "white",
        }}
      >
        <img className="images-toggle" src={`/${artwork.id}.jpg`} alt="1" />
      </div>
    );
  } else {
    return (
      <div
        className="toggle-body"
        onClick={goBack}
        style={{
          cursor: "pointer",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          position: "fixed",
          top: "0",
          right: "0",
          left: "revert-layer",
          height: "100vh",
          zIndex: "101",
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <img
          className="images-toggle-landscape"
          src={`/${artwork.id}.jpg`}
          alt="1"
        />
      </div>
    );
  }
}

// id is the imageId
