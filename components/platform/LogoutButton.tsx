"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const res = await fetch("/api/logout", {
      method: "POST",
    });

    const result = await res.json();

    if (!res.ok) {
      toast.error(result.error);
      return;
    }

    toast.success(result.message);

    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="hidden text-sm font-medium text-zinc-600 transition hover:text-zinc-900 sm:block cursor-pointer"
    >
      Sair
    </button>
  );
}