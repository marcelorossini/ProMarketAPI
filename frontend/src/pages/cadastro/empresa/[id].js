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

const Empresa = () => {
  // Variáveis auxiliares
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const { id } = router.query;

  // React Hook Form
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Carrega estados
  const handleGetStates = async () => {
    setIsLoading(true);
    const { data } = await api.get(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );
    setStateData(data);
    setIsLoading(false);
  };

  // Carrega Cidades
  const handleGetCities = async (state = null) => {
    if (!state) return;
    setIsLoading(true);
    const { data } = await api.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/distritos`
    );
    setCityData(data);
    setValue("city", "");
    setIsLoading(false);
  };

  // Ao abrir
  useEffect(() => {
    const handle = async () => {
      try {
        // Busca estados
        await handleGetStates();

        // Verifica se é novo
        if (!id) return;
        if (id === "novo") return;
        setIsLoading(true);

        // Consulta api
        const { data } = await api.get(`/company/${id}`);

        // Title
        setTitle(data.name);

        // Busca cidades
        await handleGetCities(data.state);

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
      title: `Deseja excluir a empresa?`,
      message: `Não será possivel reverter.`,
      confirmAction: async () => {
        try {
          await api.delete(`/company/${id}`);
          router.replace("/cadastro/empresa");
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
      if (id === "novo") await api.post(`/company`, { ...data });
      else {
        await api.put(`/company/${id}`, { ...data });
      }
      router.push("/cadastro/empresa");
    } catch (error) {
      alertDialog({
        type: "Alert",
        title: `Erro`,
        message: `Erro, tente novamente`,
      });
    }
  };

  // Form
  const stateRegister = register("state", { required: true });

  return (
    <Layout
      title={title ? `Empresa: ${title}` : "Nova Empresa"}
      loading={isLoading}
    >
      <Form onSubmit={handleSubmit(handleOnSubmit)}>
        <GroupInput labelSize="100px">
          <Label>Nome:</Label>
          <Input {...register("name", { required: true })} />
          {errors.name && <Error secondary>Preencha o campo Nome.</Error>}
        </GroupInput>
        <GroupInput labelSize="100px">
          <Label>Segmento:</Label>
          <Input {...register("segment", { required: true })} />
          {errors.segment && (
            <Error secondary>Preencha o campo Segmento.</Error>
          )}
        </GroupInput>
        <GroupInput labelSize="100px">
          <Label>UF:</Label>
          <Select
            {...stateRegister}
            onChange={(e) => {
              stateRegister.onChange(e);
              handleGetCities(e.target.value);
            }}
          >
            <option value=""></option>
            {stateData
              .sort((a, b) => {
                return a.sigla.localeCompare(b.sigla);
              })
              .map((item, index) => {
                return (
                  <option key={index} value={item.sigla}>
                    {item.sigla} - {item.nome}
                  </option>
                );
              })}
          </Select>
          {errors.state && <Error secondary>Preencha o campo UF.</Error>}
        </GroupInput>
        <GroupInput labelSize="100px">
          <Label>Cidade:</Label>
          <Select {...register("city", { required: true })}>
            <option value=""></option>
            {cityData
              .sort((a, b) => {
                return a.nome.localeCompare(b.nome);
              })
              .map((item, index) => {
                return (
                  <option key={index} value={item.nome}>
                    {item.nome}
                  </option>
                );
              })}
          </Select>
          {errors.city && <Error secondary>Preencha o campo Cidade.</Error>}
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
            >
              Excluir
            </Button>
          )}
        </GroupButtons>
      </Form>
    </Layout>
  );
};

export default Empresa;
