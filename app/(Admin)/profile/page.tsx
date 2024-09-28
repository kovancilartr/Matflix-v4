"use client";

import { getUserByEmail } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const session = useSession();
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    name: "",
    surname: "",
    password: "",
    role: "",
    department: "",
    status: "",
    class: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true); // Yükleme durumu

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserByEmail(session.data?.user?.email as string);
        setFormData({
          id: userData?.id || "",
          username: userData?.username || "",
          email: userData?.email || "",
          name: userData?.name || "",
          surname: userData?.surname || "",
          password: "",
          role: userData?.role || "",
          department: userData?.department || "",
          status: userData?.status || "",
          class: userData?.class || "",
        });
      } catch (error) {
        toast.error("Kullanıcı verileri yüklenirken bir hata oluştu");
      } finally {
        setLoading(false); // Yükleme tamamlandı
      }
    };
    fetchUser();
    console.log(session);
  }, [session.data?.user?.email]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (selectedFile) {
        const userFormData = new FormData(); // Yeni FormData oluştur
        userFormData.append("file", selectedFile);
        userFormData.append("id", formData.id); // Düzeltme
        userFormData.append("userId", formData.id); // Düzeltme

        const response = await fetch("/api/upload", {
          method: "POST",
          body: userFormData, // Değişiklik burada
        });

        if (response.status !== 200) {
          throw new Error("Profil fotoğrafı yüklenirken bir hata oluştu");
        }
        toast.success("Profil fotoğrafı başarıyla yüklendi");
      }

      await axios.put(`/api/users/${formData.id}`, formData);
      toast.success("Kullanıcı başarıyla güncellendi");
    } catch (error) {
      toast.error("Kullanıcı güncellenirken bir hata oluştu");
      console.error(error);
    }
  };

  if (loading) return <div>Yükleniyor...</div>; // Yükleme durumu

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <div className="w-full max-w-md flex flex-col border-2 border-gray-300 rounded-md p-4 space-y-2 shadow-xl">
        <h1 className="text-2xl font-bold text-center">Profil Bilgileri</h1>
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={"/images/default-red.png"}
              alt="profile"
              className="cursor-pointer"
              onClick={() => document.getElementById("fileInput")?.click()}
            />
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          {Object.keys(formData).map((key) => (
            <div className="w-full flex flex-row items-center" key={key}>
              <Label className="w-1/4">{key.charAt(0).toUpperCase() + key.slice(1)} :</Label>
              <Input
                name={key}
                className="w-3/4"
                value={formData[key as keyof typeof formData]}
                onChange={handleChange}
                disabled={key === "role" || key === "department" || key === "status" || key === "class" || key === "id"} // Değiştirilemez alanlar
              />
            </div>
          ))}
          <Button className="w-full" onClick={handleSubmit}>
            Bilgilerimi Güncelle
          </Button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Profile;