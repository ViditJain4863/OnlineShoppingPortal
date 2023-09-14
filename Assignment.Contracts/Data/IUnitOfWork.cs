using Assignment.Contracts.Data.Repositories;

namespace Assignment.Contracts.Data
{
    public interface IUnitOfWork
    {
        IAppRepository App { get; }
        IUserRepository User { get; }
        IProductRepository Product {get;}
        ICategoryRepository Category {get;}
        ICartRepository Cart {get;}
        Task CommitAsync();
    }
}