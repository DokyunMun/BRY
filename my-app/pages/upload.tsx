"use client";

// import './globals.css'
import { createClient } from "@supabase/supabase-js";
import React, { useState, useEffect } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase environment variables are missing");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ContentsManager() {
  const [inputValues, setInputValues] = useState({
    id: "",
    title: "",
    year: "",
    material: "",
    width: "",
    height: "",
    filename: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [artworks, setArtworks] = useState([]);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    fetchArtworks();
  }, []);
  
  const fetchArtworks = async () => {
    const { data, error } = await supabase.from("artworks").select("*");
    if (error) console.error(error);
    else setArtworks(data);
  };

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
  
    let newFilename = filename; // Keep track of the filename before update
    
    if (selectedFile) {
      // If updating an existing entry with a new file, delete old file first
      if (id && filename) {
        const { error: deleteError } = await supabase.storage.from("images").remove([filename]);
        if (deleteError) {
          console.error("기존 파일 삭제 실패", deleteError);
          alert("기존 파일 삭제에 실패했습니다.");
          return;
        }
      }
      
      // Upload the new file
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(`/${selectedFile.name}`, selectedFile, { upsert: true });
  
      if (uploadError) {
        console.error(uploadError);
        alert("파일 업로드 실패");
        return;
      }
  
      newFilename = uploadData?.path || selectedFile.name;
    }
  
    if (id) {
      // Update existing record
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
      // Insert new record
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
  
    setInputValues({ id: null, title: "", year: "", material: "", width: "", height: "", filename: "" });
    setSelectedFile(null);
    setPreviewUrl(null);
    fetchArtworks();
  };
  const handleEdit = (artwork) => {
    setInputValues(artwork);
    setPreviewUrl(`https://dsqdiqhlqtnyvbjwbrle.supabase.co/storage/v1/object/public/images/${artwork.filename}`);
  };
  const handleDelete = async (id, filename) => {
    if (!filename) {
      alert("파일 이름이 없습니다.");
      return;
    }
  
    // 🔹 파일 경로를 명확하게 확인 (버킷 내부 경로 설정)
    const filePath = `images/${filename}`;
    console.log(`🗑 삭제 요청: ${filePath}`);
  
    // 🔹 Supabase에서 파일이 실제로 존재하는지 확인
    const { data: fileExists, error: checkError } = await supabase.storage.from("images").list();
    if (checkError) {
      console.error("❌ 파일 확인 실패:", checkError);
    } else {
      const foundFile = fileExists.find(file => file.name === filename);
      if (!foundFile) {
        console.warn("⚠️ 삭제할 파일이 존재하지 않습니다.");
        return;
      }
    }
  
    // 🔹 파일 삭제 요청
    const { error: deleteError } = await supabase.storage.from("images").remove([filePath]);
  
    if (deleteError) {
      console.error("❌ 파일 삭제 실패:", deleteError);
      alert("파일 삭제에 실패했습니다.");
      return;
    }
  
    console.log("✅ 파일 삭제 성공:", filePath);
  
    // 🔹 DB에서 데이터 삭제
    const { error: dbError } = await supabase.from("artworks").delete().eq("id", id);
    if (dbError) {
      console.error("❌ DB 삭제 실패:", dbError);
      alert("DB 삭제 실패");
    } else {
      console.log("✅ DB 삭제 성공");
      alert("삭제 성공!");
      fetchArtworks(); // UI 갱신
    }
  };

  const groupedArtworks = artworks.reduce((acc, art) => {
    if (!acc[art.year]) acc[art.year] = [];
    acc[art.year].push(art);
    return acc;
  }, {});

  return (
    <div>
      <form id="contentsManager" onSubmit={handleSubmit}>
        <input id="title" type="text" placeholder="Title" value={inputValues.title} onChange={handleInputChange} />
        <input id="year" type="number" placeholder="Year" value={inputValues.year} onChange={handleInputChange} />
        <input id="material" type="text" placeholder="Material" value={inputValues.material} onChange={handleInputChange} />
        <input id="width" type="number" placeholder="Width" value={inputValues.width} onChange={handleInputChange} />
        <input id="height" type="number" placeholder="Height" value={inputValues.height} onChange={handleInputChange} />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {previewUrl && <img src={previewUrl} alt="미리보기" />}
        <button type="submit">{inputValues.id ? "Update" : "Submit"}</button>
      </form>

      {Object.keys(groupedArtworks).sort((a, b) => b - a).map((year) => (
        <div key={year}>
          <h2>{year}</h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {groupedArtworks[year].map((art) => (
              <div key={art.id} style={{ width: "20%" }}>
                <img style={{width:"100px"}} src={`https://dsqdiqhlqtnyvbjwbrle.supabase.co/storage/v1/object/public/images/${art.filename}`} alt={art.title} />
                <p><i>{art.title}</i>, {art.material}, {art.height} × {art.width} cm</p>
                <button onClick={() => handleEdit(art)}>Edit</button>
                <button onClick={() => handleDelete(art.id, art.filename)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}