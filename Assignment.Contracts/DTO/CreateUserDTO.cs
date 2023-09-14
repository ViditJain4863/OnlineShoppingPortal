namespace Assignment.Contracts.DTO
{
    public class CreateUserDTO
    {
        public int Id { get; set; }
        public string FirstName {get; set; }
        public string LastName { get; set; }
        public string EmailAddress {get; set;}
        public string Username { get; set; }
        public string MobileNumber { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Gender {get; set;}
        public string Country {get; set; }
        public string Pincode { get; set; }
        public string userUpdateDate {get; set;}
    }
}