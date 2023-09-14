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
    public class CreateProductCommand : IRequest<int>
    {
        public CreateProductDTO Model { get; }
        public CreateProductCommand(CreateProductDTO model)
        {
            this.Model = model;
        }
    }

    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, int>
    {
        private readonly IUnitOfWork _repository;
        private readonly IValidator<CreateProductDTO> _validator;

        public CreateProductCommandHandler(IUnitOfWork repository, IValidator<CreateProductDTO> validator)
        {
            _repository = repository;
            _validator = validator;
        }

        public async Task<int> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            CreateProductDTO model = request.Model;

            var result = _validator.Validate(model);

            if (!result.IsValid)
            {
                var errors = result.Errors.Select(x => x.ErrorMessage).ToArray();
                throw new InvalidRequestBodyException
                {
                    Errors = errors
                };
            }


            var entity = new Product
            {
                ProductName = model.ProductName,
                ProductDescription = model.ProductDescription,
                ProductImage = model.ProductImage,
                ProductPrice = model.ProductPrice,
                ProductCountry = model.ProductCountry,
                ProductCategory = model.ProductCategory,
                ProductAddedOn = model.ProductAddedOn
            };
            _repository.Product.Add(entity);
            await _repository.CommitAsync();

            return entity.Id;
        }
    }
}