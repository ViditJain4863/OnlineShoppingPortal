using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assignment.Contracts.Data.Entities
{
    public class Product : BaseEntity
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