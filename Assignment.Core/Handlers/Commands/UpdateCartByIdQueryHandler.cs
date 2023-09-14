using MediatR;
using Assignment.Contracts.Data;
using Assignment.Contracts.DTO;
using Assignment.Contracts.Data.Entities;
using FluentValidation;
using System.Text.Json;
using Assignment.Core.Exceptions;
using Microsoft.AspNetCore.Identity;

namespace Assignment.Providers.Handlers.Commands
{
    public class UpdateCartByIdQuery : IRequest<int>
    {
        public CreateCartDTO Model { get; }
        public UpdateCartByIdQuery(CreateCartDTO model)
        {
            this.Model = model;
        }
     
    }

    public class UpdateCartByIdQueryHandler : IRequestHandler<UpdateCartByIdQuery, int>
    {
        private readonly IUnitOfWork _repository;
        private readonly IValidator<CreateCartDTO> _validator;

        public UpdateCartByIdQueryHandler(IUnitOfWork repository, IValidator<CreateCartDTO> validator)
        {
            _repository = repository;
            _validator = validator;
        }

        public async Task<int> Handle(UpdateCartByIdQuery request, CancellationToken cancellationToken)
        {  
            CreateCartDTO model = request.Model;
            var result = _validator.Validate(model);
            if (!result.IsValid)
            {
                var errors = result.Errors.Select(x => x.ErrorMessage).ToArray();
                throw new InvalidRequestBodyException
                {
                    Errors = errors
                };
            }
            var entity = new Cart
            {
                Id= model.Id,
                ProductId = model.ProductId,
                ProductName = model.ProductName,
                ProductCategory = model.ProductCategory,
                ProductPrice = model.ProductPrice,
                CartStatus = model.CartStatus,
                ProductQuantity = model.ProductQuantity,
                ProductImage = model.ProductImage,
                UserName=model.UserName,
                ProductCartAdd = model.ProductCartAdd,
                ProductCartShipped = model.ProductCartShipped,
                ProductCartPlaced = model.ProductCartPlaced,
                ProductCartDispatch = model.ProductCartDispatch
            };
            _repository.Cart.Update(entity);
            await _repository.CommitAsync();
            return entity.Id;
        }
    }
}

