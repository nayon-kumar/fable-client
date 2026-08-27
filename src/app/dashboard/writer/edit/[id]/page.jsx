"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaBook } from "react-icons/fa";
import RequireRole from "@/components/auth/RequireRole";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import EbookForm from "@/components/dashboard/EbookForm";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";

function EditEbookInner({ id }) {
  const { user } = useAuth();
  const api = useApi();
  const router = useRouter();
  const [ebook, setEbook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    let cancelled = false;
    api
      .get(`/ebooks/${id}`)
      .then((data) => {
        if (cancelled) return;
        if (data.writerEmail !== user.email) setForbidden(true);
        else setEbook(data);
      })
      .catch(() => !cancelled && setForbidden(true))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user.email]);

  if (loading) return <LoadingSpinner fullScreen size="lg" />;

  if (forbidden || !ebook) {
    return (
      <EmptyState
        icon={FaBook}
        title="Ebook not found"
        description="This ebook doesn't exist or you don't have permission to edit it."
        action={
          <button
            onClick={() => router.push("/dashboard/writer")}
            className="rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Back to Manage Ebooks
          </button>
        }
      />
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white md:text-3xl">Edit Ebook</h1>
      <p className="mb-8 mt-1 text-gray-400">Update your ebook&apos;s details.</p>
      <EbookForm
        mode="edit"
        ebookId={id}
        initialValues={{
          title: ebook.title,
          description: ebook.description,
          price: ebook.price,
          genre: ebook.genre,
          coverImage: ebook.coverImage,
        }}
      />
    </div>
  );
}

export default function EditEbookPage({ params }) {
  const { id } = use(params);
  return (
    <RequireRole role="writer">
      <EditEbookInner id={id} />
    </RequireRole>
  );
}
