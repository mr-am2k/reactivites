
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>> //Command doesn't return data
        {
            public Activity Activity { get; set; } //this is what we want to receive as a parameter
        }

        public class CommandValidatior : AbstractValidator<Command> //creating class for validation that build on abstractValidatior that ispart of fluentValidation 
        {
            public CommandValidatior()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator()); //set rule for activity where we are setting validator on our ActivityValdiator which makes sure that none of oure fields is empty
            }
        }


        public class Handler : IRequestHandler<Command, Result<Unit>>
        {

            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                var result = await _context.SaveChangesAsync() > 0; //SaveChanges returns number on entries updated in DB, so if it's not greater than 0, that means that nothing has changed

                if (!result) return Result<Unit>.Failure("Failed to create activity!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}