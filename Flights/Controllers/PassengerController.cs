using FlightsSearchPortal.Domain.Entities;
using FlightsSearchPortal.ViewModels;
using Microsoft.AspNetCore.Mvc;
using FlightsSearchPortal.Views;
using FlightsSearchPortal.Data;

namespace FlightsSearchPortal.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PassengerController: ControllerBase
    {
        private readonly Entities _entities;

        public PassengerController(Entities entities)
        {
            _entities = entities;
        }
        
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public IActionResult Register(PassengerDTO newPassenger)
        {
           var passenger = new Passenger(newPassenger.Email, newPassenger.FirstName, newPassenger.LastName, newPassenger.Gender);
           _entities.passengers.Add(passenger);
           return CreatedAtAction(nameof(Find), new { email = passenger.Email });
        }

        [HttpGet("{email}")]
        public IActionResult Find(string email)
        {
            var passenger =  _entities.passengers.FirstOrDefault(p => p.Email == email);
            if (passenger == null) return NotFound();
            return Ok(new PassengerRm(passenger.Email, passenger.FirstName, passenger.LastName, passenger.Gender));
        }
    }
}
