import { NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

// Configura el cliente de AWS S3
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

// Límite de imágenes por página
const LIMIT = 10;

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const continuationToken = url.searchParams.get("continuationToken");

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            MaxKeys: LIMIT,
            ContinuationToken: continuationToken || undefined,
        };

        const command = new ListObjectsV2Command(params);
        const data = await s3.send(command);

        const images = data.Contents?.map((item) => ({
            key: item.Key!,
            url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`,
        }));

        return NextResponse.json({
            images: images || [],
            nextContinuationToken: data.NextContinuationToken || null,
        });
    } catch (error) {
        console.error("Error al listar imágenes:", error);
        return NextResponse.json(
            { error: "Hubo un problema al listar las imágenes." },
            { status: 500 }
        );
    }
}