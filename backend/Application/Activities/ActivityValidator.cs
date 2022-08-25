using Domain;
using FluentValidation;

namespace Application.Activities
{
    public class ActivityValidator : AbstractValidator<Activity>
    {
        public ActivityValidator()
        {
            //Making sure that all fields aren't empty
            RuleFor(activity => activity.Title).NotEmpty();
            RuleFor(activity => activity.Description).NotEmpty();
            RuleFor(activity => activity.Date).NotEmpty();
            RuleFor(activity => activity.Category).NotEmpty();
            RuleFor(activity => activity.City).NotEmpty();
            RuleFor(activity => activity.Venue).NotEmpty();
        }
    }
}
