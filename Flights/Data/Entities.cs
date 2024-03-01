using FlightsSearchPortal.Domain.Entities;

namespace FlightsSearchPortal.Data
{
    public class Entities
    {
        public IList<Passenger> passengers = new List<Passenger>();
        public List<Flight> flights = new List<Flight>();
    }
}
