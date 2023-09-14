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
    public class CreateCategoryCommand : IRequest<int>
    {
        public CreateCategoryDTO Model { get; }
        public CreateCategoryCommand(CreateCategoryDTO model)
        {
            this.Model = model;
        }
    }

    public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, int>
    {
        private readonly IUnitOfWork _repository;
        private readonly IValidator<CreateCategoryDTO> _validator;

        public CreateCategoryCommandHandler(IUnitOfWork repository, IValidator<CreateCategoryDTO> validator)
        {
            _repository = repository;
            _validator = validator;
        }

        public async Task<int> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
        {
            CreateCategoryDTO model = request.Model;

            var result = _validator.Validate(model);

            if (!result.IsValid)
            {
                var errors = result.Errors.Select(x => x.ErrorMessage).ToArray();
                throw new InvalidRequestBodyException
                {
                    Errors = errors
                };
            }


            var entity = new Category
            {
                CategoryName = model.CategoryName,
                CategoryDescription = model.CategoryDescription,
                CategoryAddedOn = model.CategoryAddedOn
            };
            _repository.Category.Add(entity);
            await _repository.CommitAsync();

            return entity.Id;
        }
    }
}