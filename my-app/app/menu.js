'use client'
import Link from "next/link"

export default function Menu(){
  const toggleAbout = () => {
    const about_btn = document.getElementById('about_btn');
    const aboutCon = document.getElementById('about_con');        
    const email_btn = document.getElementById('email_btn');
    aboutCon.style.display = "flex";
    about_btn.style.display = "none";
    email_btn.style.display = "flex";
  };

  return(
    <div>
      <Link href={''} className="btn" id="byeoriyang_btn">Byeori Yang</Link>
      <div className="btn" id="about_btn" onClick={toggleAbout}>About</div>
      <div className="btn" id="email_btn">didqufl@naver.com</div>
      <div id="footer">
      <div className="btn" id="index_btn">Index</div>
      <div id="copyright">© Byeori Yang, All rights reserved.</div>
      </div>
    </div>
  )
}