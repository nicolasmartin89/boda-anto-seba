import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Configuración del cliente S3
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function POST(req: Request) {
    try {
        const { fileName, folder, fileContent } = await req.json();

        if (!fileName || !folder || !fileContent) {
            return NextResponse.json(
                { error: "Faltan parámetros requeridos" },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(fileContent, "base64");
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: `${folder}/${fileName}`,
            Body: buffer,
            ContentType: "image/jpeg",
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);

        const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${folder}/${fileName}`;
        return NextResponse.json({ url: publicUrl });
    } catch (error) {
        console.error("Error al subir imagen:", error);
        return NextResponse.json(
            { error: "Hubo un problema al subir la imagen" },
            { status: 500 }
        );
    }
}