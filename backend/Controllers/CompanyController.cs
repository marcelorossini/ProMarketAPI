using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ProMarketAPI.Models;
using ProMarketAPI.Repositories;
using System.Data;
using System;
using Newtonsoft.Json;

namespace ProMarketAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CompanyController : ControllerBase
    {
        private CompanyRepository companyRepository = new CompanyRepository();

        // Método : GET
        // Exemplo: localhost:3000/company
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                IEnumerable<Company> response = companyRepository.All(HttpContext.Request.Query);
                return Ok(response);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // Método : GET
        // Exemplo: localhost:3000/company/5
        [HttpGet("{id}")]
        public IActionResult Get(long id)
        {
            try
            {
                Company response = companyRepository.Find(id);
                return Ok(response);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }            
        }

        // Método : POST
        // Exemplo: localhost:3000/company
        [HttpPost]
        public IActionResult Post([FromBody] dynamic jsonData)
        {
            try
            {
                dynamic data = JsonConvert.DeserializeObject<dynamic>(jsonData.ToString());
                Company response = companyRepository.Create(data);
                return Ok(response);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }            
        }

        // Método : PUT
        // Exemplo: localhost:3000/company/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] dynamic jsonData)
        {
            try
            {
                dynamic data = JsonConvert.DeserializeObject<dynamic>(jsonData.ToString());
                Company response = companyRepository.Update(id, data);
                return Ok(response);
            } catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // Método : DELETE
        // Exemplo: localhost:3000/company
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            try
            {
                string response = companyRepository.Delete(id);
                return Ok(response);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }           
        }
    }
}
