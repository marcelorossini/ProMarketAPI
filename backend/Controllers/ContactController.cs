using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ProMarketAPI.Models;
using ProMarketAPI.Repositories;
using System;
using Newtonsoft.Json;

namespace ProMarketAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactController : ControllerBase
    {
        private ContactRepository contactRepository = new ContactRepository();

        // Método : GET
        // Exemplo: localhost:3000/contact
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                IEnumerable<Contact> response = contactRepository.All(HttpContext.Request.Query);
                return Ok(response);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // Método : GET
        // Exemplo: localhost:3000/contact/5
        [HttpGet("{id}")]
        public IActionResult Get(long id)
        {
            try
            {
                Contact response = contactRepository.Find(id);
                return Ok(response);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }            
        }

        // Método : POST
        // Exemplo: localhost:3000/contact
        [HttpPost]
        public IActionResult Post([FromBody] dynamic jsonData)
        {
            try
            {
                dynamic data = JsonConvert.DeserializeObject<dynamic>(jsonData.ToString());
                Contact response = contactRepository.Create(data);
                return Ok(response);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }            
        }

        // Método : PUT
        // Exemplo: localhost:3000/contact/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] dynamic jsonData)
        {
            try
            {
                dynamic data = JsonConvert.DeserializeObject<dynamic>(jsonData.ToString());
                Contact response = contactRepository.Update(id, data);
                return Ok(response);
            } catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // Método : DELETE
        // Exemplo: localhost:3000/contact
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            try
            {
                string response = contactRepository.Delete(id);
                return Ok(response);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }           
        }
    }
}
