"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase 클라이언트 초기화
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function About() {
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from("profile")
        .select("content")
        .eq("id", 1)
        .single();

      if (error) {
        console.error("데이터 가져오기 실패", error);
      } else {
        setContent(data.content);
      }
    };

    fetchContent();
  }, []);

  const aboutCloseBtn = () => {
    const aboutCon = document.getElementById("about_con");
    const about_btn = document.getElementById("about_btn");
    const email_btn = document.getElementById("email_btn");
    const years_con = document.getElementById("years-con");
    const about_close_btn = document.getElementById("about_close_btn");

    years_con.style.display = "flex";
    aboutCon.style.display = "none";
    about_btn.style.display = "flex";
    email_btn.style.display = "none";
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
          {/* 🔥 Supabase에서 불러온 HTML 내용 삽입 */}
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      </div>
      <div id="about_close_btn" className="btn" onClick={aboutCloseBtn}>
        Close
      </div>
    </div>
  );
}