"use client";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { signInSchema } from "@/schema/sign-in";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { IsEmailSentComponent } from "./email-sent-component";

export default function SignInPage() {
  const [pending, startTransition] = useTransition();
  const [magicPending, magicTransition] = useTransition();
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleProvider() {
    return startTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        fetchOptions: {
          onError() {
            toast.error("Faild to sign in to you account");
          },
        },
      });
    });
  }

  function handleMagicLink() {
    magicTransition(async () => {
      try {
        const validate = signInSchema.safeParse(inputValue);

        if (!validate.success) {
          toast.error("Provide a valid email and name");
          setError("Email and name is required");
          return;
        }

        await authClient.signIn.magicLink({
          email: validate.data.email, // required
          name: validate.data.name,
          callbackURL: "/dashboard",
          fetchOptions: {
            onError() {
              toast.error("Faild to sign in to you account");
            },
            onSuccess() {
              toast.success(`Verification link has been sent to your email.`);
              setEmailSent((prev) => !prev);
            },
          },
        });
      } catch {
        toast.error("Failed to send link");
      }
    });
  }

  return (
    <>
      {emailSent ? (
        <IsEmailSentComponent onChange={setEmailSent} />
      ) : (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
          <form
            action=""
            className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
          >
            <div className="p-8 pb-6">
              <div>
                <Logo size="md" />

                <h1 className="mb-1 mt-4 text-xl font-semibold">
                  Sign In to universal prime capital
                </h1>
                <p className="text-sm">Welcome back! Sign in to continue</p>
              </div>

              <div className="mt-6 ">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={pending || magicPending}
                  onClick={handleProvider}
                >
                  {pending ? (
                    <Loader2 className="animate-spin size-4" />
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="0.98em"
                        height="1em"
                        viewBox="0 0 256 262"
                      >
                        <path
                          fill="#4285f4"
                          d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                        ></path>
                        <path
                          fill="#34a853"
                          d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                        ></path>
                        <path
                          fill="#fbbc05"
                          d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                        ></path>
                        <path
                          fill="#eb4335"
                          d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                        ></path>
                      </svg>
                    </>
                  )}
                  <span>Google</span>
                </Button>
              </div>

              <hr className="my-4 border-dashed" />

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="block text-sm">
                    Email
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    required
                    id="email"
                    placeholder="you@example.com"
                    value={inputValue.email}
                    onChange={handleChange}
                  />

                  <Label htmlFor="email" className="block text-sm">
                    Name
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    required
                    id="name"
                    placeholder="john doe"
                    value={inputValue.name}
                    onChange={handleChange}
                  />
                </div>

                <p className="text-red-400 font-semibold text-sm">{error}</p>
                <Button
                  className="w-full bg-primary text-muted"
                  onClick={handleMagicLink}
                  disabled={pending || magicPending}
                >
                  {magicPending ? "Signing in..." : "Sign In"}
                </Button>
              </div>
            </div>

            <div className="bg-muted rounded-(--radius) border p-3">
              <p className="text-accent-foreground text-center text-sm">
                All right reserved by Anchorpoint partners
              </p>
            </div>
          </form>
        </section>
      )}
    </>
  );
}
