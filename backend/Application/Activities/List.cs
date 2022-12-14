using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<Activity>>>{}
        public class Handler : IRequestHandler<Query, Result<List<Activity>>>
        {

            public readonly DataContext _context;
            public Handler(DataContext context){
                _context = context;
            }
            public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities =  await _context.Activities.ToListAsync();
                return Result<List<Activity>>.Success(activities);
            }
        }

    }
}