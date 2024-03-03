using System;
using System.Collections.Generic;
using System.Linq;
using FlightsSearchPortal.Data;
using FlightsSearchPortal.Domain.Errors;
using FlightsSearchPortal.ViewModels;
using FlightsSearchPortal.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace FlightsSearchPortal.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly Entities _entities;

        public BookingController(Entities entities)
        {
            _entities = entities;
        }

        [HttpGet("{email}")]
        [ProducesResponseType(typeof(IEnumerable<BookingRm>), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public ActionResult<IEnumerable<BookingRm>> List(string email)
        {
            var bookings = _entities.Flights.ToArray()
                .SelectMany(f => f.Bookings
                    .Where(b => b.PassengerEmail == email)
                    .Select(b => new BookingRm(
                        f.Id,
                        f.Airline,
                        f.Price.ToString(),
                        new TimePlaceRm(f.Arrival.Place, f.Arrival.Time),
                        new TimePlaceRm(f.Departure.Place, f.Departure.Time),
                        b.NumberOfSeats,
                        email)));
            
            return Ok(bookings);
        }

        [HttpDelete]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult Cancel(BookDTO dto)
        {
            var flight = _entities.Flights.Find(dto.FlightId);

            var error = flight?.CancelBooking(dto.PassengerEmail, dto.NumberOfSeats);

            if (error == null)
            {
                _entities.SaveChanges();
                return NoContent();
            }

            if (error is NotFoundError)
            {
                return NotFound();
            }
            
            throw new Exception($"No book found by: {dto.PassengerEmail} with {dto.NumberOfSeats} number of seats");
        }
    }
}
