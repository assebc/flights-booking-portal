namespace FlightsSearchPortal.Models;

public record Book(
    int FlightId,
    string PassengerEmail,
    byte NumberOfSeats
);