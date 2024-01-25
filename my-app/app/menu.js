"use client";
import Link from "next/link";

export default function Menu() {
  const toggleAbout = () => {
    const about_btn = document.getElementById("about_btn");
    const aboutCon = document.getElementById("about_con");
    const email_btn = document.getElementById("email_btn");
    const index_btn = document.getElementById("index_btn");
    const years_con = document.getElementById("years-con");
    aboutCon.style.display = "flex";
    about_btn.style.display = "none";
    email_btn.style.display = "flex";
    // index_btn.style.display = "none";
    years_con.style.display = "none";
    const about_close_btn = document.getElementById("about_close_btn");
    about_close_btn.style.display = "flex";

  };

  return (
    <div>
    <div className="btn" id="byeoriyang_btn" onClick={() => window.location.reload()}>
      Byeori Yang
    </div>
      <div className="btn" id="about_btn" onClick={toggleAbout}>
        About
      </div>
      {/* <div className="btn" id="category">
        2023
      </div> */}
      <div id="footer">
        <div id="index_con" style={{display:"flex", flexDirection:"row"}}>
        {/* <div className="btn" id="index_btn">
          Index
        </div> */}

        </div>
        <div id="copyright">© Byeori Yang, All rights reserved.</div>
      </div>
    </div>
  );
}
