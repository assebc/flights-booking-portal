using System.Collections.Generic;
using System.Linq;
using FlightsSearchPortal.Data;
using FlightsSearchPortal.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using FlightsSearchPortal.Domain.Errors;
using FlightsSearchPortal.Dtos;
using FlightsSearchPortal.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace FlightSearchPortal.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FlightController : ControllerBase
    {
        private readonly Entities _entities;

        public FlightController(Entities entities)
        {
            _entities = entities;
        }

        [HttpGet]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [ProducesResponseType(typeof(IEnumerable<FlightRm>), 200)]
        public IEnumerable<FlightRm> Search([FromQuery] FlightSearchParameters @params)
        {

            IQueryable<Flight> flights = _entities.Flights;

            if(!string.IsNullOrWhiteSpace(@params.Destination))
                flights = flights.Where(f => f.Arrival.Place.Contains(@params.Destination));

            if (!string.IsNullOrWhiteSpace(@params.From))
                flights = flights.Where(f => f.Departure.Place.Contains(@params.From));

            if (@params.FromDate != null)
                flights = flights.Where(f => f.Departure.Time >= @params.FromDate.Value.Date);

            if (@params.ToDate != null)
                flights = flights.Where(f => f.Departure.Time >= @params.ToDate.Value.Date.AddDays(1).AddTicks(-1));

            if (@params.NumberOfPassengers != 0 && @params.NumberOfPassengers != null)
                flights = flights.Where(f => f.RemainingNumberOfSeats >= @params.NumberOfPassengers);
            else
                flights = flights.Where(f => f.RemainingNumberOfSeats >= 1);


            var flightRmList = flights            
                .Select(flight => new FlightRm(
                flight.Id,
                flight.Airline,
                flight.Price,
                new TimePlaceRm(flight.Departure.Place.ToString(), flight.Departure.Time),
                new TimePlaceRm(flight.Arrival.Place.ToString(), flight.Arrival.Time),
                flight.RemainingNumberOfSeats
                ));

            return flightRmList;
        }
        

        [HttpGet("{id}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        [ProducesResponseType(typeof(FlightRm),200)]
        public ActionResult<FlightRm> Find(int id)
        {
            var flight = _entities.Flights.SingleOrDefault(f => f.Id == id);

            if (flight == null)
                return NotFound();

            var readModel = new FlightRm(
                flight.Id,
                flight.Airline,
                flight.Price,
                new TimePlaceRm(flight.Departure.Place.ToString(), flight.Departure.Time),
                new TimePlaceRm(flight.Arrival.Place.ToString(), flight.Arrival.Time),
                flight.RemainingNumberOfSeats
                );

            return Ok(readModel);
        }

        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult Book(BookDTO dto)
        {
            System.Diagnostics.Debug.WriteLine($"Booking a new flight {dto.FlightId}");

            var flight = _entities.Flights.SingleOrDefault(f => f.Id == dto.FlightId);

            if (flight == null)
                return NotFound();

            var error = flight.MakeBooking(dto.PassengerEmail, dto.NumberOfSeats);

            if (error is OverbookError)
                return Conflict(new { message = "Not enough seats." });


            try
            {
                _entities.SaveChanges();
            } catch(DbUpdateConcurrencyException e)
            {
                return Conflict(new { message = "An error occurred while booking. Please try again." });
            }

            return CreatedAtAction(nameof(Find), new { id = dto.FlightId });
        }

    }
}