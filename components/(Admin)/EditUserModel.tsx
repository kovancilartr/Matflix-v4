import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { EditUserModelProps } from "@/types/types";

const formSchema = z.object({
  name: z.string().min(2, { message: "Adınızı girmelisiniz." }),
  surname: z.string().min(2, { message: "Soyadınızı girmelisiniz." }),
  username: z.string().min(2, { message: "Kullanıcı adınızı girmelisiniz." }),
  email: z.string().email({ message: "Bu bir email adresi olmalıdır." }),
  password: z.string().min(2, { message: "Şifre alanı zorunludur." }),
  role: z.enum(["admin", "user", ""]),
  status: z.enum(["active", "passive", "pending", ""]),
  department: z.enum(["oabt_lm", "oabt_im", "yks_tyt", "yks_ayt", ""]),
  class: z.enum([
    "2024_1",
    "2024_2",
    "2024_3",
    "2025_1",
    "2025_2",
    "2025_3",
    "",
  ]),
});




const EditUserModel: React.FC<EditUserModelProps> = ({
  isOpen,
  setIsOpen,
  selectedUser,
  editOnSuccess,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: selectedUser?.name,
      surname: selectedUser?.surname,
      username: selectedUser?.username,
      email: selectedUser?.email,
      password: "",
      role: selectedUser?.role as "admin" | "user" | "",
      status: selectedUser?.status as "active" | "passive" | "pending" | "",
      department: selectedUser?.department as
        | ""
        | "oabt_lm"
        | "oabt_im"
        | "yks_tyt"
        | "yks_ayt"
        | "",
      class: selectedUser?.class as
        | ""
        | "2024_1"
        | "2024_2"
        | "2024_3"
        | "2025_1"
        | "2025_2"
        | "2025_3"
        | "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: selectedUser?.name || "",
        surname: selectedUser?.surname || "",
        username: selectedUser?.username || "",
        email: selectedUser?.email || "",
        password: "",
        role: selectedUser?.role as "admin" | "user" | "",
        status: selectedUser?.status as "active" | "passive" | "pending" | "",
        department: selectedUser?.department as
          | ""
          | "oabt_lm"
          | "oabt_im"
          | "yks_tyt"
          | "yks_ayt"
          | "",
        class: selectedUser?.class as
          | ""
          | "2024_1"
          | "2024_2"
          | "2024_3"
          | "2025_1"
          | "2025_2"
          | "2025_3"
          | "",
      });
    } else {
      form.reset();
    }
  }, [isOpen, selectedUser]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.put(`/api/users/${selectedUser?.id}`, {
        name: values.name,
        surname: values.surname,
        username: values.username,
        email: values.email,
        password: values.password,
        role: values.role,
        status: values.status,
        department: values.department,
        class: values.class,
      });
      toast.success("Kullanıcı başarıyla güncellendi");
      setIsOpen(false);
      editOnSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yeni Kullanıcı Ekle</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Surname */}
            <div className="flex flex-row gap-x-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <div className="flex flex-row justify-between items-center">
                      <FormLabel>Adınız</FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Adınızı Giriniz"
                        type="text"
                        id="name"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <div className="flex flex-row justify-between items-center">
                      <FormLabel>Soyadınız</FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Soyadınızı Giriniz"
                        type="text"
                        id="surname"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* Username Email */}
            <div className="flex flex-row gap-x-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <div className="flex flex-row justify-between items-center">
                      <FormLabel>Kullanıcı Adı</FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Kullanıcı Adınızı Giriniz"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <div className="flex flex-row justify-between items-center">
                      <FormLabel>Email</FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="E-Posta Adresinizi Giriniz"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row justify-between items-center">
                    <FormLabel>Şifreniz</FormLabel>
                    <FormMessage className="text-xs" />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Şifrenizi Giriniz"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Role Status */}
            <div className="flex flex-row gap-x-6">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Kullanıcı Yetkisi</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Yetkisini seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">Öğrenci</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Durum</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Kaydın Durumunu Belirleyin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">
                          <span className="text-[12px]">⏳ </span>Onay Bekliyor
                        </SelectItem>
                        <SelectItem value="active">
                          <span className="text-[12px]">✅ </span>Aktif
                        </SelectItem>
                        <SelectItem value="passive">
                          <span className="text-[12px]">❌ </span>Pasif
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Department Class */}
            <div className="flex flex-row gap-x-6">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Branş</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Branşınızı seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="oabt_lm">
                          ÖABT - Lise Matematik
                        </SelectItem>
                        <SelectItem value="oabt_im">
                          ÖABT - İlköğretim Matematik
                        </SelectItem>
                        <SelectItem value="yks_tyt">
                          YKS - TYT Matematik
                        </SelectItem>
                        <SelectItem value="yks_ayt">
                          YKS - AYT Matematik
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Sınıf</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sınıfınızı Belirleyin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="2024_1">2024-1</SelectItem>
                        <SelectItem value="2024_2">2024-2</SelectItem>
                        <SelectItem value="2024_3">2024-3</SelectItem>
                        <SelectItem value="2025_1">2025-1</SelectItem>
                        <SelectItem value="2025_2">2025-2</SelectItem>
                        <SelectItem value="2025_3">2025-3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Submit */}
            <Button className="w-full" type="submit">
              Kullanıcıyı Kaydet
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModel;
