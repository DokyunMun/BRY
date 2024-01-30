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
    const about_close_btn = document.getElementById("about_close_btn");

    about_close_btn.style.display = "none";

  };

  return (
    <div>
    <div id="about_con">
    <div className="btn" id="email_title">
      Contact  
      </div>
        <a className="btn" id="email_btn" href="mailto:didqufl@naver.com">
        didqufl@naver.com
      </a>
      <div id="about">
        <div className="ko" style={{wordBreak:"keep-all", lineHeight:"1.2rem", marginBottom:"1.2rem"}}>
        수집된 경험을 재감각하는 과정에서 새롭게 감각되는<br></br>
        것들을 붙잡아 현실과 독립되는 새로운 화면을 만들어낸다.<br></br>
        기억이 증발된 채 존재하는 이미지에서 빛을 포착하고,<br></br>
        그것들을 신체에 통과시켜 남는 형상을 담아낸다.
        </div>
        <table style={{marginBottom:"1.2rem"}}>
          <tbody>
          <tr>
            <td>2023 –</td>
            <td>이화여자대학교 일반대학원 서양화 석사 재학</td>
          </tr>
          <tr>
            <td>2023</td>
            <td>이화여자대학교 조형예술대학 서양화과 졸업</td>
          </tr>
          </tbody>
        </table>
        <div style={{lineHeight:"1.2rem", marginBottom:"0.5rem"}}>
        단체전 <br></br>
        <table>
            <tbody>
              <tr>
                <td>2022.8</td>
                <td>≪빛이 출렁거리는 곳≫, 이대서울병원 스페이스비투</td>  
              </tr>
              <tr>  
                <td>2022.4</td>
                <td>≪남는 벽 빌려드립니다≫, 상희읗</td>
              </tr>
              <tr>  
                <td>2021.8</td>
                <td>≪고립 혹은 탈피:섬≫, 아트스페이스 백신</td>
              </tr>
              <tr>  
                <td>2021.7</td>
                <td>≪2021 아시아프≫, 홍익대학교 현대미술관</td>
              </tr>
              <tr>  
                <td>2021.5</td>
                <td>≪접속 ACCESS≫, 이화여자대학교 파빌리온</td>
              </tr>
              <tr>  
                <td>2019.9</td>
                <td>≪흠: Focus on Complex≫, 이화여자대학교 이화아트센터</td>
              </tr>
            </tbody>
  </table>
        </div>
      </div>
    </div>
    <div id="about_close_btn" className="btn" onClick={aboutCloseBtn}>
        Close
      </div>
    </div>
  );
}
