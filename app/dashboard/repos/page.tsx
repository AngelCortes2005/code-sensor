import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { createOctokit } from "@/lib/github";

export default async function ReposPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div className="p-8">No estás autenticado.</div>;
  }

  const token = session.accessToken;

  if (!token) {
    return <div className="p-8">No se encontró un token de acceso de GitHub.</div>;
  }

  const octokit = createOctokit(token);

  const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
    per_page: 100,
    sort: "updated",
  });

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">Tus Repositorios</h1>

      <ul className="space-y-4">
        {repos.map((repo) => (
          <li
            key={repo.id}
            className="border rounded-lg p-4 hover:bg-gray-800 transition"
          >
            <h2 className="font-semibold text-lg">{repo.name}</h2>
            <p className="text-gray-500 text-sm">
              {repo.description || "Sin descripción"}
            </p>

            <button
              className="mt-3 px-4 py-2 text-sm bg-black text-white rounded"
            >
              Analizar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
