import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";
import EditUserModel from "./EditUserModel";
import localUsers from "@/store/users.json";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "react-toastify";

interface User {
  id: number;
  email: string;
  role: string;
  name: string;
  surname: string;
  username: string;
  avatar: string;
  status: string;
  department: string;
  class: string;
  created_at: string;
}

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserConfirmDelete, setSelectedUserConfirmDelete] =
    useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpenModel, setIsDeleteOpenModel] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimi için state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 12; // Sayfa başına gösterilecek kullanıcı sayısı

  // const xLocalUsers = localUsers; // API'ye istek atmadan önce localUsers kullanılıyorum Test Amaçlı

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const handleDelete = async (user: User) => {
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchUsers();
        toast.success("Kullanıcı başarıyla silindi");
      }
    } catch (error: any) {
      toast.error("Kullanıcı silinirken bir hata oluştu");
    }
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Kullanıcı Ara"
          className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/4 flex justify-center items-center shadow-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {paginatedUsers.length === 0 ? (
        <p>Üzgünüz, aradığınız kayıt bulunamadı.</p>
      ) : (
        <div className="shadow-lg border-2 border-gray-50 rounded-md dark:border-gray-700 dark:bg-black">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-center font-bold text-lg">
                  Kullanıcı ID
                </TableHead>
                <TableHead className="text-center font-bold text-lg">
                  Adı
                </TableHead>
                <TableHead className="text-center font-bold text-lg">
                  Soyadı
                </TableHead>
                <TableHead className="text-center font-bold text-lg">
                  Kullanıcı Adı
                </TableHead>
                <TableHead className="text-center font-bold text-lg">
                  Email
                </TableHead>
                <TableHead className="text-center font-bold text-lg">
                  Rol
                </TableHead>
                <TableHead className="text-center font-bold text-lg">
                  Durum
                </TableHead>
                <TableHead className="text-center font-bold text-lg">
                  Branş
                </TableHead>
                <TableHead className="text-center font-bold text-lg">
                  Sınıf
                </TableHead>
                <TableHead className="text-center font-bold text-lg">
                  #
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium text-center">
                    {user.id}
                  </TableCell>
                  <TableCell className="text-center">{user.name}</TableCell>
                  <TableCell className="text-center">{user.surname}</TableCell>
                  <TableCell className="text-center">{user.username}</TableCell>
                  <TableCell className="text-center">{user.email}</TableCell>
                  <TableCell
                    className={`${
                      user.role === "admin" ? "text-red-500 font-bold" : ""
                    } text-center`}
                  >
                    {user.role === "admin"
                      ? "Admin"
                      : user.role === "user"
                      ? "Öğrenci"
                      : "Öğrenci"}
                  </TableCell>
                  <TableCell
                    className={`${
                      user.status === "active"
                        ? "text-green-500"
                        : user.status === "passive"
                        ? "text-red-500"
                        : "text-yellow-500"
                    } text-center`}
                  >
                    {user.status === "active"
                      ? "Aktif"
                      : user.status === "passive"
                      ? "Pasif"
                      : "Beklemede"}
                  </TableCell>
                  <TableCell className="text-center">
                    {user.department === "oabt_lm"
                      ? "Lise Matematik"
                      : user.department === "oabt_im"
                      ? "İlköğretim Matematik"
                      : user.department === "yks_tyt"
                      ? "TYT Matematik"
                      : user.department === "yks_ayt"
                      ? "AYT Matematik"
                      : "Diğer"}
                  </TableCell>
                  <TableCell className="text-center">{user.class}</TableCell>
                  <TableCell className="flex gap-2 justify-center">
                    <Button onClick={() => handleEdit(user)}>Düzenle</Button>
                    <Button onClick={() => {
                      setIsDeleteOpenModel(true)
                      setSelectedUser(user)
                    }}>
                      Sil
                    </Button>
                    <AlertDialog
                      open={isDeleteOpenModel}
                      onOpenChange={setIsDeleteOpenModel}
                    >
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-center text-red-500 font-bold text-xl">
                            Onay İşlemi
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-center text-black">
                          {selectedUser?.name} {selectedUser?.surname}{" "} adlı kullanıcıyı silmek istediğinize emin misiniz?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={() => setIsDeleteOpenModel(false)}
                            className="w-1/2"
                          >
                            Vazgeç
                          </AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(user)} className="w-1/2">
                            Sil
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <EditUserModel
            editOnSuccess={fetchUsers}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedUser={
              selectedUser
                ? selectedUser
                : ({
                    id: 0,
                    email: "",
                    role: "",
                    name: "",
                    surname: "",
                    username: "",
                    avatar: "",
                    status: "",
                    department: "",
                    class: "",
                    created_at: "",
                  } as User)
            }
          />
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    onClick={() => setCurrentPage(index + 1)}
                    className={currentPage === index + 1 ? "active" : ""}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
