import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ userId: string }> }
) {
    try {
        // Obtener el userId del usuario autenticado
        const { userId: authUserId } = await auth();

        if (!authUserId) {
            return NextResponse.json(
                { error: "No autorizado. Por favor, inicia sesión." },
                { status: 401 }
            );
        }

        // Resolver la promesa de params
        const { userId } = await context.params; // Corrección aquí

        if (!userId) {
            return NextResponse.json(
                { error: "userId es requerido." },
                { status: 400 }
            );
        }

        // Verificar que el usuario autenticado sea el mismo que el userId de la ruta
        if (authUserId !== userId) {
            return NextResponse.json(
                { error: "No tienes permisos para acceder a esta información." },
                { status: 403 }
            );
        }

        // Obtener la información del usuario desde Clerk
        const user = await clerkClient.users.getUser(userId);

        // Devolver la información del usuario
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("[USERS] Error al obtener información del usuario:", error);
        return NextResponse.json(
            { error: "No se pudo obtener la información del usuario." },
            { status: 500 }
        );
    }
}
