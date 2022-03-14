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
    public class ActivityController : ControllerBase
    {
        private ActivityRepository activityRepository = new ActivityRepository();

        // Método : GET
        // Exemplo: localhost:3000/activity
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                IEnumerable<Activity> response = activityRepository.All(HttpContext.Request.Query);
                return Ok(response);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // Método : GET
        // Exemplo: localhost:3000/activity/5
        [HttpGet("{id}")]
        public IActionResult Get(long id)
        {
            try
            {
                Activity response = activityRepository.Find(id);
                return Ok(response);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }            
        }

        // Método : POST
        // Exemplo: localhost:3000/activity
        [HttpPost]
        public IActionResult Post([FromBody] dynamic jsonData)
        {
            try
            {
                dynamic data = JsonConvert.DeserializeObject<dynamic>(jsonData.ToString());
                Activity response = activityRepository.Create(data);
                return Ok(response);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }            
        }

        // Método : PUT
        // Exemplo: localhost:3000/activity/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] dynamic jsonData)
        {
            try
            {
                dynamic data = JsonConvert.DeserializeObject<dynamic>(jsonData.ToString());
                Activity response = activityRepository.Update(id, data);
                return Ok(response);
            } catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // Método : DELETE
        // Exemplo: localhost:3000/activity
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            try
            {
                string response = activityRepository.Delete(id);
                return Ok(response);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }           
        }
    }
}
