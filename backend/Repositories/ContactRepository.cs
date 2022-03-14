using Microsoft.AspNetCore.Http;
using Microsoft.Data.Sqlite;
using ProMarketAPI.Config;
using ProMarketAPI.Models;
using System;
using System.Collections.Generic;

namespace ProMarketAPI.Repositories
{
    public class ContactRepository
    {        
        public IEnumerable<Contact> All(IQueryCollection queryString)
        {
            // SQL      
            using SqliteCommand command = Database.Connection().CreateCommand();
            command.CommandText = @"SELECT * FROM contacts WHERE 1 = 1";
            if (queryString.ContainsKey("name"))
            {
                command.CommandText += " AND UPPER(name) LIKE UPPER(@name)";
                command.Parameters.AddWithValue("@name","%" + queryString["name"] + "%");

            }
            if (queryString.ContainsKey("company"))
            {
                command.CommandText += " AND UPPER(company) LIKE UPPER(@company)";
                command.Parameters.AddWithValue("@company", (string)queryString["company"]);

            }
            if (queryString.ContainsKey("position"))
            {
                command.CommandText += " AND UPPER(position) LIKE UPPER(@position)";
                command.Parameters.AddWithValue("@position", (string)queryString["position"]);

            }
            if (queryString.ContainsKey("email"))
            {
                command.CommandText += " AND UPPER(email) = UPPER(@email)";
                command.Parameters.AddWithValue("@email", (string)queryString["email"]);
            }
            using var reader = command.ExecuteReader();
            
            // Popula a lista
            List<Contact> list = new List<Contact>();
            while (reader.Read())
                list.Add(new Contact { ID = (long)reader["id"], Name = (string)reader["name"], Company = (long)reader["company"], Position = (string)reader["position"], Email = (string)reader["email"], CompanyData = new CompanyRepository().Find((long)reader["company"]) });
            
            // Retorna
            return list.ToArray();
        }

        public Contact Find(long id)
        {
            // SQL           
            using SqliteCommand command = Database.Connection().CreateCommand();
            command.CommandText = @"SELECT * FROM contacts WHERE id = @id";
            command.Parameters.AddWithValue("@id", id);
            using var reader = command.ExecuteReader();

            // Se não existir
            if (!reader.Read())
                throw new Exception("O registro não existe");

            // Retorna
            return new Contact { ID = (long)reader["id"], Name = (string)reader["name"], Company = (long)reader["company"], Position = (string)reader["position"], Email = (string)reader["email"], CompanyData = new CompanyRepository().Find((long)reader["company"]) };
        }

        public Contact Create(dynamic item)
        {
            // SQL       
            using SqliteCommand command = Database.Connection().CreateCommand();
            command.CommandText = command.CommandText = @"INSERT INTO contacts (name, company, position, email) VALUES (@name, @company, @position, @email);";
            command.Parameters.AddWithValue("@name", (string)item.name);
            command.Parameters.AddWithValue("@company", (long)item.company);
            command.Parameters.AddWithValue("@position", (string)item.position);
            command.Parameters.AddWithValue("@email", (string)item.email);
            command.ExecuteNonQuery();

            // Pega ID
            command.CommandText = "SELECT last_insert_rowid()";
            long lastId = (long)command.ExecuteScalar();

            // Retorna
            return Find(lastId);
        }

        public Contact Update(long id, dynamic item)
        {
            // SQL       
            using SqliteCommand command = Database.Connection().CreateCommand();
            string commandWrapper = "";
            if (item.ContainsKey("name"))
            {
                commandWrapper += " name = @name,";
                command.Parameters.AddWithValue("@name", (string)item.name);

            }
            if (item.ContainsKey("company"))
            {
                commandWrapper += " company = @company,";
                command.Parameters.AddWithValue("@company", (long)item.company);

            }
            if (item.ContainsKey("position"))
            {
                commandWrapper += " position = @position,";
                command.Parameters.AddWithValue("@position", (string)item.position);

            }
            if (item.ContainsKey("email"))
            {
                commandWrapper += " email = @email,";
                command.Parameters.AddWithValue("@email", (string)item.email);
            }
            if (commandWrapper.Length == 0)
            {
                throw new Exception("Parâmetros para update não informados");
            }
            command.CommandText = @"UPDATE contacts SET " + commandWrapper.Substring(0, commandWrapper.Length - 1) + " WHERE id = @id";
            command.Parameters.AddWithValue("@id", id);
            command.ExecuteNonQuery();
            

            // Retorna
            return Find(id);
        }

        public string Delete(long id)
        {
            // SQL            
            using SqliteCommand command = Database.Connection().CreateCommand();
            command.CommandText = @"DELETE FROM contacts WHERE id = @id";
            command.Parameters.AddWithValue("@id", id);
            command.ExecuteNonQuery();

            // Retorna
            return null;
        }
    }
}
