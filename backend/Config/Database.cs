using Microsoft.Data.Sqlite;
using System.IO;

namespace ProMarketAPI.Config
{
    public class Database
    {
        // Conexão
        public static SqliteConnection Connection()
        {
            SqliteConnection connection = new SqliteConnection("Data Source=promarket.db");
            connection.Open();                        
            return connection;
        }

        // Inicialização
        public static void Initialize()
        {
            // Se o arquivo já existir, não cria banco de dados novamente
            if (File.Exists("promarket.db"))
               return;

            // ------------------------------------------------------------------------------------------------
            // Cria tabela de empresa 
            using var command = Connection().CreateCommand();
            command.CommandText = @"CREATE TABLE IF NOT EXISTS company (
	            id INTEGER PRIMARY KEY,
	            name TEXT NOT NULL,
	            segment TEXT NOT NULL,
	            city TEXT NOT NULL,
	            state TEXT NOT NULL 
            );";
            command.ExecuteNonQuery();

            // Insere dados empresa
            command.CommandText = @"INSERT INTO company (id, name, segment, city, state) VALUES (1, 'Empresa1', 'Supermercados', 'Lins', 'SP');";
            command.ExecuteNonQuery();
            command.CommandText = @"INSERT INTO company (id, name, segment, city, state) VALUES (2, 'Empresa2', 'Padaria', 'Belo Horizonte', 'MG');";
            command.ExecuteNonQuery();
            command.CommandText = @"INSERT INTO company (id, name, segment, city, state) VALUES (3, 'Empresa3', 'Loja Conveniência', 'Presidente Prudente', 'SP');";
            command.ExecuteNonQuery();
            command.CommandText = @"INSERT INTO company (id, name, segment, city, state) VALUES (4, 'Empresa4', 'Supermercados', 'Bauru', 'SP');";
            command.ExecuteNonQuery();
            
            // ------------------------------------------------------------------------------------------------
            // Cria tabela de contatos 
            command.CommandText = @"CREATE TABLE IF NOT EXISTS contacts (
	            id INTEGER PRIMARY KEY,
	            company INTEGER NOT NULL,
	            name TEXT NOT NULL,
	            position TEXT NOT NULL,
	            email TEXT NOT NULL
            );";
            command.ExecuteNonQuery();

            // Insere dados contatos
            command.CommandText = @"INSERT INTO contacts (id, company, name, position, email) VALUES (1, 1, 'Fulano', 'Diretor', 'email@empresa1.com.br');";
            command.ExecuteNonQuery();
            command.CommandText = @"INSERT INTO contacts (id, company, name, position, email) VALUES (2, 1, 'João', 'Comprador', 'joao@empresa1.com.br');";
            command.ExecuteNonQuery();
            command.CommandText = @"INSERT INTO contacts (id, company, name, position, email) VALUES (3, 2, 'Valdir', 'Arquiteto', 'abc@empresa2.com.br');";
            command.ExecuteNonQuery();

            // ------------------------------------------------------------------------------------------------
            // Cria tabela de atividades 
            command.CommandText = @"CREATE TABLE IF NOT EXISTS activities (
	            id INTEGER PRIMARY KEY,
	            company INTEGER NOT NULL,
	            date TEXT NOT NULL,
	            description TEXT NOT NULL
            );";
            command.ExecuteNonQuery();

            // Insere dados atividades
            command.CommandText = @"INSERT INTO activities (id, company, date, description) VALUES (1, 1, '2022-01-01','Reunião com Diretor');";
            command.ExecuteNonQuery();
            command.CommandText = @"INSERT INTO activities (id, company, date, description) VALUES (2, 1, '2022-01-20','Pedido fechado');";
            command.ExecuteNonQuery();
            command.CommandText = @"INSERT INTO activities (id, company, date, description) VALUES (3, 1, '2022-01-21','Nota fiscal 12345 emitida');";
            command.ExecuteNonQuery();
            command.CommandText = @"INSERT INTO activities (id, company, date, description) VALUES (4, 2, '2022-01-18','Reunião com Arquiteto');";
            command.ExecuteNonQuery();
            command.CommandText = @"INSERT INTO activities (id, company, date, description) VALUES (5, 2, '2022-01-20','Abertura negócio');";
            command.ExecuteNonQuery();
        }
    }
}
