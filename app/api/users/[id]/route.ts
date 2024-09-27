import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import bcrypt from 'bcryptjs';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await db.user.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Kullanıcı başarıyla silindi' });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, surname, username, email, role, status, department, class: userClass, password } = await request.json();

  try {
    // Kullanıcıyı veritabanından al
    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ hata: 'Kullanıcı bulunamadı' }, { status: 404 });
    }

    // Yeni şifreyi hashle
    const hashedNewPassword = await bcrypt.hash(password, 10);

    // Kullanıcıyı güncelle
    const updateUser = await db.user.update({
      where: { id },
      data: {
        name,
        surname,
        username,
        hashedPassword: hashedNewPassword,
        email,
        role,
        status,
        department,
        class: userClass,
      },
    });

    return NextResponse.json(updateUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ hata: 'Bir hata oluştu' }, { status: 500 });
  }
}
