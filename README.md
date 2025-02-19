🎉 Galería de Fotos para Boda 🎉
¡Bienvenido a la galería de fotos para la boda de Anto y Seba! Esta aplicación permite a los invitados subir y ver fotos de la boda en tiempo real. Está diseñada con un estilo Boho moderno y es fácil de usar, incluso para personas mayores. 🌿💍

✨ Funcionalidades
Subir Fotos: Los usuarios pueden seleccionar y subir múltiples fotos a la galería. 📸

Previsualización: Antes de subir, los usuarios pueden ver miniaturas de las fotos seleccionadas. 🖼️

Eliminar Fotos: Si el usuario cambia de opinión, puede eliminar fotos antes de subirlas. 🗑️

Galería de Fotos: Todas las fotos subidas se muestran en una galería organizada. 🎞️

Diseño Responsivo: La aplicación se ve y funciona bien en dispositivos móviles y de escritorio. 📱💻

🛠️ Tecnologías Utilizadas
Next.js: Framework de React para renderizado del lado del servidor y generación de sitios estáticos. ⚛️

Tailwind CSS: Framework de CSS para estilos rápidos y personalizables. 🎨

Clerk: Autenticación de usuarios fácil y segura. 🔐

AWS S3: Almacenamiento de las fotos subidas en la nube. ☁️

Lucide Icons: Íconos modernos y elegantes para la interfaz de usuario. 🖍️

🚀 Cómo Ejecutar el Proyecto en Local
Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

Clona el Repositorio:
git clone https://github.com/nicolasmartin89/boda-anto-seba.git
cd boda-anto-seba

Instala las Dependencias:
npm install
o
yarn install

Configura las Variables de Entorno:
Crea un archivo .env.local en la raíz del proyecto y agrega las siguientes variables:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=tu_clave_publica_de_clerk
CLERK_SECRET_KEY=tu_clave_secreta_de_clerk
AWS_ACCESS_KEY_ID=tu_access_key_id_de_aws
AWS_SECRET_ACCESS_KEY=tu_secret_access_key_de_aws
AWS_REGION=tu_region_de_aws
AWS_BUCKET_NAME=nombre_de_tu_bucket_s3

Clerk: Obtén tus claves desde el dashboard de Clerk.

AWS S3: Configura un bucket en S3 y obtén tus credenciales de AWS.

Ejecuta el Proyecto:
npm run dev
o
yarn dev

La aplicación estará disponible en http://localhost:3000.

🌍 Variables de Entorno
Variable Descripción
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY Clave pública de Clerk para la autenticación.
CLERK_SECRET_KEY Clave secreta de Clerk para la autenticación.
AWS_ACCESS_KEY_ID Access Key ID de AWS para acceder a S3.
AWS_SECRET_ACCESS_KEY Secret Access Key de AWS para acceder a S3.
AWS_REGION Región de AWS donde está configurado tu bucket S3.
AWS_BUCKET_NAME Nombre del bucket S3 donde se almacenarán las fotos.
📂 Estructura del Proyecto
/components: Componentes reutilizables de la aplicación.

/pages: Rutas de la aplicación (Next.js).

/public: Archivos estáticos como imágenes y íconos.

/styles: Estilos globales y personalizados.

/api: Endpoints de la API para interactuar con AWS S3.

🤝 Contribuir
Si deseas contribuir a este proyecto, ¡eres bienvenido! Sigue estos pasos:

Haz un fork del repositorio.

Crea una rama con tu feature o corrección: git checkout -b mi-feature.

Haz commit de tus cambios: git commit -m 'Añadir nueva feature'.

Haz push a la rama: git push origin mi-feature.

Abre un Pull Request y describe tus cambios.

¡Gracias por visitar el repositorio! Esperamos que disfrutes usando la galería de fotos para la boda de Anto y Seba. 💖
