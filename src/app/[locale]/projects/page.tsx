import { getTranslations } from "next-intl/server";

export default async function ProjectsPage() {
  const t = await getTranslations("Pages");

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-10">
      <h1 className="text-2xl font-semibold text-[#555]">{t("projectsTitle")}</h1>
    </main>
  );
}
