namespace FlightsSearchPortal.ViewModels
{
    public record BookingRm(
        int FlightId,
        string Airline,
        string Price,
        TimePlaceRm Arrival,
        TimePlaceRm Departure,
        int NumberOfSeats,
        string PassengerEmail);
}
