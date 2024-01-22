"use client";

export default function About() {
  const aboutCloseBtn = () => {
    const aboutCon = document.getElementById("about_con");
    const about_btn = document.getElementById("about_btn");
    const email_btn = document.getElementById("email_btn");
    const index_btn = document.getElementById("index_btn");
    const years_con = document.getElementById("years-con");
    // index_btn.style.display = "flex";
    years_con.style.display = "flex";
    aboutCon.style.display = "none";
    about_btn.style.display = "flex";
    email_btn.style.display = "none";
  };

  return (
    <div id="about_con">
            <div className="btn" id="email_btn">
        didqufl@naver.com
      </div>
      <div id="about">
        <div className="ko" style={{wordBreak:"keep-all", lineHeight:"1.15rem", marginBottom:"1rem"}}>
        수집된 경험을 재감각하는 과정에서 새롭게 감각되는 것들을 붙잡아 현실과 독립되는 새로운 화면을 만들어낸다. 기억이 증발된 채 존재하는 이미지에서 빛을 포착하고, 그것들을 신체에 통과시켜 남는 형상을 담아낸다.
        </div>
        <div style={{lineHeight:"1.15rem", marginBottom:"1rem"}}>
        2023 –<br/>
        이화여자대학교 일반대학원 서양화 석사 재학<br/>
        2023<br/>
        이화여자대학교 조형예술대학 서양화과 졸업
        </div>
        <div style={{lineHeight:"1.15rem", marginBottom:"1rem"}}>
        단체전<br/>
        2022.8 <br></br>&#65308;빛이 출렁거리는 곳&#65310;, <br></br>이대서울병원 스페이스비투<br/>
        2022.4 <br></br>&#65308;남는 벽 빌려드립니다&#65310;, <br></br>상희읗<br/>
        2021.8 <br></br>&#65308;고립 혹은 탈피:섬&#65310;, <br></br>아트스페이스 백신<br/>
        2021.7 <br></br>&#65308;2021 아시아프&#65310;, <br></br>홍익대학교 현대미술관<br/>
        2021.5 <br></br>&#65308;접속 ACCESS&#65310;, <br></br>이화여자대학교 파빌리온<br/>
        2019.9 <br></br>&#65308;흠: Focus on Complex&#65310;, <br></br>이화여자대학교 이화아트센터<br/>
        </div>
      </div>
      <div id="about_close_btn" className="btn" onClick={aboutCloseBtn}>
        Close
      </div>
    </div>
  );
}
