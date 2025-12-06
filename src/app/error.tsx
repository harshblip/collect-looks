'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import { Button } from "@/components/ui/button"; // Assuming you have shadcn/ui
import { useRouter } from 'next/navigation';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {

    useEffect(() => {
        // Log the error to an error reporting service like Sentry or Datadog
        console.error("Global Error Captured:", error);
    }, [error]);

    const router = useRouter()

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-gray-50 text-center">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    Something went wrong!
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    We apologize for the inconvenience. Our team has been notified.
                </p>
            </div>

            <div className="flex gap-4">
                {/* Attempt to recover by trying to re-render the segment */}
                <Button onClick={() => reset()} variant="default">
                    Try Again
                </Button>
                <Button onClick={() => router.back()} variant="outline">
                    Go Home
                </Button>
            </div>

            <div className="mt-8 max-w-lg rounded-md bg-red-100 p-4 text-left text-sm text-red-800 font-mono overflow-auto">
                {error.message}
            </div>
        </div>
    );
}