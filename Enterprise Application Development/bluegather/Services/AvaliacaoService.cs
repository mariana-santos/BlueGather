using Microsoft.EntityFrameworkCore;
using BlueGather.Dto;
using BlueGather.Models;
using BlueGather.Context;

namespace BlueGather.Services;
public class AvaliacaoService
{
    private readonly BlueGatherContext _context;

    public AvaliacaoService(BlueGatherContext context)
    {
        _context = context;
    }

    public async Task<List<AvaliacaoDto>> FindAll()
    {
        var list = await _context.Avaliacao
            .Include(x => x.Evento)
            .Include(x => x.Avaliador)
            .ToListAsync();

        return list.Select(entity => ConvertToDto(entity)).ToList();
    }

    public async Task<AvaliacaoDto> FindById(long id)
    {
        var entity = await FindEntityById(id);
        return ConvertToDto(entity);
    }

    public async Task<AvaliacaoDto> Create(AvaliacaoDto newData)
    {
        var entity = await ConvertToEntity(newData);
        _context.Avaliacao.Add(entity);
        await _context.SaveChangesAsync();
        return ConvertToDto(entity);
    }

    public async Task<AvaliacaoDto> Update(long id, AvaliacaoDto updatedData)
    {
        var entity = await FindEntityById(id);
        updatedData.Id = entity.Id;
        var updatedEntity = await ConvertToEntity(updatedData);
        _context.Entry(entity).CurrentValues.SetValues(updatedEntity);
        await _context.SaveChangesAsync();
        return ConvertToDto(entity);
    }

    public async Task Delete(long id)
    {
        var entity = await FindEntityById(id);
        _context.Avaliacao.Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<AvaliacaoModel> FindEntityById(long id)
    {
        var entity = await _context.Avaliacao
            .Include(x => x.Evento)
            .Include(x => x.Avaliador)
            .FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
        {
            throw new KeyNotFoundException($"Objeto não encontrado com o ID: {id}");
        }
        return entity;
    }

    public async Task<List<AvaliacaoDto>> FindByEventoId(long id)
    {
        var list = await _context.Avaliacao
            .Where(x => x.Evento.Id == id)
            .Include(x => x.Evento)
            .Include(x => x.Avaliador)
            .ToListAsync();

        return list.Select(x => ConvertToDto(x)).ToList();
    }

    public async Task<List<AvaliacaoDto>> FindByAvaliadorId(long id)
    {
        var list = await _context.Avaliacao
            .Where(x => x.Avaliador.Id == id)
            .Include(x => x.Evento)
            .Include(x => x.Avaliador)
            .ToListAsync();

        return list.Select(x => ConvertToDto(x)).ToList();
    }

    private AvaliacaoDto ConvertToDto(AvaliacaoModel entity)
    {
        return new AvaliacaoDto
        {
            Id = entity.Id,
            IdEvento = entity.Evento.Id,
            IdAvaliador = entity.Avaliador.Id,
            Nota = entity.Nota
        };
    }

    private async Task<AvaliacaoModel> ConvertToEntity(AvaliacaoDto dto)
    {
        var evento = await _context.Evento.FindAsync(dto.IdEvento);
        if (evento == null)
        {
            throw new KeyNotFoundException($"Objeto não encontrado com o ID: {dto.IdEvento}");
        }

        var avaliador = await _context.Usuario.FindAsync(dto.IdAvaliador);
        if (avaliador == null)
        {
            throw new KeyNotFoundException($"Objeto não encontrado com o ID: {dto.IdAvaliador}");
        }

        return new AvaliacaoModel
        {
            Id = dto.Id ?? 0,
            Evento = evento,
            Avaliador = avaliador,
            Nota = dto.Nota
        };
    }
}