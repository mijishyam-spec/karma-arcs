import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

export async function saveFile(
  file: File,
  subfolder: string
): Promise<{ url: string; filename: string }> {
  const dir = path.join(UPLOAD_DIR, subfolder);
  await mkdir(dir, { recursive: true });

  const ext = path.extname(file.name);
  const filename = `${randomUUID()}${ext}`;
  const filepath = path.join(dir, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);

  return {
    url: `/uploads/${subfolder}/${filename}`,
    filename: file.name,
  };
}
