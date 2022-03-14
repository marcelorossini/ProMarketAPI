/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../../services/api";
import dayjs from "dayjs";

import Layout from "../../components/Layout";

import {
  Grid,
  Label,
  Item,
  Company,
  Contacts,
  Activities,
} from "../../styles/pesquisa";

const Cliente = () => {
  // Variáveis auxiliares
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    company: {},
    contacts: [],
    activities: [],
  });

  // Ao abrir/alterar o id
  useEffect(() => {
    const handle = async () => {
      setIsLoading(true);
      try {
        const { data: company = {} } = await api.get(`/company/${id}`);
        const { data: contacts = [] } = await api.get(`/contact`, {
          params: { company: id },
        });
        const { data: activities = [] } = await api.get(`/activity`, {
          params: { company: id },
        });
        setData({ company, contacts, activities });
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    handle();
  }, [id]);

  return (
    <Layout title="Dados empresa" loading={isLoading}>
      <Grid>
        <Company>
          <Label>{data.company.name}</Label>
          <Item>
            Segmento: {data.company.segment} - Cidade: {data.company.city} - UF:{" "}
            {data.company.state}
          </Item>
        </Company>
        <Contacts>
          <Label>Contatos</Label>
          {data.contacts.map((contact) => {
            return (
              <Item key={contact.id}>
                Nome: {contact.name}
                <br />
                Cargo: {contact.position}
                <br />
                Email: {contact.email}
              </Item>
            );
          })}
        </Contacts>
        <Activities>
          <Label>Atividades</Label>
          {data.activities.map((activity) => {
            return (
              <Item key={activity.id}>
                {dayjs(activity.date).locale("pt-br").format("DD/MM/YYYY")} -{" "}
                {activity.description}
              </Item>
            );
          })}
        </Activities>
      </Grid>
    </Layout>
  );
};

export default Cliente;
