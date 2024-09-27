import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const id = formData.get("id") as string;
  const userId = formData.get("userId") as string;
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadDir = path.join(process.cwd(), "public", "users", userId, "images");

  try {
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, file.name);
    await fs.writeFile(filePath, buffer);
    return NextResponse.json({ message: "File uploaded successfully" });
  } catch (error) {
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
