using System.Diagnostics;
using FlightsSearchPortal.Models;
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

        private static Random random = new Random();

        private static Flight[] flights = new Flight[]
        {
            new(Guid.NewGuid(),
                "American Airlines",
                random.Next(90, 500).ToString(),
                new TimePlace("Los Angeles", DateTime.Now.AddHours(random.Next(1, 3))),
                new TimePlace("Istanbul", DateTime.Now.AddHours(random.Next(4, 10))),
                random.Next(1, 853)),
            
            new(Guid.NewGuid(),
                "Deutsche BA",
                random.Next(90, 500).ToString(),
                new TimePlace("Munchen", DateTime.Now.AddHours(random.Next(1, 3))),
                new TimePlace("Schinpol", DateTime.Now.AddHours(random.Next(4, 10))),
                random.Next(1, 853)),

            new(Guid.NewGuid(),
                "British Airways",
                random.Next(90, 500).ToString(),
                new TimePlace("London, Englang", DateTime.Now.AddHours(random.Next(1, 3))),
                new TimePlace("Vizzola-Ticino", DateTime.Now.AddHours(random.Next(4, 10))),
                random.Next(1, 853))
        };

        [HttpGet]
        public IEnumerable<Flight> Search() => flights;

        [HttpGet("{id}")]
        public Flight Find(Guid id) => flights.SingleOrDefault(f => f.Id == id);
    }
}
