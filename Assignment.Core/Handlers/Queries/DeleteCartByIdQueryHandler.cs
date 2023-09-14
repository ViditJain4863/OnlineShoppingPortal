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
    public class DeleteCartByIdQuery : IRequest<CartDTO>
    {
        public int CartId { get; }
        public DeleteCartByIdQuery(int cartId)
        {
            CartId = cartId;
        }
    }

    public class DeleteCartByIdQueryHandler : IRequestHandler<DeleteCartByIdQuery, CartDTO>
    {
        private readonly IUnitOfWork _repository;
        private readonly IMapper _mapper;

        public DeleteCartByIdQueryHandler(IUnitOfWork repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<CartDTO> Handle(DeleteCartByIdQuery request, CancellationToken cancellationToken)
        {

           _repository.Cart.Delete(request.CartId);
            await _repository.CommitAsync();

            return null;
        }
    }
}