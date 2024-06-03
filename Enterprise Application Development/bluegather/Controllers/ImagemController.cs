using Microsoft.AspNetCore.Mvc;
using BlueGather.Dto;
using BlueGather.Services;

namespace BlueGather.Controllers
{
    [Route("/imagem")]
    [ApiController]
    public class ImagemController : ControllerBase
    {
        private readonly ImagemService _service;

        public ImagemController(ImagemService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ImagemDto>>> FindAll()
        {
            var list = await _service.FindAll();
            return Ok(list);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ImagemDto>> FindById(long id)
        {
            try
            {
                var dto = await _service.FindById(id);
                return Ok(dto);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult<ImagemDto>> Create([FromBody] ImagemDto dto)
        {
            try
            {
                var created = await _service.Create(dto);
                return CreatedAtAction(nameof(FindById), new { id = created.Id }, created);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ImagemDto>> Update(long id, [FromBody] ImagemDto updatedImagemDto)
        {
            try
            {
                var updated = await _service.Update(id, updatedImagemDto);
                return Ok(updated);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            try
            {
                await _service.Delete(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("evento/{id}")]
        public async Task<ActionResult<IEnumerable<ImagemDto>>> FindByEventoId(long id)
        {
            try
            {
                var list = await _service.FindByEventoId(id);
                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("momento/{id}")]
        public async Task<ActionResult<IEnumerable<ImagemDto>>> FindByMomentoId(long id)
        {
            try
            {
                var list = await _service.FindByMomentoId(id);
                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}