import { Suspense } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import PaymentSuccessClient from "./PaymentSuccessClient";

export const metadata = {
  title: "Payment Confirmation - Fable",
};

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816] px-4">
      <Suspense fallback={<LoadingSpinner size="lg" />}>
        <PaymentSuccessClient />
      </Suspense>
    </div>
  );
}
