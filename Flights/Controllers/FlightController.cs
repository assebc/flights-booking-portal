using FlightsSearchPortal.Data;
using FlightsSearchPortal.Domain.Entities;
using FlightsSearchPortal.Domain.Errors;
using FlightsSearchPortal.ViewModels;
using FlightsSearchPortal.Views;
using Microsoft.AspNetCore.Mvc;

namespace FlightsSearchPortal.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FlightController : ControllerBase
    {
        private readonly ILogger<FlightController> _logger;
        private readonly Entities _entities;

        public FlightController(ILogger<FlightController> logger, Entities entities)
        {
            _logger = logger;
            _entities = entities;
        }
        
        [HttpGet]
        public IEnumerable<FlightRm> Search()
        {
            var flightRmList = _entities.flights.Select(flight => new FlightRm(
                flight.Id,
                flight.Airline,
                flight.Price,
                new TimePlaceRm(flight.Departure.Place.ToString(), flight.Departure.Time),
                new TimePlaceRm(flight.Arrival.Place.ToString(), flight.Departure.Time),
                flight.RemainingNumberOfSeats
            )).ToArray();
            
            return flightRmList;
        }

        [HttpGet("{id}")]
        public ActionResult<FlightRm> Find(int id)
        {
            var flight = _entities.flights.SingleOrDefault(f => f.Id == id);
            if (flight == null) return NotFound();
            var readModel = new FlightRm(
                flight.Id, 
                flight.Airline, 
                flight.Price, 
                new TimePlaceRm(flight.Departure.Place, flight.Departure.Time),
                new TimePlaceRm(flight.Arrival.Place, flight.Departure.Time),
                flight.RemainingNumberOfSeats
                );
            
            return Ok(readModel);
        }

        [HttpPost]
        [Route("book")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public IActionResult Book(BookDTO book)
        {
            var flight = _entities.flights.SingleOrDefault(f => f.Id == book.FlightId);
            if (flight == null) return NotFound();

            var error = flight.MakeBooking(book.PassengerEmail, book.NumberOfSeats);

            if (error is OverbookError)
            {
                return Conflict(new { message = "Number of requested seats exceeds the number of remaining seats." });
            }
            
            return CreatedAtAction(nameof(Find), new { id = book.FlightId });
        }
    }
}
