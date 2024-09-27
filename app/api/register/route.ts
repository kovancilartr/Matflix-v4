import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, UserRole, UserStatus, UserDepartment } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { name, surname, username, email, password, role, status, department, userClass } = await req.json();

  if (!name || !surname || !username || !email || !password) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        surname,
        username,
        email,
        hashedPassword,
        role: role || UserRole.user,
        status: status || UserStatus.pending,
        department: department || UserDepartment.oabt_lm,
        class: userClass,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}