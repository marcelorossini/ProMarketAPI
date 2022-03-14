using Microsoft.AspNetCore.Http;
using Microsoft.Data.Sqlite;
using ProMarketAPI.Config;
using ProMarketAPI.Models;
using System;
using System.Collections.Generic;

namespace ProMarketAPI.Repositories
{
    public class ActivityRepository
    {        
        public IEnumerable<Activity> All(IQueryCollection queryString)
        {
            // SQL      
            using SqliteCommand command = Database.Connection().CreateCommand();
            command.CommandText = @"SELECT * FROM activities WHERE 1 = 1";
            if (queryString.ContainsKey("description"))
            {
                command.CommandText += " AND UPPER(description) LIKE UPPER(@description)";
                command.Parameters.AddWithValue("@description", "%" + queryString["description"] + "%");

            }
            if (queryString.ContainsKey("company"))
            {
                command.CommandText += " AND UPPER(company) LIKE UPPER(@company)";
                command.Parameters.AddWithValue("@company", "%" + queryString["company"] + "%");

            }
            if (queryString.ContainsKey("date"))
            {
                command.CommandText += " AND date = @date";
                command.Parameters.AddWithValue("@date", (string)queryString["date"]);
            }
            using var reader = command.ExecuteReader();
            
            // Popula a lista
            List<Activity> list = new List<Activity>();
            while (reader.Read())
                list.Add(new Activity { ID = (long)reader["id"], Description = (string)reader["description"], Company = (long)reader["company"], Date = (string)reader["date"], CompanyData = new CompanyRepository().Find((long)reader["company"]) });
            
            // Retorna
            return list.ToArray();
        }

        public Activity Find(long id)
        {
            // SQL           
            using SqliteCommand command = Database.Connection().CreateCommand();
            command.CommandText = @"SELECT * FROM activities WHERE id = @id";
            command.Parameters.AddWithValue("@id", id);
            using var reader = command.ExecuteReader();

            // Se não existir
            if (!reader.Read())
                throw new Exception("O registro não existe");

            // Retorna
            return new Activity { ID = (long)reader["id"], Description = (string)reader["description"], Company = (long)reader["company"], Date = (string)reader["date"], CompanyData = new CompanyRepository().Find((long)reader["company"]) };
        }

        public Activity Create(dynamic item)
        {
            // SQL       
            using SqliteCommand command = Database.Connection().CreateCommand();
            command.CommandText = command.CommandText = @"INSERT INTO activities (description, company, date) VALUES (@description, @company, @date);";
            command.Parameters.AddWithValue("@description", (string)item.description);
            command.Parameters.AddWithValue("@company", (string)item.company);
            command.Parameters.AddWithValue("@date", (string)item.date);
            command.ExecuteNonQuery();

            // Pega ID
            command.CommandText = "SELECT last_insert_rowid()";
            long lastId = (long)command.ExecuteScalar();

            // Retorna
            return Find(lastId);
        }

        public Activity Update(long id, dynamic item)
        {
            // SQL       
            using SqliteCommand command = Database.Connection().CreateCommand();
            string commandWrapper = "";
            if (item.ContainsKey("description"))
            {
                commandWrapper += " description = @description,";
                command.Parameters.AddWithValue("@description", (string)item.description);

            }
            if (item.ContainsKey("company"))
            {
                commandWrapper += " company = @company,";
                command.Parameters.AddWithValue("@company", (string)item.company);

            }
            if (item.ContainsKey("date"))
            {
                commandWrapper += " date = @date,";
                command.Parameters.AddWithValue("@date", (string)item.date);
            }
            if (commandWrapper.Length == 0)
            {
                throw new Exception("Parâmetros para update não informados");
            }
            command.CommandText = @"UPDATE activities SET " + commandWrapper.Substring(0, commandWrapper.Length - 1) + " WHERE id = @id";
            command.Parameters.AddWithValue("@id", id);
            command.ExecuteNonQuery();
            

            // Retorna
            return Find(id);
        }

        public string Delete(long id)
        {
            // SQL            
            using SqliteCommand command = Database.Connection().CreateCommand();
            command.CommandText = @"DELETE FROM activities WHERE id = @id";
            command.Parameters.AddWithValue("@id", id);
            command.ExecuteNonQuery();

            // Retorna
            return null;
        }
    }
}
