using Microsoft.AspNetCore.Mvc;
using BlueGather.Dto;
using BlueGather.Services;

namespace BlueGather.Controllers
{
    [Route("/evento")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly EventoService _service;

        public EventoController(EventoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventoDto>>> FindAll()
        {
            var list = await _service.FindAll();
            return Ok(list);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EventoDto>> FindById(long id)
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
        public async Task<ActionResult<EventoDto>> Create([FromBody] EventoDto dto)
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
        public async Task<ActionResult<EventoDto>> Update(long id, [FromBody] EventoDto updatedEventoDto)
        {
            try
            {
                var updated = await _service.Update(id, updatedEventoDto);
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

        [HttpGet("urgencia/{urgencia}")]
        public async Task<ActionResult<IEnumerable<EventoDto>>> FindByUrgencia(long urgencia)
        {
            try
            {
                var list = await _service.FindByUrgencia(urgencia);
                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("organizador/{id}")]
        public async Task<ActionResult<IEnumerable<EventoDto>>> FindByOrganizadorId(long id)
        {
            try
            {
                var list = await _service.FindByOrganizadorId(id);
                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("tipo/{id}")]
        public async Task<ActionResult<IEnumerable<EventoDto>>> FindByTipoEventoId(long id)
        {
            try
            {
                var list = await _service.FindByTipoEventoId(id);
                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("status/{id}")]
        public async Task<ActionResult<IEnumerable<EventoDto>>> FindByStatusId(long id)
        {
            try
            {
                var list = await _service.FindByStatusId(id);
                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("titulo/{titulo}")]
        public async Task<ActionResult<IEnumerable<EventoDto>>> FindByTitulo(string titulo)
        {
            try
            {
                var list = await _service.FindByTitulo(titulo);
                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("localizacao/{raio}")]
        public async Task<ActionResult<List<EventoDto>>> FindByLocalizacaoERaio(double raio, [FromBody] Dictionary<string, string> coordenadas)
        {
            try
            {
                if (!coordenadas.TryGetValue("latitude", out var latStr) || !double.TryParse(latStr, out var latitude) ||
                    !coordenadas.TryGetValue("longitude", out var lonStr) || !double.TryParse(lonStr, out var longitude))
                {
                    return BadRequest("Coordenadas inválidas.");
                }

                var list = await _service.FindByLocalizacaoERaio(latitude, longitude, raio);
                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("data/{dataInicio}")]
        public async Task<ActionResult<HashSet<EventoDto>>> FindByDataInicioAfter(DateTime dataInicio)
        {
            try
            {
                var list = await _service.FindByDataInicioAfter(dataInicio);
                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("voluntario/{id}")]
        public async Task<ActionResult<HashSet<EventoDto>>> FindByVoluntarioId(long id)
        {
            try
            {
                var list = await _service.FindByVoluntarioId(id);
                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}