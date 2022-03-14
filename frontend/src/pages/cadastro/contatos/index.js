// Default
import { useState, useEffect } from "react";
import api from "../../../services/api";
import Link from "next/link";
import Datatable from "../../../components/Helpers/Datatable";

// Style
import Layout from "../../../components/Layout";
import { Button } from "../../../styles/form";

const Contatos = () => {
  // Variáveis auxiliares
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ao abrir
  useEffect(() => {
    const handle = async () => {
      setIsLoading(true);
      const response = await api.get("/contact");
      setData(response.data);
      setIsLoading(false);
    };
    handle();
  }, []);

  return (
    <Layout title="Cadastro de Contatos" loading={isLoading} backButton={false}>
      <Datatable
        addShortcut={true}
        columns={[
          {
            name: "Nome",
            selector: (row) => row.name,
            sortable: true,
          },
          {
            name: "Empresa",
            selector: (row) => row.companyData.name,
            sortable: true,
          },
          {
            name: "Cargo",
            selector: (row) => row.position,
            sortable: true,
          },
          {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
          },
        ]}
        defaultSortFieldId={1}
        data={data}
      />
      <Link href="/cadastro/contatos/novo">
        <Button type="submit" widthDesktop="200px" margin="24px 0 0 0">
          Adicionar
        </Button>
      </Link>
    </Layout>
  );
};

export default Contatos;
