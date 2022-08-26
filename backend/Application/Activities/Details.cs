using MediatR;
using Domain;
using Persistence;
using Application.Core;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Result<Activity>> //creating class query that builds on Request interface, also if we need to use some parameters for search, we will add them here
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Activity>> //Handler class will handle our request, builds up on RequestHandler interface which accepts 2 parameters (our Query class, our data model)
        {
            private readonly DataContext _context;
            public Handler(DataContext context) //in constructor creating connection with DataContext
            {
                _context = context;
            }
            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken) //method that does our logic
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                return Result<Activity>.Success(activity);
            }
        }
    }
}