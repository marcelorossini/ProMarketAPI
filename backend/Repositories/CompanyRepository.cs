using Microsoft.AspNetCore.Http;
using Microsoft.Data.Sqlite;
using ProMarketAPI.Config;
using ProMarketAPI.Models;
using System;
using System.Collections.Generic;

namespace ProMarketAPI.Repositories
{
    public class CompanyRepository
    {        
        public IEnumerable<Company> All(IQueryCollection queryString)
        {
            // SQL      
            using SqliteCommand command = Database.Connection().CreateCommand();
            command.CommandText = @"SELECT * FROM company WHERE 1 = 1";
            if (queryString.ContainsKey("name"))
            {
                command.CommandText += " AND UPPER(name) LIKE UPPER(@name)";
                command.Parameters.AddWithValue("@name","%" + queryString["name"] + "%");

            }
            if (queryString.ContainsKey("segment"))
            {
                command.CommandText += " AND UPPER(segment) LIKE UPPER(@segment)";
                command.Parameters.AddWithValue("@segment", "%" + queryString["segment"] + "%");

            }
            if (queryString.ContainsKey("city"))
            {
                command.CommandText += " AND UPPER(city) LIKE UPPER(@city)";
                command.Parameters.AddWithValue("@city", "%" + queryString["city"] + "%");

            }
            if (queryString.ContainsKey("state"))
            {
                command.CommandText += " AND UPPER(state) = UPPER(@state)";
                command.Parameters.AddWithValue("@state", (string)queryString["state"]);
            }
            using var reader = command.ExecuteReader();
            
            // Popula a lista
            List<Company> list = new List<Company>();
            while (reader.Read())
                list.Add(new Company { ID = (long)reader["id"], Name = (string)reader["name"], Segment = (string)reader["segment"], City = (string)reader["city"], State = (string)reader["state"] });
            
            // Retorna
            return list.ToArray();
        }

        public Company Find(long id)
        {
            // SQL           
            using SqliteCommand command = Database.Connection().CreateCommand();
            command.CommandText = @"SELECT * FROM company WHERE id = @id";
            command.Parameters.AddWithValue("@id", id);
            using var reader = command.ExecuteReader();

            // Se não existir
            if (!reader.Read())
                throw new Exception("O registro não existe");

            // Retorna
            return new Company { ID = (long)reader["id"], Name = (string)reader["name"], Segment = (string)reader["segment"], City = (string)reader["city"], State = (string)reader["state"] };
        }

        public Company Create(dynamic item)
        {
            // SQL       
            using SqliteCommand command = Database.Connection().CreateCommand();
            command.CommandText = command.CommandText = @"INSERT INTO company (name, segment, city, state) VALUES (@name, @segment, @city, @state);";
            command.Parameters.AddWithValue("@name", (string)item.name);
            command.Parameters.AddWithValue("@segment", (string)item.segment);
            command.Parameters.AddWithValue("@city", (string)item.city);
            command.Parameters.AddWithValue("@state", (string)item.state);
            command.ExecuteNonQuery();

            // Pega ID
            command.CommandText = "SELECT last_insert_rowid()";
            long lastId = (long)command.ExecuteScalar();

            // Retorna
            return Find(lastId);
        }

        public Company Update(long id, dynamic item)
        {
            // SQL       
            using SqliteCommand command = Database.Connection().CreateCommand();
            string commandWrapper = "";
            if (item.ContainsKey("name"))
            {
                commandWrapper += " name = @name,";
                command.Parameters.AddWithValue("@name", (string)item.name);

            }
            if (item.ContainsKey("segment"))
            {
                commandWrapper += " segment = @segment,";
                command.Parameters.AddWithValue("@segment", (string)item.segment);

            }
            if (item.ContainsKey("city"))
            {
                commandWrapper += " city = @city,";
                command.Parameters.AddWithValue("@city", (string)item.city);

            }
            if (item.ContainsKey("state"))
            {
                commandWrapper += " state = @state,";
                command.Parameters.AddWithValue("@state", (string)item.state);
            }
            if (commandWrapper.Length == 0)
            {
                throw new Exception("Parâmetros para update não informados");
            }
            command.CommandText = @"UPDATE company SET " + commandWrapper.Substring(0, commandWrapper.Length - 1) + " WHERE id = @id";
            command.Parameters.AddWithValue("@id", id);
            command.ExecuteNonQuery();
            

            // Retorna
            return Find(id);
        }

        public string Delete(long id)
        {
            // SQL            
            using SqliteCommand command = Database.Connection().CreateCommand();
            command.CommandText = @"DELETE FROM company WHERE id = @id";
            command.Parameters.AddWithValue("@id", id);
            command.ExecuteNonQuery();

            // Retorna
            return null;
        }
    }
}
