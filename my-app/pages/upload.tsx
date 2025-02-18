"use client";

import { createClient } from "@supabase/supabase-js";
import React, { useState, useEffect, useRef } from "react";

import { User } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase environment variables are missing");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Artwork = {
  id: number;
  title: string;
  year: string;
  material: string;
  width: string;
  height: string;
  filename: string;
};

export default function ContentsManager() {


  const [user, setUser] = useState<User | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  
  const fileInputRef = useRef(null);

  const [inputValues, setInputValues] = useState<Artwork>({
    id: null as unknown as number,
    title: "",
    year: "",
    material: "",
    width: "",
    height: "",
    filename: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);

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


  const fetchArtworks = async () => {
    const { data, error } = await supabase.from("artworks").select("*").order("id", {ascending:true});

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setArtworks(data as Artwork[]);
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      await fetchArtworks();
    };
    fetchData();
  }, []);



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setInputValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (!file) return;
      if (/[\p{Script=Hangul}]/u.test(file.name)) {
        alert("파일 이름에 한글이 포함되어 있습니다. 파일명을 영어로 변경하세요.");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { id, title, material, year, width, height, filename } = inputValues;

    if (!title || !material || !year || !width || !height) {
      alert("모든 필드를 입력하세요.");
      return;
    }

    let newFilename = filename;

    if (selectedFile) {
      if (id && filename) {
        const { error: deleteError } = await supabase.storage.from("images").remove([filename]);
        if (deleteError) {
          console.error("기존 파일 삭제 실패", deleteError);
          alert("기존 파일 삭제에 실패했습니다.");
          return;
        }
      }

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(`${selectedFile.name}`, selectedFile, { upsert: true });

      if (uploadError) {
        console.error(uploadError);
        alert("파일 업로드 실패");
        return;
      }

      newFilename = uploadData?.path || selectedFile.name;
    }

    if (id) {
      const { error } = await supabase.from("artworks").update({
        title, material, year, width, height, filename: newFilename,
      }).eq("id", id);

      if (error) {
        console.error(error);
        alert("업데이트 실패");
      } else {
        alert("업데이트 성공!");
      }
    } else {
      const { error } = await supabase.from("artworks").insert([
        { title, material, year, width, height, filename: newFilename }
      ]);

      if (error) {
        console.error(error);
        alert("데이터베이스 삽입 실패");
      } else {
        alert("업로드 성공!");
      }
    }

    setInputValues({ id: null as unknown as number, title: "", year: "", material: "", width: "", height: "", filename: "" });
    setSelectedFile(null);
    setPreviewUrl(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  

    fetchArtworks();
  };

  const handleEdit = (artwork: Artwork) => {
    setInputValues(artwork);
    setPreviewUrl(`https://dsqdiqhlqtnyvbjwbrle.supabase.co/storage/v1/object/public/images/${artwork.filename}`);
  };

  const handleDelete = async (id: number, filename: string) => {
    if (!filename) {
      alert("파일 이름이 없습니다.");
      return;
    }

    const filePath = `images//${filename}`;
    console.log(`🗑 삭제 요청: ${filePath}`);

    const { error: deleteError } = await supabase.storage.from("images").remove([filename]);

    if (deleteError) {
      console.error("❌ 파일 삭제 실패:", deleteError);
      alert("파일 삭제에 실패했습니다.");
      return;
    }

    const { error: dbError } = await supabase.from("artworks").delete().eq("id", id);
    if (dbError) {
      console.error("❌ DB 삭제 실패:", dbError);
      alert("DB 삭제 실패");
    } else {
      console.log("✅ DB 삭제 성공");
      alert("삭제 성공!");
      fetchArtworks();
    }
  };

  const groupedArtworks = artworks.reduce<Record<string, Artwork[]>>((acc, art) => {
    if (!acc[art.year]) acc[art.year] = [];
    acc[art.year].push(art);
    return acc;
  }, {});


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
    <div>
          <button style={{margin: "10px 0 10px 0"}} onClick={handleLogout}>로그아웃</button>

      <form id="contentsManager" onSubmit={handleSubmit} style={{paddingBottom:"12px"}}>
        <input id="title" type="text" placeholder="Title" value={inputValues.title} onChange={handleInputChange} style={{fontStyle:"italic"}}/>
        <span>, </span><input id="year" type="number" placeholder="Year" value={inputValues.year} onChange={handleInputChange} />
        <span>, </span><input id="material" type="text" placeholder="Material" value={inputValues.material} onChange={handleInputChange} />
        <span>, </span><input id="height" type="number" placeholder="Height" value={inputValues.height} onChange={handleInputChange} />
        <span> × </span><input id="width" type="number" placeholder="Width" value={inputValues.width} onChange={handleInputChange} />
        <br></br><br></br><input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} />
        <br></br>{previewUrl && <img style={{width:"20%"}} src={previewUrl} alt="미리보기" />}
        <br></br><button type="submit">{inputValues.id ? "Update" : "Upload"}</button>
      </form>

      {Object.keys(groupedArtworks).sort((a, b) => b.localeCompare(a)).map((year) => (
        <div key={year} style={{borderTop: "solid", margin:"0", padding:"1.5rem 0rem 1.5rem 0"}}>
          <div style={{margin:"10px 0px 10px 0px", fontSize: "1.5rem"}}>{year}</div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {groupedArtworks[year].map((art) => (
              <div key={art.id} style={{ width: "20%", padding: "1rem 0 1rem 0"}}>
                <img style={{ width: "98%" }} src={`https://dsqdiqhlqtnyvbjwbrle.supabase.co/storage/v1/object/public/images/${art.filename}`} alt={art.title} />
                <p style={{margin: "0", fontSize: "14px"}}><i>{art.title}</i>, {art.material}, {art.height} × {art.width} cm</p>
                <button style={{marginTop:"5px"}} onClick={() => handleEdit(art)}>Edit</button>
                <button style={{marginTop:"5px"}} onClick={() => handleDelete(art.id, art.filename)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}