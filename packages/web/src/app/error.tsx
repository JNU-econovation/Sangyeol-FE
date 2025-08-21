"use client";

import { useEffect } from "react";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-white text-gray-800">
      <h2 className="text-2xl font-bold">앗, 문제가 발생했어요!</h2>
      <p className="mt-4 text-gray-600">
        페이지를 다시 로드하거나 나중에 다시 시도해 주세요.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 px-4 py-2 bg-main-green text-white rounded"
      >
        다시 시도하기
      </button>
      <p className="mt-2 text-sm text-gray-500">
        {error.message || "오류가 발생했습니다. 다시 시도해 주세요."}
      </p>
      {error.digest && (
        <p className="mt-2 text-xs text-gray-400">오류 코드: {error.digest}</p>
      )}
    </div>
  );
}
