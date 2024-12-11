import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/dashboard', '/gallery', '/upload']);

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
        try {
            await auth.protect();
        } catch {
            const res = new Response(null, {
                status: 307,
                headers: {
                    Location: 'http://localhost:3000/',  // ACORDATE Nico de cambiar esto en deploy
                },
            });
            return res;
        }
    }
});

export const config = {
    matcher: [
        // Omitir archivos internos de Next.js y archivos estáticos
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Siempre ejecutar para las rutas de API
        '/(api|trpc)(.*)',
    ],
};
