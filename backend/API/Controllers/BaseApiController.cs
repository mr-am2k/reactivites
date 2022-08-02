using Microsoft.AspNetCore.Mvc;
using MediatR;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]

    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
        //??= means that if _mediator is null, we will assign anything that is after = sign to the Mediator
    }
}