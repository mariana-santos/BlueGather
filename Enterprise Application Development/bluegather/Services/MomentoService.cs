using Microsoft.EntityFrameworkCore;
using BlueGather.Dto;
using BlueGather.Models;
using BlueGather.Context;

namespace BlueGather.Services;
public class MomentoService
{
    private readonly BlueGatherContext _context;

    public MomentoService(BlueGatherContext context)
    {
        _context = context;
    }

    public async Task<List<MomentoDto>> FindAll()
    {
        var list = await _context.Momento
            .ToListAsync();

        return list.Select(entity => ConvertToDto(entity)).ToList();
    }

    public async Task<MomentoDto> FindById(long id)
    {
        var entity = await FindEntityById(id);
        return ConvertToDto(entity);
    }

    public async Task<MomentoDto> Create(MomentoDto newData)
    {
        var entity = await ConvertToEntity(newData);
        _context.Momento.Add(entity);
        await _context.SaveChangesAsync();
        return ConvertToDto(entity);
    }

    public async Task<MomentoDto> Update(long id, MomentoDto updatedData)
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
        _context.Momento.Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<MomentoModel> FindEntityById(long id)
    {
        var entity = await _context.Momento
            .FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
        {
            throw new KeyNotFoundException($"Objeto não encontrado com o ID: {id}");
        }
        return entity;
    }

    private MomentoDto ConvertToDto(MomentoModel entity)
    {
        return new MomentoDto
        {
            Id = entity.Id,
            Nome = entity.Nome,
        };
    }

    private async Task<MomentoModel> ConvertToEntity(MomentoDto dto)
    {
        return new MomentoModel
        {
            Id = dto.Id ?? 0,
            Nome = dto.Nome
        };
    }
}