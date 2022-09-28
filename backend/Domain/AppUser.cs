using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser //Inheriting IdentityUser so that we can get access to the all needed field for an user 
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }

    }
}
