import { NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

// Configura el cliente de AWS S3
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function DELETE(req: Request) {
    try {
        const url = new URL(req.url);
        const key = url.searchParams.get("key");

        if (!key) {
            return NextResponse.json({ error: "Falta la clave de la imagen" }, { status: 400 });
        }

        console.log("Eliminando imagen con la clave:", key); // A ver que sale aca...
        // Verificar si la imagen existe en S3
        const headParams = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: key,
        };
        const headCommand = new HeadObjectCommand(headParams);
        await s3.send(headCommand); // Si no existe, lanzará un error

        console.log("Imagen encontrada, procediendo con la eliminación");


        const params = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: key,
        };

        const command = new DeleteObjectCommand(params);
        await s3.send(command);

        return NextResponse.json({ message: "Imagen eliminada exitosamente" });
    } catch (error) {
        console.error("Error al eliminar la imagen:", error);
        return NextResponse.json(
            { error: "Hubo un problema al eliminar la imagen." },
            { status: 500 }
        );
    }
}