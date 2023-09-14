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
    public class UpdateUserByIdQuery : IRequest<int>
    {
        public CreateUserDTO Model { get; }
        public UpdateUserByIdQuery(CreateUserDTO model)
        {
            this.Model = model;
        }
     
    }

    public class UpdateUserByIdQueryHandler : IRequestHandler<UpdateUserByIdQuery, int>
    {
        private readonly IUnitOfWork _repository;
        private readonly IValidator<CreateUserDTO> _validator;

        public UpdateUserByIdQueryHandler(IUnitOfWork repository, IValidator<CreateUserDTO> validator)
        {
            _repository = repository;
            _validator = validator;
        }

        public async Task<int> Handle(UpdateUserByIdQuery request, CancellationToken cancellationToken)
        {  
            CreateUserDTO model = request.Model;
            var result = _validator.Validate(model);
            if (!result.IsValid)
            {
                var errors = result.Errors.Select(x => x.ErrorMessage).ToArray();
                throw new InvalidRequestBodyException
                {
                    Errors = errors
                };
            }
            var entity = new User
            {
                Id= model.Id,
                Password = model.Password,
                EmailAddress = model.EmailAddress,
                FirstName = model.FirstName,
                LastName = model.LastName,
                MobileNumber = model.MobileNumber,
                Role = model.Role,
                Gender = model.Gender,
                Username=model.Username,
                Country = model.Country,
                Pincode = model.Pincode,
                userUpdateDate = model.userUpdateDate
            };
            _repository.User.Update(entity);
            await _repository.CommitAsync();
            return entity.Id;
        }
    }
}

