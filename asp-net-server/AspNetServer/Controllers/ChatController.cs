using AspNetServer.Models;
using AspNetServer.Responses;
using Microsoft.AspNetCore.Mvc;

namespace AspNetServer.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        [HttpPost]
        public IActionResult Post([FromBody] ChatRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Message))
                return BadRequest(new { error = "Message is required." });

            var response = new ChatResponse
            {
                Reply = $"(Mocked GPT Response) You said: {request.Message}"
            };

            return Ok(response);
        }
    }
}
