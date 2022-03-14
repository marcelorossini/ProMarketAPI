import styled from "styled-components";

export const Filter = styled.form`
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
  @media (min-width: 768px) {
    flex-direction: row;
    padding-bottom: 0px;
    & > * {
      margin-left: 10px;
    }
    & > *:first-child {
      margin-left: 0px;
    }
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto, 3);
  grid-template-areas: "Company" "Contacts" "Activities";
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas: "Company Company" "Contacts Activities";
  }
`;

export const Company = styled.ul`
  grid-area: Company;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-grey-light);
`;

export const Contacts = styled.ul`
  grid-area: Contacts;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--color-grey-light);
  padding-bottom: 20px;
  @media (min-width: 768px) {
    border-bottom: 0;
    padding-bottom: 0px;
    padding-right: 20px;
    border-right: 1px solid var(--color-grey-light);
  }
`;

export const Activities = styled.ul`
  grid-area: Activities;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.li`
  font-size: 24px;
  font-weight: bold;
  color: var(--color-primary);
  padding-bottom: 6px;
`;

export const Item = styled.li`
  color: var(--color-text-primary);

  border-bottom: 1px solid var(--color-grey-light);
  padding: 10px 0;
  &:last-child {
    border-bottom: 0;
    padding: 10px 0 0 0;
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 8px;

  & > svg {
    width: 16px;
  }
`;
