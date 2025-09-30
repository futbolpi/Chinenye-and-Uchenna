"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  updateInviteSchema,
  UpdateInviteSchema,
} from "@/lib/validations/invites";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { updateInvite } from "@/actions/invites/update-invite";

interface InviteUpdateFormProps {
  postAction: () => void;
  defaultValues: {
    type: "SINGLE_USE" | "UNLIMITED";
    guestName: string;
    phoneHash?: string | undefined;
    id: string;
  };
}

const InviteUpdateForm = ({
  postAction,
  defaultValues,
}: InviteUpdateFormProps) => {
  const [isLoading, startTransition] = useTransition();

  const form = useForm<UpdateInviteSchema>({
    resolver: zodResolver(updateInviteSchema),
    defaultValues,
  });

  const type = form.watch("type");

  const handleSubmit = (data: UpdateInviteSchema) => {
    startTransition(async () => {
      try {
        const response = await updateInvite(data);

        if (response.success) {
          toast.success(
            response?.data?.message || "Invite was updated successfully"
          );
          postAction();
        } else {
          toast.error(response.error || "Failed to update invite");
          console.error("Failed to update invite");
        }
      } catch (error) {
        console.error("Error updating invite:", error);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Name Input */}
        <FormField
          control={form.control}
          name="guestName"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-foreground">
                Guest Name or Group
              </FormLabel>
              <FormControl>
                <Input
                  className="border-border/50 focus:border-primary"
                  placeholder="e.g., Smith Family, John & Jane Doe"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Invite Type Selection */}

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Invitation Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col"
                >
                  <FormItem className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="UNLIMITED" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Unlimited Access
                      </FormLabel>
                    </div>
                    <FormDescription>
                      No phone verification required. Can be used multiple
                      times.
                    </FormDescription>
                  </FormItem>
                  <FormItem className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="SINGLE_USE" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Single Use with Verification
                      </FormLabel>
                    </div>
                    <FormDescription>
                      Requires phone verification. Can only be used once.
                    </FormDescription>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number Input (conditional) */}
        {type === "SINGLE_USE" && (
          <FormField
            control={form.control}
            name="phoneHash"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-foreground">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-border/50 focus:border-primary"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This phone number will be required for verification
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isLoading ? "Updating..." : "Update Invitation"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InviteUpdateForm;
