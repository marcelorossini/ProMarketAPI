import { useRouter } from "next/router";

import { Container, Empty } from "./style";
import DataTable from "react-data-table-component";

const Datatable = (props) => {
  const router = useRouter();
  const { addShortcut = false } = props;

  const handleRowClick = (id = "") => {
    router.push(`${router.pathname}/${id || "novo"}`);
  };

  return (
    <Container>
      <DataTable
        noHeader={true}
        noDataComponent={
          <Empty onClick={() => addShortcut && handleRowClick()}>
            Nenhum registro encontrado{" "}
            {addShortcut && ", clique aqui para adicionar"}
          </Empty>
        }
        onRowClicked={(data) => handleRowClick(data.id)}
        {...props}
      />
    </Container>
  );
};

export default Datatable;
