namespace FlightsSearchPortal.Models
{
    public record Flight(
        int Id,
        string Airline,
        string Price,
        TimePlace Departure,
        TimePlace Arrival,
        int RemainingNumberOfSeats);
}