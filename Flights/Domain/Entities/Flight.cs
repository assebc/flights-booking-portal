using FlightsSearchPortal.Domain.Errors;

namespace FlightsSearchPortal.Domain.Entities
{
    public record Flight(
        int Id,
        string Airline,
        string Price,
        TimePlace Departure,
        TimePlace Arrival,
        int RemainingNumberOfSeats)
    {
        public IList<Booking> bookings = new List<Booking>();

        public int RemainingNumberOfSeats { get; set; } = RemainingNumberOfSeats;

        public object? MakeBooking(string passengerEmail, byte numberOfSeats)
        {
            var flight = this;
            
            if (flight.RemainingNumberOfSeats < numberOfSeats)
            {
                return new OverbookError();
            }
                
            flight.bookings.Add(new Booking(passengerEmail,numberOfSeats));
            
            flight.RemainingNumberOfSeats -= numberOfSeats;

            return null;
        }
    };
    
    
}