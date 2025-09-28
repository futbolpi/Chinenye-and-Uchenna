"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Phone, CheckCircle, Loader2 } from "lucide-react";
import { useQueryStates } from "nuqs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { verifyInvitePhone } from "@/actions/verify-invite-phone";
import { inviteParamsParsers } from "../searchparams";

const phoneSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

interface PhoneVerificationFormProps {
  inviteId: string;
  guestName: string;
}

export function PhoneVerificationForm({
  inviteId,
  guestName,
}: PhoneVerificationFormProps) {
  const [isPending, startTransition] = useTransition();

  const [{ phoneNumber }, setParams] = useQueryStates(inviteParamsParsers);

  const form = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber,
    },
  });

  const handleVerification = (values: z.infer<typeof phoneSchema>) => {
    startTransition(async () => {
      const result = await verifyInvitePhone({
        ...values,
        inviteId,
      });

      if (result.success) {
        toast.success(result.data?.message || "Verification successful!");
        // add phone number to params
        // Refresh the page to show wedding details
        setParams(values, { shallow: false, startTransition });
      } else {
        toast.error(result.error || "Verification failed");
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-card)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
        }}
      >
        <CardHeader className="space-y-4">
          <CardTitle
            className="flex items-center gap-3 text-xl"
            style={{ color: "var(--color-foreground)" }}
          >
            <div
              style={{
                padding: "0.5rem",
                backgroundColor: "var(--color-muted)",
                borderRadius: "0.5rem",
              }}
            >
              <Phone
                className="h-5 w-5"
                style={{ color: "var(--color-primary)" }}
              />
            </div>
            Phone Verification Required
          </CardTitle>
          <CardDescription
            style={{ color: "var(--color-muted-foreground)" }}
            className="leading-relaxed"
          >
            Please enter your phone number to access the wedding details for{" "}
            <span
              className="font-semibold"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {guestName}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleVerification)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      style={{ color: "var(--color-foreground)" }}
                      className="font-medium"
                    >
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: "var(--color-background)",
                          color: "var(--color-foreground)",
                        }}
                        className="focus:border-primary focus:ring-primary"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 transition-all duration-200"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
                  color: "var(--color-primary-foreground)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                }}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Verify & Continue
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
