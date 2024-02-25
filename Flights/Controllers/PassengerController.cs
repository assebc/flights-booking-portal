using FlightsSearchPortal.Models;
using Microsoft.AspNetCore.Mvc;
using FlightsSearchPortal.Views;

namespace FlightsSearchPortal.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PassengerController: ControllerBase
    {

        private static IList<Passenger> _passengers = new List<Passenger>();
        
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public IActionResult Register(NewPassenger newPassenger)
        {
           _passengers.Add(new Passenger(newPassenger.Email, newPassenger.FirstName, newPassenger.LastName, newPassenger.Gender));
           return CreatedAtAction(nameof(Find), new { email = newPassenger.Email });
        }

        [HttpGet("{email}")]
        public IActionResult Find(string email)
        {
            var passenger =  _passengers.FirstOrDefault(p => p.Email == email);
            if (passenger == null) return NotFound();
            return Ok(passenger);
        }
    }
}
