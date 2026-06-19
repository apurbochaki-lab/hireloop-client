import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { createSubscription } from "@/lib/actions/subscriptions";

export default async function SuccessPage({ searchParams }) {
    const { session_id } = await searchParams;

    if (!session_id) {
        throw new Error("Please provide a valid session_id (`cs_test_...`)");
    }

    const {
        status,
        customer_details: { email: customerEmail },
        metadata
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["line_items", "payment_intent"],
    });

    if (status === "open") {
        return redirect("/");
    }

    if (status === "complete") {

        // When payment complete
        const subInfo = {
            userEmail : customerEmail,
            planId: metadata.planId
        }

        const result = await createSubscription(subInfo);
        console.log(result)

        return (
            <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4">
                <div className="w-full max-w-2xl">
                    <div className="rounded-3xl border bg-content1 p-10 shadow-2xl text-center">
                        {/* Success Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="rounded-full bg-success/10 p-4">
                                <CheckCircle className="h-20 w-20 text-success" />
                            </div>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl font-bold mb-3">
                            Payment Successful 🎉
                        </h1>

                        <p className="text-default-500 text-lg mb-8">
                            Thank you for your purchase. Your payment has been processed
                            successfully.
                        </p>

                        {/* Email Box */}
                        <div className="rounded-2xl bg-default-100 p-5 mb-8">
                            <p className="text-sm text-default-500 mb-1">
                                Confirmation Email Sent To
                            </p>
                            <p className="font-semibold text-lg">
                                {customerEmail}
                            </p>
                        </div>

                        {/* Info */}
                        <div className="space-y-2 text-default-500 mb-8">
                            <p>
                                A receipt and order confirmation have been sent to your email.
                            </p>
                            <p>
                                If you have any questions, contact our support team anytime.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/dashboard/recruiter"
                                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
                            >
                                Go to Dashboard
                            </Link>

                            <Link
                                href="/"
                                className="px-6 py-3 rounded-xl border font-medium hover:bg-default-100 transition"
                            >
                                Back to Home
                            </Link>
                        </div>

                        {/* Footer */}
                        <div className="mt-10 pt-6 border-t">
                            <p className="text-sm text-default-400">
                                Need help? Contact{" "}
                                <a
                                    href="mailto:support@yourdomain.com"
                                    className="text-primary font-medium"
                                >
                                    support@yourdomain.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}