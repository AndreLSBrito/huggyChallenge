import { v4 as uuid } from 'uuid';
import { PutObjectCommand, S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export default defineEventHandler(async (event) => {
  try {
    const file = await readBody(event); // O arquivo enviado no body
    const bucket = 'huggy-challenge';
    const key = `IMAGEM-${uuid()}.png`;
    const region = process.env.AWS_REGION;

    const s3 = new S3Client({
      region,
      // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const upload = new PutObjectCommand({
      Bucket: bucket,
      Key: key, // Nome do arquivo no S3
      Body: file, // Conteúdo do arquivo
    });

    const command = new GetObjectCommand({ Bucket: bucket, Key: key });

    try {
      const response = await s3.send(upload);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      return url; 
    } catch (err) {
      console.error(err);
      return 'Erro ao enviar para o S3';
    }
  } catch (error) {
    console.error('Erro ao fazer upload do arquivo:', error);
    return 'Erro ao fazer upload do arquivo';
  }
});