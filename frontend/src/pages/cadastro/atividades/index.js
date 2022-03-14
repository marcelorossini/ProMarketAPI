// Default
import { useState, useEffect } from "react";
import api from "../../../services/api";
import Link from "next/link";
import Datatable from "../../../components/Helpers/Datatable";
import dayjs from "dayjs";

// Style
import Layout from "../../../components/Layout";
import { Button } from "../../../styles/form";

const Atividades = () => {
  // Variáveis auxiliares
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ao abrir
  useEffect(() => {
    const handle = async () => {
      setIsLoading(true);
      const  { data } = await api.get("/activity");
      setData(data);
      setIsLoading(false);
    };
    handle();
  }, []);

  return (
    <Layout
      title="Cadastro de Atividades"
      loading={isLoading}
      backButton={false}
    >
      <Datatable
        addShortcut={true}
        columns={[
          {
            name: "Data",
            selector: (row) =>
              dayjs(row.date).locale("pt-br").format("DD/MM/YYYY"),
            sortable: true,
            sortFunction: (a,b) => new Date(a.date) - new Date(b.date)
          },
          {
            name: "Empresa",
            selector: (row) => row.companyData.name,
            sortable: true,
          },
          {
            name: "Descrição",
            selector: (row) => row.description,
            sortable: true,
          },
        ]}
        defaultSortFieldId={1}
        data={data}
      />
      <Link href="/cadastro/atividades/novo">
        <Button type="submit" widthDesktop="200px" margin="24px 0 0 0">
          Adicionar
        </Button>
      </Link>
    </Layout>
  );
};

export default Atividades;
