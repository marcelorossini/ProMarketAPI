// Default
import { useState, useEffect } from "react";
import api from "../../../services/api";
import Link from "next/link";
import Datatable from "../../../components/Helpers/Datatable";

// Style
import Layout from "../../../components/Layout";
import { Button } from "../../../styles/form";

const Empresa = () => {
  // Variáveis auxiliares
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ao abrir
  useEffect(() => {
    const handle = async () => {
      setIsLoading(true);
      const response = await api.get("/company");
      setData(response.data);
      setIsLoading(false);
    };
    handle();
  }, []);

  return (
    <Layout title="Cadastro de Empresas" loading={isLoading} backButton={false}>
      <Datatable
        addShortcut={true}
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
      <Link href="/cadastro/empresa/novo">
        <Button type="submit" widthDesktop="200px" margin="24px 0 0 0">
          Adicionar
        </Button>
      </Link>
    </Layout>
  );
};

export default Empresa;
