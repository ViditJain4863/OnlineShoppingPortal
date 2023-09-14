using Assignment.Contracts.Data;
using Assignment.Contracts.DTO;
using Assignment.Core.Exceptions;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assignment.Providers.Handlers.Queries
{
    public class DeleteUserByIdQuery : IRequest<UserDTO>
    {
        public int UserId { get; }
        public DeleteUserByIdQuery(int userId)
        {
            UserId = userId;
        }
    }

    public class DeleteUserByIdQueryHandler : IRequestHandler<DeleteUserByIdQuery, UserDTO>
    {
        private readonly IUnitOfWork _repository;
        private readonly IMapper _mapper;

        public DeleteUserByIdQueryHandler(IUnitOfWork repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<UserDTO> Handle(DeleteUserByIdQuery request, CancellationToken cancellationToken)
        {

           _repository.User.Delete(request.UserId);
            await _repository.CommitAsync();

            return null;
        }
    }
}