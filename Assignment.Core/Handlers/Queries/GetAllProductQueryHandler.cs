using AutoMapper;
using Assignment.Contracts.Data;
using Assignment.Contracts.Data.Entities;
using Assignment.Contracts.DTO;
using MediatR;
using System.Linq;

namespace Assignment.Providers.Handlers.Queries
{
    public class GetAllProductQuery : IRequest<IEnumerable<ProductDTO>>
    {
    }

    public class GetAllProductQueryHandler : IRequestHandler<GetAllProductQuery, IEnumerable<ProductDTO>>
    {
        private readonly IUnitOfWork _repository;
        private readonly IMapper _mapper;

        public GetAllProductQueryHandler(IUnitOfWork repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProductDTO>> Handle(GetAllProductQuery request, CancellationToken cancellationToken)
        {
            var entities = await Task.FromResult(_repository.Product.GetAll());
            return _mapper.Map<IEnumerable<ProductDTO>>(entities);
        }
    }
}