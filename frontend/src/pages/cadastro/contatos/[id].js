/* eslint-disable react-hooks/exhaustive-deps */
// Defaults
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

// Services
import api from "../../../services/api";

// Styles
import Layout from "../../../components/Layout";
import { alertDialog } from "../../../components/Helpers/Alert";
import {
  Form,
  Input,
  Button,
  Label,
  GroupInput,
  GroupButtons,
  Select,
  Error,
} from "../../../styles/form";

const Contatos = () => {
  // Variáveis auxilires
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [companyData, setCompanyData] = useState([]);
  const { id } = router.query;
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Consulta empresas
  const getCompanies = async () => {
    setIsLoading(true);
    const { data } = await api.get("/company");
    setCompanyData(data);
    setIsLoading(false);
  };

  // Ao abrir
  useEffect(() => {
    const handle = async () => {
      try {
        // Consulta empresas
        await getCompanies();

        // Verifica se é alteração ou edição
        if (!id) return;
        if (id === "novo") return;
        setIsLoading(true);

        // Consulta API
        const { data } = await api.get(`/contact/${id}`);

        // Title
        setTitle(data.name);

        // Preenche valores
        Object.keys(data).forEach((item) => {
          setValue(item, data[item]);
        });
      } catch (error) {
        alertDialog({
          type: "Alert",
          title: `Erro`,
          message: `Erro, por favor tente novamente`,
        });
      }
      setIsLoading(false);
    };
    handle();
  }, [id]);

  // Ao deletar
  const handleOnDelete = () => {
    alertDialog({
      type: "Confirm",
      title: `Deseja excluir o contato?`,
      message: `Não será possivel reverter.`,
      confirmAction: async () => {
        try {
          await api.delete(`/contact/${id}`);
          router.replace("/cadastro/contatos");
        } catch (error) {
          alertDialog({
            type: "Alert",
            title: "Ops... Algo deu errado.",
            message: error.response.data.message,
          });
        }
      },
    });
  };

  // Ao enviar
  const handleOnSubmit = async (data) => {
    try {
      if (id === "novo") await api.post(`/contact`, { ...data });
      else {
        await api.put(`/contact/${id}`, { ...data });
      }
      router.push("/cadastro/contatos");
    } catch (error) {
      alertDialog({
        type: "Alert",
        title: `Erro`,
        message: `Erro, tente novamente`,
      });
    }
  };

  return (
    <Layout
      title={title ? `Contato: ${title}` : "Novo Contato"}
      loading={isLoading}
    >
      <Form onSubmit={handleSubmit(handleOnSubmit)}>
        <GroupInput labelSize="100px">
          <Label>Nome:</Label>
          <Input {...register("name", { required: true })} />
          {errors.name && <Error secondary>Preencha o campo Nome.</Error>}
        </GroupInput>
        <GroupInput labelSize="100px">
          <Label>Empresa:</Label>
          <Select {...register("company", { required: true })}>
            <option value=""></option>
            {companyData.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </Select>
          {errors.company && <Error secondary>Preencha o campo Empresa.</Error>}
        </GroupInput>
        <GroupInput labelSize="100px">
          <Label>Cargo:</Label>
          <Input {...register("position", { required: true })} />
          {errors.position && <Error secondary>Preencha o campo Cargo.</Error>}
        </GroupInput>
        <GroupInput labelSize="100px">
          <Label>Email:</Label>
          <Input {...register("email")} />
        </GroupInput>
        <GroupButtons gap="12px">
          <Button type="submit" widthDesktop="200px">
            Salvar
          </Button>
          {id !== "novo" && (
            <Button
              type="button"
              widthDesktop="200px"
              onClick={() => handleOnDelete()}
              danger
              disabled={id === "novo"}
            >
              Excluir
            </Button>
          )}
        </GroupButtons>
      </Form>
    </Layout>
  );
};

export default Contatos;
