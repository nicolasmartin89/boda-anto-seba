import { NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import type { NextRequest } from "next/server";
import { isAdmin } from "../../../utils/adminUsers";

// Configurar cliente S3
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function DELETE(req: NextRequest) {
    try {
        // Verificar autenticación
        const { userId } = getAuth(req);
        if (!userId) {
            return NextResponse.json({ error: "No autorizado. Inicia sesión." }, { status: 401 });
        }

        // Obtener información del usuario
        const user = await clerkClient.users.getUser(userId);
        const userEmail = user.emailAddresses[0]?.emailAddress;

        // Verificar si el usuario es admin
        if (!isAdmin(userEmail)) {
            console.warn(`[DELETE] Intento de eliminación sin permisos: ${userEmail}`);
            return NextResponse.json({ error: "No tienes permisos para realizar esta acción." }, { status: 403 });
        }

        // Obtener la clave de la imagen
        const key = req.nextUrl.searchParams.get("key");
        if (!key) {
            return NextResponse.json({ error: "Falta la clave de la imagen en la solicitud." }, { status: 400 });
        }

        console.log(`[DELETE] Intento de eliminar imagen por ${userEmail}: ${key}`);

        // Verificar si la imagen existe en S3
        try {
            await s3.send(new HeadObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME!, Key: key }));
        } catch (error) {
            console.error(`[DELETE] Imagen no encontrada en S3: ${key}`, error);
            return NextResponse.json({ error: "La imagen no fue encontrada en el servidor." }, { status: 404 });
        }

        // Eliminar la imagen
        await s3.send(new DeleteObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME!, Key: key }));
        console.log(`[DELETE] Imagen eliminada exitosamente: ${key}`);

        return NextResponse.json({ message: "Imagen eliminada exitosamente." }, { status: 200 });
    } catch (error) {
        console.error("[DELETE] Error en el servidor:", error);
        return NextResponse.json({ error: "Hubo un problema en el servidor al eliminar la imagen." }, { status: 500 });
    }
}
