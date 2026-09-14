import sharp from "sharp";

export const processFileImage = async (input: Buffer): Promise<Buffer> => {
  return sharp(input)
    .resize({ width: 512, height: 512, fit: "cover" })
    .webp({ quality: 80 })
    .toBuffer();
};
