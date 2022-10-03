﻿using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4-8}$", ErrorMessage = "Password must contain uppercase, lowercase, a number, and be bewteen 4 and 8 characters")]
        public string Password { get; set; }
        [Required]
        public string Username { get; set; }
    }
}
