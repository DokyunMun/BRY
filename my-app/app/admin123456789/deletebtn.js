"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Delete({ artworkid, imageName }) {
  const handleDelete = async () => {
    // Delete from database
    const { data, error } = await supabase
      .from("artwork2")
      .delete()
      .match({ id: artworkid });

    // Delete from storage
    const { data: deleteData, error: deleteError } = await supabase.storage
      .from("images")
      .remove([imageName]);

    if (error || deleteError) {
      console.error("Error deleting image: ", error || deleteError);
    } else {
      alert("삭제가 완료되었습니다.");
    }
  };

  return (
    <button
      id="deletebtn"
      style={{
        position: "relative",
        zIndex: "1000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={handleDelete}
    >
      Delete
    </button>
  );
}
