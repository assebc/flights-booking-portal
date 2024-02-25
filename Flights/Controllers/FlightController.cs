using FlightsSearchPortal.Models;
using FlightsSearchPortal.Views;
using Microsoft.AspNetCore.Mvc;

namespace FlightsSearchPortal.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FlightController : ControllerBase
    {

        private readonly ILogger<FlightController> _logger;

        public FlightController(ILogger<FlightController> logger)
        {
            _logger = logger;
        }

        private static Random _random = new Random();

        private static Flight[] _flights = new Flight[]
        {
            new(1,
                "American Airlines",
                _random.Next(90, 500).ToString(),
                new TimePlace("Los Angeles", DateTime.Now.AddHours(_random.Next(1, 3))),
                new TimePlace("Istanbul", DateTime.Now.AddHours(_random.Next(4, 10))),
                _random.Next(1, 853)),
            
            new(2,
                "Deutsche BA",
                _random.Next(90, 500).ToString(),
                new TimePlace("Munchen", DateTime.Now.AddHours(_random.Next(1, 3))),
                new TimePlace("Schinpol", DateTime.Now.AddHours(_random.Next(4, 10))),
                _random.Next(1, 853)),

            new(3,
                "British Airways",
                _random.Next(90, 500).ToString(),
                new TimePlace("London, Englang", DateTime.Now.AddHours(_random.Next(1, 3))),
                new TimePlace("Vizzola-Ticino", DateTime.Now.AddHours(_random.Next(4, 10))),
                _random.Next(1, 853))
        };

        private static IList<Book> _bookings = new List<Book>();

        [HttpGet]
        public IEnumerable<Flight> Search() => _flights;

        [HttpGet("{id}")]
        public ActionResult<Flight> Find(int id)
        {
            var flight = _flights.SingleOrDefault(f => f.Id == id);
            if (flight == null) return NotFound();
            return Ok(flight);
        }

        [HttpPost]
        [Route("book")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult Book(NewBook book)
        {
            var isFlight = _flights.Any(f => f.Id == book.FlightId);
            if (!isFlight) return NotFound();
            _bookings.Add(new Book(book.FlightId, book.PassengerEmail, book.NumberOfSeats));
            return CreatedAtAction(nameof(Find), new { id = book.FlightId });
        }
    }
}
