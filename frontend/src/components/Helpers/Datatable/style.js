import styled from "styled-components";

export const Container = styled.div`
  & .rdt_TableCol {
    font-size: 16px;
    font-weight: bold;
    color: var(--color-primary);
  }

  & .rdt_TableCell {
    font-size: 14px;
    cursor: pointer;
    color: var(--color-text-primary);
  }
  & .rdt_TableHead {
    font-size: 16px !important;
  }

  & .rdt_TableRow {
    transition: all 0.3s;
  }

  & .rdt_TableRow:hover {
    background: var(--color-grey-light);
  }

  & .rdt_TableHeadRow {
    min-height: 0px;
    padding-bottom: 14px;
  }

  & .rdt_TableCol_Sortable {
    color: var(--color-primary);
  }
`;

export const Empty = styled.div`
  padding-top: 10px;
  min-height: 100px;
  cursor: pointer;
`;
