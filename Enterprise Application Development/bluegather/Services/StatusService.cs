using Microsoft.EntityFrameworkCore;
using BlueGather.Dto;
using BlueGather.Models;
using BlueGather.Context;

namespace BlueGather.Services;
public class StatusService
{
    private readonly BlueGatherContext _context;

    public StatusService(BlueGatherContext context)
    {
        _context = context;
    }

    public async Task<List<StatusDto>> FindAll()
    {
        var list = await _context.Status
            .ToListAsync();

        return list.Select(entity => ConvertToDto(entity)).ToList();
    }

    public async Task<StatusDto> FindById(long id)
    {
        var entity = await FindEntityById(id);
        return ConvertToDto(entity);
    }

    public async Task<StatusDto> Create(StatusDto newData)
    {
        var entity = await ConvertToEntity(newData);
        _context.Status.Add(entity);
        await _context.SaveChangesAsync();
        return ConvertToDto(entity);
    }

    public async Task<StatusDto> Update(long id, StatusDto updatedData)
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
        _context.Status.Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<StatusModel> FindEntityById(long id)
    {
        var entity = await _context.Status
            .FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
        {
            throw new KeyNotFoundException($"Objeto não encontrado com o ID: {id}");
        }
        return entity;
    }

    public async Task<List<StatusDto>> FindByName(string nome)
    {
        var list = await _context.Status
            .Where(x => x.Nome.ToLower().Contains(nome.ToLower()))
            .ToListAsync();

        return list.Select(x => ConvertToDto(x)).ToList();
    }

    private StatusDto ConvertToDto(StatusModel entity)
    {
        return new StatusDto
        {
            Id = entity.Id,
            Nome = entity.Nome,
        };
    }

    private async Task<StatusModel> ConvertToEntity(StatusDto dto)
    {
        return new StatusModel
        {
            Id = dto.Id ?? 0,
            Nome = dto.Nome
        };
    }
}