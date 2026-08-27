"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaCheckCircle, FaTimesCircle, FaFeatherAlt, FaBookOpen } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import { ApiError } from "@/lib/api";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { loading: authLoading, isAuthenticated, refreshUser } = useAuth();
  const api = useApi();

  const [state, setState] = useState({ status: "loading", result: null, message: "" });
  const attempted = useRef(false);

  useEffect(() => {
    if (authLoading || attempted.current) return;

    if (!sessionId) {
      setState({ status: "error", message: "This payment link is missing a session ID." });
      return;
    }
    if (!isAuthenticated) {
      setState({
        status: "error",
        message: "Your session expired. Please sign in to confirm this payment.",
      });
      return;
    }

    attempted.current = true;

    api
      .post("/payments/confirm", { sessionId })
      .then(async (data) => {
        if (data.purchase) {
          setState({ status: "purchase", result: data.purchase });
        } else if (data.transaction?.type === "publishing_fee") {
          await refreshUser();
          setState({ status: "writer", result: data.transaction });
        } else if (data.transaction?.type === "purchase") {
          setState({ status: "generic-purchase", result: data.transaction });
        } else {
          setState({ status: "generic", result: data });
        }
      })
      .catch((err) => {
        setState({
          status: "error",
          message: err instanceof ApiError ? err.message : "Could not confirm your payment.",
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, isAuthenticated, sessionId]);

  if (authLoading || state.status === "loading") {
    return <LoadingSpinner fullScreen size="lg" label="Confirming your payment..." />;
  }

  if (state.status === "error") {
    return (
      <Card icon={<FaTimesCircle className="text-rose-400" />} title="Payment Confirmation Failed">
        <p className="mt-3 text-gray-400">{state.message}</p>
        <Actions>
          <Link
            href="/"
            className="rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Back to Home
          </Link>
        </Actions>
      </Card>
    );
  }

  if (state.status === "purchase") {
    return (
      <Card icon={<FaCheckCircle className="text-emerald-400" />} title="Purchase Complete!">
        <p className="mt-3 text-gray-400">
          You now own <span className="text-white">{state.result.ebookTitle}</span>. It&apos;s
          waiting for you in your dashboard.
        </p>
        <Actions>
          <Link
            href={`/ebooks/${state.result.ebookId}`}
            className="rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            <FaBookOpen className="mr-2 inline" /> View Ebook
          </Link>
          <Link
            href="/dashboard/user/purchased"
            className="rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Go to Dashboard
          </Link>
        </Actions>
      </Card>
    );
  }

  if (state.status === "writer") {
    return (
      <Card icon={<FaFeatherAlt className="text-violet-400" />} title="You're a Verified Writer!">
        <p className="mt-3 text-gray-400">
          Your writer verification payment was successful. You can now publish and manage your
          own ebooks.
        </p>
        <Actions>
          <Link
            href="/dashboard/writer/add"
            className="rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Publish Your First Ebook
          </Link>
        </Actions>
      </Card>
    );
  }

  return (
    <Card icon={<FaCheckCircle className="text-emerald-400" />} title="Payment Confirmed">
      <p className="mt-3 text-gray-400">
        Your payment was processed successfully.
      </p>
      <Actions>
        <Link
          href="/dashboard"
          className="rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
        >
          Go to Dashboard
        </Link>
      </Actions>
    </Card>
  );
}

function Card({ icon, title, children }) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-3xl">
        {icon}
      </div>
      <h1 className="mt-5 text-2xl font-bold text-white">{title}</h1>
      {children}
    </div>
  );
}

function Actions({ children }) {
  return <div className="mt-7 flex flex-wrap items-center justify-center gap-3">{children}</div>;
}
