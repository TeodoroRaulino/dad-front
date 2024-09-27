"use client";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";
import * as yup from "yup";
import { useFormik } from "formik";
import { ModelForCreate, ProductCategoriesProps } from "@/types/Product";
import { Combobox, FileInput, Spinner } from "@/components";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { createProduct, getAwsUploadLink } from "@/services/api/product";
import { toast } from "sonner";

interface Model {
  price: number;
  description: string;
  quantity: number;
  files: File[];
}

type Props = {
  mutate: () => void;
  onClose: () => void;
};

export default function ProductForm({ mutate, onClose }: Props) {
  const { data: categories } = useFetch<ProductCategoriesProps>(
    "categories",
    {}
  );

  const [isLoading, setIsLoading] = useState(false);

  const [categoriesOptions, setCategories] = useState<
    { value: string; label: string }[]
  >([]);

  const [newCategory, setNewCategory] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  const [models, setModels] = useState<Model[]>([
    { price: 0, description: "", quantity: 0, files: [] },
  ]);

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
      name: "",
      category: "",
      models: [{ price: 0, description: "", quantity: 0, files: [] }],
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await handleCreateProduct(values);
    },
  });

  const handleCreateProduct = async (values: {
    name: string;
    category: string;
    models: Model[];
  }) => {
    setIsLoading(true);
    try {
      const modelsForCreate: ModelForCreate[] = await Promise.all(
        values.models.map(async (model) => {
          const image_key = await uploadFileToS3(model.files[0]);
          return { ...model, image_key };
        })
      );

      const data = {
        name: values.name,
        category: values.category,
        product_models: modelsForCreate,
      };

      await createProduct(data);
      mutate();
      onClose();
      formik.resetForm();
    } catch (error) {
      toast.error("Erro ao cadastrar produto");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddModel = () => {
    const updatedModels = [
      ...formik.values.models,
      { price: 0, description: "", quantity: 0, files: [] },
    ];
    setModels(updatedModels);
    formik.setFieldValue("models", updatedModels);
  };

  const handleRemoveModel = (index: number) => {
    const updatedModels = models.filter((_, i) => i !== index);
    setModels(updatedModels);
    formik.setFieldValue("models", updatedModels);
  };

  const handleAddNewCategory = () => {
    if (newCategory.trim() !== "") {
      const newCategoryOption = {
        value: newCategory.toLowerCase(),
        label: newCategory,
      };
      setCategories([...categoriesOptions, newCategoryOption]);
      formik.setFieldValue("category", newCategoryOption.value);
      setNewCategory("");
      setShowNewCategoryInput(false);
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const selectedFiles = event.target.files
      ? Array.from(event.target.files)
      : [];

    setModels((prev) =>
      prev.map((model, i) =>
        i === index ? { ...model, files: selectedFiles } : model
      )
    );

    formik.setFieldValue(`models.${index}.files`, selectedFiles);
  };

  const uploadFileToS3 = async (file: File): Promise<string> => {
    const fileName = file.name;
    const mimeType = file.type;

    const { key, url } = await getAwsUploadLink(fileName);

    const newFile = new File([file], key, { type: mimeType });

    const blob = new Blob([newFile as BlobPart], { type: mimeType });

    const s3Response = await fetch(url, {
      method: "PUT",
      body: blob,
    });

    if (s3Response.ok) {
      return key;
    } else {
      toast.error("Erro ao enviar arquivo para o S3");
      throw new Error("Erro ao enviar arquivo para o S3");
    }
  };

  useEffect(() => {
    if (categories) {
      const categoriesOptions = categories.categories.map((category) => ({
        value: category,
        label: category,
      }));
      setCategories(categoriesOptions);
    }
  }, [categories]);

  const { values, handleChange, handleSubmit, errors, touched } = formik;
  console.log("values", values);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{"Cadastro de Produto"}</h1>
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
                options={categoriesOptions}
                placeholder="Selecione uma categoria"
              />
              {touched.category && errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}

              {!showNewCategoryInput ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNewCategoryInput(true)}
                  className="mt-2"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar Nova Categoria
                </Button>
              ) : (
                <div className="flex items-center space-x-2 mt-2">
                  <Input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Nova categoria"
                    className="flex-grow"
                  />
                  <Button type="button" onClick={handleAddNewCategory}>
                    Adicionar
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {models.map((_, index) => (
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
                  value={values.models[index]?.price || 0}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor={`models.${index}.description`}>Descrição</Label>
                <Textarea
                  id={`models.${index}.description`}
                  name={`models.${index}.description`}
                  value={values.models[index]?.description || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor={`models.${index}.quantity`}>Quantidade</Label>
                <Input
                  id={`models.${index}.quantity`}
                  name={`models.${index}.quantity`}
                  type="number"
                  value={values.models[index]?.quantity || 0}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Arquivos</Label>
                <FileInput
                  id={`models.${index}.files`}
                  onChange={(e) => handleFileChange(e, index)}
                  showFileSelected
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          type="button"
          variant="outline"
          className="flex items-center w-full"
          onClick={handleAddModel}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Adicionar Modelo
        </Button>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {"Cadastrar Produto"}
          {isLoading && <Spinner.Base />}
        </Button>
      </form>
    </div>
  );
}
