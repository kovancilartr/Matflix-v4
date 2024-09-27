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
  const [user, setUser] = useState<User | null>(null);
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

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserByEmail(
        session.data?.user?.email as string
      );
      setUser({
        ...userData,
        id: userData?.id || "",
        role: userData?.role || "",
        status: userData?.status || "",
        department: userData?.department || "",
        class: userData?.class || "",
        surname: userData?.surname || "",
        name: userData?.name || "",
        username: userData?.username || "",
        email: userData?.email || "",
        avatar: userData?.avatar || "",
      });

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
    };
    fetchUser();
  }, [session.data?.user?.email]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
    console.log(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("id", user?.id as string);
        formData.append("userId", user?.id as string);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.status === 200) {
          toast.success("Profil fotoğrafı başarıyla yüklendi");
        } else {
          toast.error("Profil fotoğrafı yüklenirken bir hata oluştu");
        }
      }

      await axios.put(`/api/users/${formData?.id}`, {
        name: formData.name,
        surname: formData.surname,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        status: formData.status,
        department: formData.department,
        class: formData.class,
      });
      toast.success("Kullanıcı başarıyla güncellendi");
    } catch (error) {
      toast.error("Kullanıcı güncellenirken bir hata oluştu");
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <div className="w-full max-w-md flex flex-col border-2 border-gray-300 rounded-md p-4 space-y-2 shadow-xl">
        <h1 className="text-2xl font-bold text-center">Profil Bilgileri</h1>
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={user?.avatar || "/images/default-red.png"}
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
          <div className="w-full flex flex-row items-center">
            <Label className="w-1/4">Kullanıcı adı :</Label>
            <Input
              name="username"
              className="w-3/4"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-row items-center">
            <Label className="w-1/4">Email :</Label>
            <Input
              name="email"
              className="w-3/4"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-row items-center">
            <Label className="w-1/4">Adı :</Label>
            <Input
              name="name"
              className="w-3/4"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-row items-center">
            <Label className="w-1/4">Soyadı :</Label>
            <Input
              name="surname"
              className="w-3/4"
              value={formData.surname}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-row items-center">
            <Label className="w-1/4">Şifre :</Label>
            <Input
              name="password"
              type="password"
              className="w-3/4"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-row items-center">
            <Label className="w-1/4">Rol :</Label>
            <Input className="w-3/4" value={user?.role} disabled />
          </div>
          <div className="w-full flex flex-row items-center">
            <Label className="w-1/4">Branş :</Label>
            <Input className="w-3/4" value={user?.department} disabled />
          </div>
          <div className="w-full flex flex-row items-center pb-4">
            <Label className="w-1/4">Durum :</Label>
            <Input className="w-3/4" value={user?.status} disabled />
          </div>
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
