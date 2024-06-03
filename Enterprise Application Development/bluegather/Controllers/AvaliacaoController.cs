﻿using Microsoft.AspNetCore.Mvc;
using BlueGather.Dto;
using BlueGather.Services;

namespace BlueGather.Controllers
{
    [Route("/avaliacao")]
    [ApiController]
    public class AvaliacaoController : ControllerBase
    {
        private readonly AvaliacaoService _service;

        public AvaliacaoController(AvaliacaoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AvaliacaoDto>>> FindAll()
        {
            var list = await _service.FindAll();
            return Ok(list);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AvaliacaoDto>> FindById(long id)
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
        public async Task<ActionResult<AvaliacaoDto>> Create([FromBody] AvaliacaoDto dto)
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
        public async Task<ActionResult<AvaliacaoDto>> Update(long id, [FromBody] AvaliacaoDto updatedAvaliacaoDto)
        {
            try
            {
                var updated = await _service.Update(id, updatedAvaliacaoDto);
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
        public async Task<ActionResult<IEnumerable<AvaliacaoDto>>> FindByEventoId(long id)
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

        [HttpGet("avaliador/{id}")]
        public async Task<ActionResult<IEnumerable<AvaliacaoDto>>> FindByAvaliadorId(long id)
        {
            try
            {
                var list = await _service.FindByAvaliadorId(id);
                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}