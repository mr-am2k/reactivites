using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.Activities;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class ActivitiesController : ControllerBase
{
    private readonly IMediator _mediator;
    
    public ActivitiesController(IMediator mediator){
            _mediator = mediator;
           
    }

    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities(){
        return await _mediator.Send(new List.Query());
    }

    [HttpGet ("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id){
        return Ok();
    }
}