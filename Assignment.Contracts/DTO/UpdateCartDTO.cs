namespace Assignment.Contracts.DTO
{
    public class UpdateCartDTO
    {
        public string CartStatus { get; set; }
        public string ProductCartAdd {get; set;}
        public string ProductCartShipped {get;set;}
        public string ProductCartPlaced {get;set;}
        public string ProductCartDispatch {get;set;}
    }
}   