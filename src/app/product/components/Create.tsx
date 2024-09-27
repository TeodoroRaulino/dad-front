import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Plus } from "lucide-react";
import ProductForm from "./form";
import { useState } from "react";

type Props = {
  mutate: () => void;
};

const ProductCreate: React.FC<Props> = ({ mutate }) => {
  const [isOpen, setIsOpen] = useState(false);
  function handleClose() {
    setIsOpen(false);
  }
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleClose();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Adicionar Produto
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto w-full md:max-w-[760px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Produto</DialogTitle>
        </DialogHeader>
        <ProductForm mutate={mutate} onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ProductCreate;
