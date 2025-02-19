"use client";

import React, { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase 클라이언트 초기화
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Blog() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [quill, setQuill] = useState(null);
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("profile")
        .select("content")
        .eq("id", 1)
        .single();

      if (error) console.error("Data fetch error:", error);
      else setContent(data.content || "<p><br></p>");
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    if (!isClient || !user || quill) return;
    if (!editorRef.current) return;
    if (!window.Quill) return;

    const newQuill = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: {
          container: [["addRow"]],
          handlers: {
            addRow: function () {
              const selection = this.quill.getSelection();
              if (!selection) return;

              const [leaf] = this.quill.getLeaf(selection.index);
              if (!leaf) return;

              const node = leaf.domNode.nodeType === 3 ? leaf.domNode.parentNode : leaf.domNode;
              const table = node.closest("table");
              if (!table) {
                alert("표 안에서 커서를 둔 상태에서만 행을 추가할 수 있습니다!");
                return;
              }

              const newRow = table.insertRow();
              const cellCount = table.rows[0].cells.length;
              for (let i = 0; i < cellCount; i++) {
                const newCell = newRow.insertCell();
                newCell.textContent = "새 셀";
              }
            },
          },
        },
      },
    });

    setQuill(newQuill);
  }, [isClient, user]);

  useEffect(() => {
    if (quill && content) {
      quill.clipboard.dangerouslyPasteHTML(content);
    }
  }, [quill, content]);

  const saveToSupabase = async () => {
    if (!quill) return;
    const content = quill.root.innerHTML;

    const { error } = await supabase
      .from("profile")
      .update({ content })
      .eq("id", 1);

    if (error) console.error("Error updating data:", error);
    else alert("데이터가 성공적으로 저장되었습니다!");
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) console.error("로그인 실패", error);
    else alert("로그인 링크가 이메일로 전송되었습니다!");
  };

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
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <link href="https://cdn.jsdelivr.net/npm/quill@2.0.0/dist/quill.snow.css" rel="stylesheet" />
      <div style={{ width: "45vw", minHeight: "300px", margin: "1rem 0" }}>
        <div ref={editorRef} style={{ minHeight: "300px" }} />
      </div>
      <button style={{ width: "45vw", height: "40px" }} onClick={saveToSupabase}>
        저장
      </button>
      <style jsx global>{`
        body { margin: 0px; }
        .ql-toolbar .ql-addRow::before { content: '행 추가'; font-size: 14px; }
        #editor { min-height: 300px; border: 1px solid #ccc; padding: 10px; }
      `}</style>
    </div>
  );
}
