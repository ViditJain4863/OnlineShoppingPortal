namespace Assignment.Contracts.DTO
{
    public class CreateProductDTO
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public string ProductImage {get; set;}
        public int ProductPrice {get; set; }
        public string ProductCountry {get; set;}
        public string ProductCategory {get;set;}
        public string ProductAddedOn {get; set;}
    }
}