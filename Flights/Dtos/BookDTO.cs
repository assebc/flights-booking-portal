using System.ComponentModel.DataAnnotations;

namespace FlightsSearchPortal.Dtos
{
    public record BookDTO(
        [Required] int FlightId,
        [Required][EmailAddress] string PassengerEmail,
        [Required][Range(1, 254)] byte NumberOfSeats);
}
