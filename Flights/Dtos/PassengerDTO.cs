using System.ComponentModel.DataAnnotations;

namespace FlightsSearchPortal.Dtos
{
    public record PassengerDTO(
        [Required][EmailAddress] string Email,
        [Required][MinLength(2)][MaxLength(35)] string FirstName,
        [Required][MinLength(2)][MaxLength(35)] string LastName,
        [Required] bool Gender);
}
