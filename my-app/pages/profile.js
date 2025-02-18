"use client";


import React, { useEffect, useState, useRef } from "react";
import Script from "next/script";
import { createClient } from "@supabase/supabase-js";
import { User } from '@supabase/supabase-js';


// Supabase 클라이언트 초기화
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Blog() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  const [quill, setQuill] = useState(null);
  const [title, setTitle] = useState(""); // 제목 상태 추가
  const [category, setCategory] = useState(""); // 카테고리 상태 추가
  const [content, setContent] = useState("");

  useEffect(() => {
    const checkUser = async () => { 
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setLoading(false);
    };

    checkUser();
  }, []);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });
  
    if (error) console.error("로그인 실패", error);
    else alert("로그인 링크가 이메일로 전송되었습니다!");
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };
  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  
    if (error) console.error("구글 로그인 실패", error);
  };



  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("profile")
        .select("content")
        .eq("id", 1) // 수정할 게시글 ID
        .single();
  
      if (error) console.error("Data fetch error:", error);
      else {
        // setTitle(data.title);
        // setCategory(data.category);
        setContent(data.content);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const loadQuill = () => {
      if (window.Quill && !quill) {
        const newQuill = new Quill("#editor", {
          theme: "snow",
          modules: {
            toolbar: {
              container: [
                // [{ header: [1, 2, false] }],
                // ["bold", "italic", "underline"],
                // [{ list: "ordered" }, { list: "bullet" }],
                // ["link", "image"],
                ["addRow"],
              ],
              handlers: {
                // image: function () {
                //   const input = document.createElement("input");
                //   input.setAttribute("type", "file");
                //   input.setAttribute("accept", "image/*");
                //   input.click();
  
                //   input.onchange = async () => {
                //     const file = input.files[0];
                //     if (file) {
                //       const imageUrl = await handleImageUpload(file);
                //       if (imageUrl) {
                //         const range = this.quill.getSelection();
                //         this.quill.insertEmbed(range.index, "image", imageUrl);
                //       } else {
                //         alert("Image upload failed!");
                //       }
                //     }
                //   };
                // },
                addRow: function () {
                  const selection = this.quill.getSelection();
                  if (!selection) return;
                
                  const [leaf, offset] = this.quill.getLeaf(selection.index);
                  if (!leaf) return;
                
                  const node = leaf.domNode.nodeType === 3 ? leaf.domNode.parentNode : leaf.domNode;
                
                  const table = node.closest('table');
                  if (!table) {
                    alert('표 안에서 커서를 둔 상태에서만 행을 추가할 수 있습니다!');
                    return;
                  }
                
                  const newRow = table.insertRow();
                  const cellCount = table.rows[0].cells.length;
                  for (let i = 0; i < cellCount; i++) {
                    const newCell = newRow.insertCell();
                    newCell.textContent = '새 셀';
                  }
                },
              },
            },
          },
        });
  
        setQuill(newQuill);
      }
    };
  
    if (window.Quill) {
      loadQuill();
    } else {
      const quillScript = document.createElement("script");
      quillScript.src = "https://cdn.jsdelivr.net/npm/quill@2.0.0/dist/quill.js";
      quillScript.onload = loadQuill;
      document.body.appendChild(quillScript);
    }
  }, []);


  useEffect(() => {
    if (quill && content) {
      quill.clipboard.dangerouslyPasteHTML(content);
    }
  }, [quill, content]);

  // 데이터를 Supabase에 저장하는 함수
  const saveToSupabase = async () => {
    const content = quill.root.innerHTML; // Quill 에디터의 내용을 가져옵니다.
    const { data, error } = await supabase
      .from("profile")
      .update([{ content }]) // 제목과 카테고리도 저장
      .eq('id', 1);

    if (error) console.error("Error saving data:", error);
    else console.log("Data saved:", data);
  };

  // const handleImageUpload = async (file) => {
  //   try {
  //     const sanitizedFileName = file.name
  //       .toLowerCase()
  //       .replace(/[^a-z0-9.-]/g, "-") // 파일 이름 정리
  //       .replace(/-+/g, "-")
  //       .replace(/(^-|-$)/g, "");
  
  //     // 🔥 public/ 제거 → "images/" 경로만 사용
  //     const filePath = `/${Date.now()}-${sanitizedFileName}`;
  
  //     const { data, error } = await supabase.storage
  //       .from("blog") // Supabase 버킷 이름
  //       .upload(filePath, file);
  
  //     if (error) {
  //       console.error("Image upload failed:", error.message);
  //       return null;
  //     }
  
  //     // 🔥 public 경로를 따로 추가하지 않고, Supabase URL을 직접 생성
  //     const imageUrl = `${supabaseUrl}/storage/v1/object/public/blog/${filePath}`;
  //     console.log("Uploaded Image URL:", imageUrl);
  //     return imageUrl;
  //   } catch (err) {
  //     console.error("Error uploading image:", err);
  //     return null;
  //   }
  // };


  if (loading) return <div>로딩 중...</div>;
  if (!user) {
    return (
      <div>
<input
  type="email"
  placeholder="이메일 입력"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
<button onClick={handleLogin}>이메일 로그인</button>
      </div>
    );
  }

  
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <link
        href="https://cdn.jsdelivr.net/npm/quill@2.0.0/dist/quill.snow.css"
        rel="stylesheet"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "1rem",
          width: "45vw",
        }}
      >
        {/* <input
          type="text"
          style={{
            width: "80%",
            height: "40px",
            border: "lightgray solid 1px",
            padding: "10px",
            boxSizing: "border-box",
          }}
          autoFocus
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={category}
          style={{
            width: "20%",
            height: "40px",
            border: "lightgray solid 1px",
            borderLeft: "none",
            padding: "0",
            boxSizing: "border-box",
            textAlign: "center",
          }}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">카테고리 선택</option>
          <option value="S">Structure of artworks</option>
          <option value="P">Piece of thought</option>
          <option value="L">Life outside</option>
          <option value="D">Strange Dreams</option>
        </select> */}
      </div>
      <div
        id="editor"
        style={{
          width: "45vw",
          borderTop: "lightgray solid 1px",
          margin: "1rem 0 1rem 0",
          height: "500px",
        }}
      ></div>
      <button
        style={{ width: "45vw", height: "40px" }}
        onClick={saveToSupabase}
        // disabled={!title || !category || !quill?.root.innerHTML.trim()}
      >
        저장
      </button>
      <style jsx global>{`
  body {
    margin: 0px;
  }
  .ql-toolbar .ql-addRow::before {
    content: '행 추가';
    font-size: 14px;
  }
      `}</style>
    </div>
  );
}

