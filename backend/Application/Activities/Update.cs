using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Update
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            public DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activityForUpdate = await _context.Activities.FindAsync(request.Activity.Id);

                _mapper.Map(request.Activity, activityForUpdate);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}