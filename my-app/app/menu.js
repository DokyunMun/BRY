"use client";
import Link from "next/link";

export default function Menu() {
  const toggleAbout = () => {
    const about_btn = document.getElementById("about_btn");
    const aboutCon = document.getElementById("about_con");
    const email_btn = document.getElementById("email_btn");
    const index_btn = document.getElementById("index_btn");
    aboutCon.style.display = "flex";
    about_btn.style.display = "none";
    email_btn.style.display = "flex";
    index_btn.style.display = "none";
  };

  return (
    <div>
      <Link href={""} className="btn" id="byeoriyang_btn">
        Byeori Yang
      </Link>
      <div className="btn" id="about_btn" onClick={toggleAbout}>
        About
      </div>
      {/* <div className="btn" id="category">
        2023
      </div> */}
      <div id="footer">
        <div id="index_con" style={{display:"flex", flexDirection:"row"}}>
        <div className="btn" id="index_btn">
          Year
        </div>
        <div className="btn">
          2023
        </div>
        </div>
        <div id="copyright">© Byeori Yang, All rights reserved.</div>
      </div>
    </div>
  );
}
