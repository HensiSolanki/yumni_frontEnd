"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/footer/index";
import { Link } from "@/i18n/navigation";

export default function RegisterPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1280px] px-[7px] py-16 min-[641px]:px-[32px] lg:px-[110px]">
        <section className="rounded-xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-neutral-900">Create your account</h1>
          <p className="mt-3 text-sm text-neutral-600">
            Registration form will be available here shortly.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-white transition hover:brightness-105"
          >
            Go to login
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
