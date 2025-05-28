"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createClinic } from "@/actions/create-clinic";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const clinicFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "O nome da clínica deve ter pelo menos 3 caracteres" }),
});

const SignUpClinicForm = () => {
  const clinicForm = useForm<z.infer<typeof clinicFormSchema>>({
    resolver: zodResolver(clinicFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onClinicFormSubmit = async (data: z.infer<typeof clinicFormSchema>) => {
    try {
      await createClinic(data.name);
    } catch (error) {
      if (isRedirectError(error)) {
        return;
      }

      console.error(error);
      toast.error("Erro ao criar clínica");
    }
  };

  return (
    <Form {...clinicForm}>
      <form onSubmit={clinicForm.handleSubmit(onClinicFormSubmit)}>
        <FormField
          control={clinicForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da clínica</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Digite o nome da clínica"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-4">
          <Button
            className="w-full"
            disabled={clinicForm.formState.isSubmitting}
            type="submit"
          >
            {clinicForm.formState.isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Criar clínica"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default SignUpClinicForm;
