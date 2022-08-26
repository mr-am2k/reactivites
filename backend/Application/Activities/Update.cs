using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Update
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class CommandValidatior : AbstractValidator<Command> 
        {
            public CommandValidatior()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator()); 
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            public DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activityForUpdate = await _context.Activities.FindAsync(request.Activity.Id);

                if(activityForUpdate == null) return null;

                _mapper.Map(request.Activity, activityForUpdate);

               var result =  await _context.SaveChangesAsync() > 0;

               if (!result) return Result<Unit>.Failure("Failed to edit activity!");

               return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}