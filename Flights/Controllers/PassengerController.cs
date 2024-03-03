using FlightsSearchPortal.Domain.Entities;
using FlightsSearchPortal.ViewModels;
using Microsoft.AspNetCore.Mvc;
using FlightsSearchPortal.Dtos;
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
        public IActionResult Register(PassengerDTO dto)
        {
           var passenger = new Passenger(dto.Email, dto.FirstName, dto.LastName, dto.Gender);
           _entities.Passengers.Add(passenger);
           _entities.SaveChanges();
           return CreatedAtAction(nameof(Find), new { email = passenger.Email });
        }

        [HttpGet("{email}")]
        public IActionResult Find(string email)
        {
            var passenger =  _entities.Passengers.FirstOrDefault(p => p.Email == email);
            if (passenger == null) return NotFound();
            return Ok(new PassengerRm(passenger.Email, passenger.FirstName, passenger.LastName, passenger.Gender));
        }
    }
}
