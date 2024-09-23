"use client";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";
import * as yup from "yup";
import { useFormik } from "formik";
import { ProductCompleteProps } from "@/types/Product";
import { Combobox } from "@/components";
import { useState } from "react";

const categories = [
  { value: "electronics", label: "Eletrônicos" },
  { value: "computers", label: "Computadores" },
  { value: "smartphones", label: "Smartphones" },
];

interface ProductFormProps {
  data?: ProductCompleteProps;
}

export default function ProductForm({ data }: ProductFormProps) {
  const isEdit = Boolean(data);

  const [models, setModels] = useState(
    data?.product_models || [{ price: 0, description: "", quantity: 0 }]
  );

  const schema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    category: yup.string().required("Categoria é obrigatória"),
    models: yup
      .array()
      .of(
        yup.object().shape({
          price: yup.number().required("Preço é obrigatório").min(0),
          description: yup.string().required("Descrição é obrigatória"),
          quantity: yup.number().required("Quantidade é obrigatória").min(0),
        })
      )
      .min(1, "Adicione pelo menos um modelo"),
  });

  const formik = useFormik({
    initialValues: {
      name: data?.product.name || "",
      category: data?.product.category || "",
      models: data?.product_models || [
        { price: 0, description: "", quantity: 0 },
      ],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (isEdit) {
        console.log("Updating product:", values);
      } else {
        console.log("Creating product:", values);
      }
    },
  });

  const handleAddModel = () => {
    setModels([...models, { price: 0, description: "", quantity: 0 }]);
    formik.setFieldValue("models", [
      ...models,
      { price: 0, description: "", stock: 0 },
    ]);
  };

  const handleRemoveModel = (index: number) => {
    const updatedModels = models.filter((_, i) => i !== index);
    setModels(updatedModels);
    formik.setFieldValue("models", updatedModels);
  };

  const { values, handleChange, handleSubmit, errors, touched } = formik;
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {isEdit ? "Editar Produto" : "Cadastro de Produto"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Produto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nome do Produto</Label>
              <Input
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              {touched.name && errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="category">Categoria</Label>
              <Combobox.Base
                value={values.category}
                handleChange={(value) => {
                  formik.setFieldValue("category", value);
                }}
                options={categories}
                placeholder="Selecione uma categoria"
              />
              {touched.category && errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {models.map((model, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Modelo {index + 1}
                {index > 0 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemoveModel(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor={`models.${index}.price`}>Preço</Label>
                <Input
                  id={`models.${index}.price`}
                  name={`models.${index}.price`}
                  type="number"
                  value={values.models[index].price}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor={`models.${index}.description`}>Descrição</Label>
                <Textarea
                  id={`models.${index}.description`}
                  name={`models.${index}.description`}
                  value={values.models[index].description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor={`models.${index}.quantity`}>Quantidade</Label>
                <Input
                  id={`models.${index}.quantity`}
                  name={`models.${index}.quantity`}
                  type="number"
                  value={values.models[index].quantity}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          type="button"
          variant="outline"
          className="flex items-center"
          onClick={handleAddModel}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Adicionar Modelo
        </Button>

        <Button type="submit" className="w-full">
          {isEdit ? "Atualizar Produto" : "Cadastrar Produto"}
        </Button>
      </form>
    </div>
  );
}
