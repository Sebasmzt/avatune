import { mkdir, rm } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const TMP_DIR = join(import.meta.dir, '..', '.tmp')

/**
 * Convert SVG string to PNG buffer using sharp
 * @param svg - SVG string from avatar() function
 * @param size - Output PNG dimensions (default: 400)
 * @returns PNG buffer for snapshot comparison
 */
export async function svgToPng(svg: string, size = 400): Promise<Buffer> {
  return sharp(Buffer.from(svg)).resize(size, size).png().toBuffer()
}

/**
 * Setup tmp directory for intermediate PNG files
 * Cleans existing .tmp before test runs
 */
export async function setupTmpDir(): Promise<void> {
  await rm(TMP_DIR, { recursive: true, force: true })
  await mkdir(TMP_DIR, { recursive: true })
}

/**
 * Save PNG buffer to tmp directory for debugging
 * @param buffer - PNG buffer
 * @param filename - File name (e.g., 'kyute-seed1.png')
 */
export async function saveTmpPng(
  buffer: Buffer,
  filename: string,
): Promise<string> {
  const filePath = join(TMP_DIR, filename)
  await Bun.write(filePath, buffer)
  return filePath
}

/**
 * Clean up tmp directory after tests
 */
export async function cleanupTmpDir(): Promise<void> {
  await rm(TMP_DIR, { recursive: true, force: true })
}
