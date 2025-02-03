"use client";
import { createClient } from "@supabase/supabase-js";
import React, { useState } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ContentsManager() {
  const [inputValueTitle, setInputValueTitle] = useState("");
  const [inputValueYear, setInputValueYear] = useState("");
  const [inputValueMat, setInputValueMat] = useState("");
  const [inputValueWidth, setInputValueWidth] = useState("");
  const [inputValueHeight, setInputValueHeight] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleInputChange = (event) => {
    switch (event.target.id) {
      case "title":
        setInputValueTitle(event.target.value);
        break;
      case "year":
        setInputValueYear(event.target.value);
        break;
      case "material":
        setInputValueMat(event.target.value);
        break;
      case "width":
        setInputValueWidth(event.target.value);
        break;
      case "height":
        setInputValueHeight(event.target.value);
        break;
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
      setPreviewUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (inputValueTitle == "") {
      alert("작품 제목을 입력하세요.");
      return;
    }
    if (inputValueMat == "") {
      alert("작품 재료를 입력하세요.");
      return;
    }
    if (inputValueWidth == "") {
      alert("작품 폭을 입력하세요.");
      return;
    }
    if (inputValueHeight == "") {
      alert("작품 높이를 입력하세요.");
      return;
    }
    if (selectedFile == null) {
      alert("파일을 선택하십시오.");
      return;
    }
    if (/[\p{Script=Hangul}]/u.test(selectedFile.name)) {
      alert("파일 이름에 한글이 포함되어 있습니다.");
      return;
    }

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(selectedFile.name, selectedFile);

    if (uploadError) {
      console.error(uploadError);
      alert("업로드에 실패했습니다");
      return;
    }

    const { data, error } = await supabase.from("artworks").insert([
      {
        title: inputValueTitle,
        material: inputValueMat,
        year: inputValueYear,
        width: inputValueWidth,
        height: inputValueHeight,
        filename: selectedFile.name,
      },
    ]);

    if (error) {
      console.error(error);
      alert("데이터베이스에 데이터를 입력하는 데 실패했습니다.");
    } else {
      alert("업로드에 성공했습니다");
      console.log(data);
    }
  }
  return (
    <form
      id="contentsManager"
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1vw",
      }}
    >
      <textarea
        id="title"
        placeholder="Title"
        value={inputValueTitle}
        onChange={handleInputChange}
      />
      <textarea
        id="year"
        placeholder="Year(숫자만 입력하세요)"
        value={inputValueYear}
        onChange={handleInputChange}
      />
      <textarea
        id="material"
        placeholder="Material"
        value={inputValueMat}
        onChange={handleInputChange}
      />
      <textarea
        id="width"
        placeholder="Width(숫자만 입력하세요, 단위: cm)"
        value={inputValueWidth}
        onChange={handleInputChange}
      />
      <textarea
        id="height"
        placeholder="Height(숫자만 입력하세요, 단위: cm)"
        value={inputValueHeight}
        onChange={handleInputChange}
      />
      <input type="file" onChange={handleFileChange} />
      {previewUrl && (
        <img
          src={previewUrl}
          alt="미리보기"
          style={{ width: "25vw", height: "auto" }}
        />
      )}
      <button type="submit" accept="image/*" style={{ marginTop: "0.25rem" }}>
        Submit
      </button>
    </form>
  );
}
