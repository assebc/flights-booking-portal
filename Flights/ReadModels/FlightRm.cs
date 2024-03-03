namespace FlightsSearchPortal.ViewModels
{
    public record FlightRm(
        int Id,
        string Airline,
        string Price,
        TimePlaceRm Departure,
        TimePlaceRm Arrival,
        int RemainingNumberOfSeats);
}