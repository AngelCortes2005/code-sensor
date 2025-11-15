import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DashboardPage = async () => {
    const session = await getServerSession(authOptions);

  if (!session) {
    return <div className="flex items-center justify-center h-screen">
      <p className="text-lg">No has iniciado sesión.</p>
    </div>;
  }

  const user = session?.user;

  return (
    <div className="p-8 space-y-8">
      {/* HEADER DEL DASHBOARD */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Hola, {user?.name}</h1>
          <p className="text-sm text-gray-500">
            Bienvenido a tu panel de análisis inteligente
          </p>
        </div>

        {/* Imagen del avatar */}
        <Image
          src={user?.image || "/avatar-placeholder.png"}
          alt="Avatar"
          width={48}
          height={48}
          className="rounded-full"
        />
      </header>

      {/* TARJETAS DE NAVEGACIÓN */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Repositorios */}
        <Link
          href="/repos"
          className="p-6 border rounded-xl hover:bg-gray-50 transition"
        >
          <h2 className="text-lg font-semibold mb-1">📁 Mis Repositorios</h2>
          <p className="text-sm text-gray-500">
            Explora tus repos conectados a GitHub
          </p>
        </Link>

        {/* Historial */}
        <Link
          href="/history"
          className="p-6 border rounded-xl hover:bg-gray-50 transition"
        >
          <h2 className="text-lg font-semibold mb-1">📊 Historial</h2>
          <p className="text-sm text-gray-500">
            Revisa tus análisis anteriores
          </p>
        </Link>

        {/* Perfil */}
        <Link
          href="/profile"
          className="p-6 border rounded-xl hover:bg-gray-50 transition"
        >
          <h2 className="text-lg font-semibold mb-1">👤 Mi Perfil</h2>
          <p className="text-sm text-gray-500">
            Ajustes de cuenta y preferencias
          </p>
        </Link>
      </section>
    </div>
  );
};

export default DashboardPage;
