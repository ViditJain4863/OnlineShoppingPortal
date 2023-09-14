using AutoMapper;
using Assignment.Contracts.Data;
using Assignment.Contracts.Data.Entities;
using Assignment.Contracts.DTO;
using MediatR;
using System.Linq;

namespace Assignment.Providers.Handlers.Queries
{
    public class GetAllCartQuery : IRequest<IEnumerable<CartDTO>>
    {
    }

    public class GetAllCartQueryHandler : IRequestHandler<GetAllCartQuery, IEnumerable<CartDTO>>
    {
        private readonly IUnitOfWork _repository;
        private readonly IMapper _mapper;

        public GetAllCartQueryHandler(IUnitOfWork repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CartDTO>> Handle(GetAllCartQuery request, CancellationToken cancellationToken)
        {
            var entities = await Task.FromResult(_repository.Cart.GetAll());
            return _mapper.Map<IEnumerable<CartDTO>>(entities);
        }
    }
}