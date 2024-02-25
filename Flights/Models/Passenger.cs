namespace FlightsSearchPortal.Models;

public record Passenger(
    string Email,
    string FirstName,
    string LastName,
    bool Gender);