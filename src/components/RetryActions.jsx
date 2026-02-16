"use client";

import { useRouter } from "next/navigation";

export default function RetryActions() {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-2">
      <button
        type="button"
        onClick={() => router.back()}
        className="cyber-btn"
        aria-label="Go back"
      >
        &lt; GO BACK
      </button>

      <button
        type="button"
        onClick={() => location.reload()}
        className="cyber-btn cyber-btn-red"
        aria-label="Retry"
      >
        ↻ RETRY
      </button>
    </div>
  );
}