import * as fs from 'node:fs/promises';

export async function dirExists(p: string) {
  try {
    const stat = await fs.stat(p);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

export function isImage(name: string) {
  return /\.(jpg|jpeg|png)$/i.test(name);
}
