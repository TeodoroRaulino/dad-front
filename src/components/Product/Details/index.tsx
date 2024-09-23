import { useState, useEffect } from "react";
import Image from "next/image";
import { Label } from "@/ui/label";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/ui/select";
import { Button } from "@/ui/button";
import { ProductProps } from "@/types/Product";
import { ProductModelProps } from "@/types/ProductModel";
import { useCartStore } from "@/stores/cart";

interface ProductPageProps {
  product: ProductProps;
  product_models: ProductModelProps[];
}

export const Details: React.FC<ProductPageProps> = ({
  product,
  product_models,
}) => {
  const [selectedModel, setSelectedModel] = useState<ProductModelProps | null>(
    product_models[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);

  const getCartQuantity = (modelId: number) => {
    const existingItem = cartItems.find((item) => item.id === modelId);
    return existingItem ? existingItem.quantity : 0;
  };

  const handleModelChange = (modelId: string) => {
    const model = product_models.find((m) => m.id === parseInt(modelId));
    setSelectedModel(model || null);
    setQuantity(1);
  };

  const handleQuantityChange = (value: string) => {
    setQuantity(parseInt(value));
  };

  const addToCart = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedModel) {
      const currentCartQuantity = getCartQuantity(selectedModel.id);
      const totalQuantity = Math.min(quantity + currentCartQuantity, 3);

      addItem({
        id: selectedModel.id,
        name: product.name,
        description: selectedModel.description,
        price: selectedModel.price,
        quantity: totalQuantity - currentCartQuantity,
      });
    }
  };
  useEffect(() => {
    setQuantity(1);
  }, [selectedModel]);

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4">
        <Image
          src="/smartwatch.jpg"
          alt={product.name}
          width={600}
          height={900}
          className="aspect-[3/3] object-cover border w-full rounded-lg overflow-hidden"
        />
      </div>
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-4">
          <h1 className="font-bold text-3xl lg:text-4xl">{product.name}</h1>
          <div>
            <p>Categoria: {product.category}</p>
          </div>
          <div className="text-4xl font-bold">
            ${selectedModel ? selectedModel.price.toFixed(2) : "---"}
          </div>
        </div>
        <form className="grid gap-4 md:gap-10">
          <div className="grid gap-2">
            <Label htmlFor="model" className="text-base">
              Modelo
            </Label>
            <RadioGroup
              id="model"
              onValueChange={handleModelChange}
              className="flex flex-col gap-2"
              value={selectedModel?.id.toString()}
            >
              {product_models.map((model) => (
                <Label
                  key={model.id}
                  htmlFor={`model-${model.id}`}
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
                >
                  <RadioGroupItem
                    id={`model-${model.id}`}
                    value={model.id.toString()}
                  />
                  {model.description} - ${model.price.toFixed(2)}
                </Label>
              ))}
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantity" className="text-base">
              Quantidade
            </Label>
            {selectedModel && getCartQuantity(selectedModel.id) >= 3 ? (
              <p className="text-red-500">
                Você já tem o limite máximo no carrinho
              </p>
            ) : (
              <Select
                value={quantity.toString()}
                onValueChange={handleQuantityChange}
                disabled={!selectedModel || selectedModel.quantity === 0}
              >
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {selectedModel &&
                    Array.from(
                      {
                        length: Math.min(
                          selectedModel.quantity,
                          3 - getCartQuantity(selectedModel.id)
                        ),
                      },
                      (_, i) => i + 1
                    ).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <Button
            size="lg"
            onClick={addToCart}
            disabled={!selectedModel || selectedModel.quantity === 0}
          >
            Adicionar ao carrinho
          </Button>
        </form>
      </div>
    </div>
  );
};
