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

type Props = {
  mutate: () => void;
};

const ProductCreate: React.FC<Props> = ({ mutate }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Produto
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto w-full md:max-w-[760px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Produto</DialogTitle>
        </DialogHeader>
        <ProductForm mutate={mutate} />
      </DialogContent>
    </Dialog>
  );
};

export default ProductCreate;
