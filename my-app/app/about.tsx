'use client'

export default function About(){
    const aboutCloseBtn = () => {
        const aboutCon = document.getElementById('about_con');
        const about_btn = document.getElementById('about_btn');
        const email_btn = document.getElementById('email_btn');
        aboutCon.style.display = "none";
        about_btn.style.display = "flex";
        email_btn.style.display = "none";

    }

    return(
        <div id="about_con">
            <div id="about">
                In the process of re-sensitizing the collected experience, it captures the newly sensed and creates a new screen independent of reality. It captures light from images that exist without memory, passes it through the body, and captures the shapes that remain.
            </div>
            <div id="about_close_btn" onClick={aboutCloseBtn}>
                ×
            </div>
        </div>
    )
    }