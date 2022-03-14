// Default
import { useState, useEffect } from "react";
import api from "../../services/api";
import Datatable from "../../components/Helpers/Datatable";
import { useForm } from "react-hook-form";

// Styles
import Layout from "../../components/Layout";
import { Input, Button, Label, GroupInput } from "../../styles/form";
import { Filter, ClearButton } from "../../styles/pesquisa";
import { Close } from "@styled-icons/ionicons-outline";

let timer;
export default function Home() {
  // Variáveis auxiliares
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { register, handleSubmit, getValues, setValue } = useForm();

  // Pesquisa
  const handleSearch = async () => {
    const search = Object.fromEntries(
      Object.entries(getValues()).filter((item) => item[1] !== "")
    );
    setIsLoading(true);
    const response = await api.get("/company", { params: search });
    setData(response.data);
    setIsLoading(false);
  };

  // Ao abrir
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <Layout title="Pesquisa" backButton={false} loading={isLoading}>
      <Filter onSubmit={handleSubmit(handleSearch)}>
        <GroupInput>
          <Label>Nome:</Label>
          <Input
            {...register("name")}
            onBlur={async () => await handleSearch()}
          />
          <ClearButton
            onClick={async () => {
              setValue("name", "");
              await handleSearch();
            }}
          >
            <Close />
          </ClearButton>
        </GroupInput>
        <GroupInput>
          <Label>Segmento:</Label>
          <Input
            {...register("segment")}
            onBlur={async () => await handleSearch()}
          />
          <ClearButton
            onClick={async () => {
              setValue("segment", "");
              await handleSearch();
            }}
          >
            <Close />
          </ClearButton>
        </GroupInput>
        <GroupInput>
          <Label>Cidade:</Label>
          <Input
            {...register("city")}
            onBlur={async () => await handleSearch()}
          />
          <ClearButton
            onClick={async () => {
              setValue("city", "");
              await handleSearch();
            }}
          >
            <Close />
          </ClearButton>
        </GroupInput>
        <GroupInput>
          <Label>UF:</Label>
          <Input
            {...register("state")}
            onBlur={async () => await handleSearch()}
          />
          <ClearButton
            onClick={async () => {
              setValue("state", "");
              await handleSearch();
            }}
          >
            <Close />
          </ClearButton>
        </GroupInput>
        <Button type="submit" margin="28px 0 0 0" secondary>
          Pesquisar
        </Button>
      </Filter>

      <Datatable
        columns={[
          {
            name: "Nome",
            selector: (row) => row.name,
            sortable: true,
          },
          {
            name: "Segmento",
            selector: (row) => row.segment,
            sortable: true,
          },
          {
            name: "Cidade",
            selector: (row) => row.city,
            sortable: true,
          },
          {
            name: "UF",
            selector: (row) => row.state,
            sortable: true,
          },
        ]}
        defaultSortFieldId={1}
        data={data}
      />
    </Layout>
  );
}
