"use client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button } from "@/components/ui/button";
import UsersTable from "@/components/(App)/UsersTable";
import AddUserModal from "@/components/(App)/AddUserModal";

const AdminUsersPage = () => {
  const [open, setOpen] = useState(false);

  const handleAddUserSuccess = async (data: any, error: any) => {
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(
        "Kullanıcı başarıyla eklendi!" +
          "Hoşgeldin " +
          data.name +
          " " +
          data.surname
      );
    }
  };

  return (
    <div className="flex flex-col justify-center py-4 w-3/4 mx-auto mt-4">
      <div className="flex justify-between mx-4 py-2">
        <h1 className="text-xl font-bold dark:text-black">
          Kullanıcı Listesi
        </h1>
        <Button onClick={() => setOpen(true)}>Yeni Kayıt Ekle</Button>
        <AddUserModal
          onSuccess={handleAddUserSuccess}
          openModel={open}
          setOpen={setOpen}
        />
      </div>
      <UsersTable />
      <ToastContainer />
    </div>
  );
};

export default AdminUsersPage;
