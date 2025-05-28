import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import SignUpClinicForm from "./components/sign-up-clinic-form";

const ClinicFormPage = () => {
  return (
    <Dialog open>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar clínica</DialogTitle>
          <DialogDescription>
            Adicione uma clínica para começar a usar o sistema.
          </DialogDescription>
        </DialogHeader>
        <SignUpClinicForm />
      </DialogContent>
    </Dialog>
  );
};

export default ClinicFormPage;
