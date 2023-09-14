using MediatR;
using Assignment.Contracts.DTO;
using Assignment.Contracts.Data;
using Assignment.Core.Exceptions;
using AutoMapper;

namespace Assignment.Providers.Handlers.Queries
{
    public class GetUserByIdQuery : IRequest<UserDTO>
    {
        public int UserId { get; }
        public GetUserByIdQuery(int userId)
        {
            UserId = userId;
        }
    }

    public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, UserDTO>
    {
        private readonly IUnitOfWork _repository;
        private readonly IMapper _mapper;

        public GetUserByIdQueryHandler(IUnitOfWork repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<UserDTO> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
        {
            var user = await Task.FromResult(_repository.User.Get(request.UserId));

            if (user == null)
            {
                throw new EntityNotFoundException($"No User found for Id {request.UserId}");
            }

            return _mapper.Map<UserDTO>(user);
        }
    }
}