"use client"; // Ensure this runs only on the client side

import { createClient } from "@supabase/supabase-js";
import React, { useState, useEffect } from "react";
import "./global.css";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase environment variables are missing");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ContentsManager() {
  const [inputValues, setInputValues] = useState({
    title: "",
    year: "",
    material: "",
    width: "",
    height: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    // Ensure this component is running on the client side only
    if (typeof window === "undefined") return;
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setInputValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (!file) return;

      // Validate file name (no Korean characters)
      if (/[\p{Script=Hangul}]/u.test(file.name)) {
        alert("파일 이름에 한글이 포함되어 있습니다. 파일명을 영어로 변경하세요.");
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const { title, material, year, width, height } = inputValues;

    // Validation
    if (!title || !material || !year || !width || !height) {
      alert("모든 필드를 입력하세요.");
      return;
    }

    if (!selectedFile) {
      alert("파일을 선택하십시오.");
      return;
    }

    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("images")
      .upload(`uploads/${selectedFile.name}`, selectedFile, { upsert: true });

    if (uploadError) {
      console.error(uploadError);
      alert("파일 업로드 실패");
      return;
    }

    // Insert metadata into the database
    const { data, error } = await supabase.from("artworks").insert([
      {
        title,
        material,
        year,
        width,
        height,
        filename: uploadData?.path || selectedFile.name,
      },
    ]);

    if (error) {
      console.error(error);
      alert("데이터베이스 삽입 실패");
    } else {
      alert("업로드 성공!");
      console.log(data);
    }
  }

  return (
    <form id="contentsManager" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", padding: "1vw" }}>
      <input id="title" type="text" placeholder="Title" value={inputValues.title} onChange={handleInputChange} />
      <input id="year" type="number" placeholder="Year(숫자만 입력하세요)" value={inputValues.year} onChange={handleInputChange} />
      <input id="material" type="text" placeholder="Material" value={inputValues.material} onChange={handleInputChange} />
      <input id="width" type="number" placeholder="Width(cm)" value={inputValues.width} onChange={handleInputChange} />
      <input id="height" type="number" placeholder="Height(cm)" value={inputValues.height} onChange={handleInputChange} />
      
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && <img src={previewUrl} alt="미리보기" style={{ width: "25vw", height: "auto" }} />}
      
      <button type="submit" style={{ marginTop: "0.25rem" }}>Submit</button>
    </form>
  );
}
