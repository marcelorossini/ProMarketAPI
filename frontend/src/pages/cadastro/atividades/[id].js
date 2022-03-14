/* eslint-disable react-hooks/exhaustive-deps */
// Defaults
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ptbr from "date-fns/locale/pt-BR";
registerLocale("pt-BR", ptbr);

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

const Atividades = () => {
  // Variáveis auxiliares
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [companyData, setCompanyData] = useState([]);
  const [date, setDate] = useState(new Date());
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
        const { data } = await api.get(`/activity/${id}`);

        // Title
        setTitle(data.name);

        // Data
        setDate(dayjs(data.date).toDate());

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
      title: `Deseja excluir a atividade?`,
      message: `Não será possivel reverter.`,
      confirmAction: async () => {
        try {
          await api.delete(`/activity/${id}`);
          router.replace("/cadastro/atividades");
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
      data.date = dayjs(date).format("YYYY-MM-DD")
      if (id === "novo") await api.post(`/activity`, { ...data });
      else {
        await api.put(`/activity/${id}`, { ...data });
      }
      router.push("/cadastro/atividades");
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
      title={title ? `Atividade: ${title}` : "Nova Atividade"}
      loading={isLoading}
    >
      <Form onSubmit={handleSubmit(handleOnSubmit)}>
        <GroupInput labelSize="100px">
          <Label>Data:</Label>
          <DatePicker
            customInput={<Input />}
            selected={date}
            onChange={(date) => setDate(date)}
            placeholderText="dd/mm/aaaa"
            dateFormat="dd/MM/yyyy"
            locale="pt-BR"
          />
          {errors.date && <Error secondary>Preencha o campo Data.</Error>}
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
          <Label>Descrição:</Label>
          <Input {...register("description", { required: true })} />
          {errors.description && (
            <Error secondary>Preencha o campo Descrição.</Error>
          )}
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

export default Atividades;
