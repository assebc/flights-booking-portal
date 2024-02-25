using System.ComponentModel.DataAnnotations;

namespace FlightsSearchPortal.Views;

public record NewPassenger(
    [Required][EmailAddress] string Email,
    [Required][MinLength(2)][MaxLength(35)] string FirstName,
    [Required][MinLength(2)][MaxLength(35)] string LastName,
    [Required] bool Gender);