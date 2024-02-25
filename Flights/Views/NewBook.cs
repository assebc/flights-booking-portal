using System.ComponentModel.DataAnnotations;

namespace FlightsSearchPortal.Views;

public record NewBook(
    [Required] int FlightId,
    [Required][EmailAddress] string PassengerEmail,
    [Required][Range(1, 254)] byte NumberOfSeats);