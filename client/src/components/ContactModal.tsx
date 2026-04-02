import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ContactForm from "./ContactForm";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none bg-white rounded-3xl">
        <div className="p-8">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-3xl font-semibold tracking-tight text-gray-900">
              Vamos Conversar?
            </DialogTitle>
            <DialogDescription className="text-gray-500 text-lg mt-2">
              Preencha o formulário abaixo e entraremos em contacto em breve.
            </DialogDescription>
          </DialogHeader>

          <ContactForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
