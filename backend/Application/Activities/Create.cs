
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest //Command doesn't return data
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


        public class Handler : IRequestHandler<Command>
        {

            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}