using Microsoft.EntityFrameworkCore;
using BlueGather.Dto;
using BlueGather.Models;
using BlueGather.Context;

namespace BlueGather.Services;
public class TipoEventoService
{
    private readonly BlueGatherContext _context;

    public TipoEventoService(BlueGatherContext context)
    {
        _context = context;
    }

    public async Task<List<TipoEventoDto>> FindAll()
    {
        var list = await _context.TipoEvento
            .ToListAsync();

        return list.Select(entity => ConvertToDto(entity)).ToList();
    }

    public async Task<TipoEventoDto> FindById(long id)
    {
        var entity = await FindEntityById(id);
        return ConvertToDto(entity);
    }

    public async Task<TipoEventoDto> Create(TipoEventoDto newData)
    {
        var entity = await ConvertToEntity(newData);
        _context.TipoEvento.Add(entity);
        await _context.SaveChangesAsync();
        return ConvertToDto(entity);
    }

    public async Task<TipoEventoDto> Update(long id, TipoEventoDto updatedData)
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
        _context.TipoEvento.Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<TipoEventoModel> FindEntityById(long id)
    {
        var entity = await _context.TipoEvento
            .FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
        {
            throw new KeyNotFoundException($"Objeto não encontrado com o ID: {id}");
        }
        return entity;
    }

    public async Task<List<TipoEventoDto>> FindByName(string nome)
    {
        var list = await _context.TipoEvento
            .Where(x => x.Nome.ToLower().Contains(nome.ToLower()))
            .ToListAsync();

        return list.Select(x => ConvertToDto(x)).ToList();
    }

    private TipoEventoDto ConvertToDto(TipoEventoModel entity)
    {
        return new TipoEventoDto
        {
            Id = entity.Id,
            Nome = entity.Nome,
        };
    }

    private async Task<TipoEventoModel> ConvertToEntity(TipoEventoDto dto)
    {
        return new TipoEventoModel
        {
            Id = dto.Id ?? 0,
            Nome = dto.Nome
        };
    }
}