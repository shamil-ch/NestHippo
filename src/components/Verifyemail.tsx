"use client"

import { trpc } from "@/trpc/client"
import { Loader2, XCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "./ui/button"

interface verifyEmailProps {
    token: string
}

const Verifyemail = ({ token } : verifyEmailProps) => {
    const { data, isLoading, isError } = 
        trpc.auth.verifyEmail.useQuery({
            token,
        })

        if(isError) {
            return <div className="flex flex-col items-center gap-2">
                <XCircle className="h-8 w-8 text-red-600"/>
                <h3 className="font-semibold text-xl">There was a problem</h3>
                <p className="text-muted-foreground text-sm">
                    This token is not valid or might be expired.
                    please try again.
                </p>
            </div>
        }

        if(data?.success) {
            return (
                <div className="flex flex-col h-full items-center justify-center">
                    <div className="relative mb-4 h-60 w-60 text-muted-foreground">
                        <Image 
                            src="/hippo-email-sent.png"
                            fill
                            alt="hippo email sent" 
                        />
                    </div>

                    <h3 className="font-semibold text-2xl">You&apos;re all set!</h3>

                    <p className="text-muted-foreground text-center mt-1">
                        Thank You for Verfying your email
                    </p>

                    <Link 
                        className={buttonVariants({ 
                            className: 'mt-4' 
                        })} 
                        href="/sign-in"
                    >
                            Sign in
                    </Link>
                </div>
            )
        }

        if(isLoading) {
            return (
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="aniate-spin h-8 w-8 text-zinc-300"/>
                    <h3 className="font-semibold text-xl">
                        Verfying....
                    </h3>
                    <p className="text-muted-foreground text-sm">
                        This won&apos;t take long
                    </p>
                </div>
            )
        }
}

export default Verifyemail