using Microsoft.EntityFrameworkCore;
using BlueGather.Dto;
using BlueGather.Models;
using BlueGather.Context;

namespace BlueGather.Services;
public class EventoService
{
    private readonly BlueGatherContext _context;

    public EventoService(BlueGatherContext context)
    {
        _context = context;
    }

    public async Task<List<EventoDto>> FindAll()
    {
        var list = await _context.Evento
            .Include(x => x.Organizador)
            .Include(x => x.TipoEvento)
            .Include(x => x.Status)
            .Include(x => x.Voluntarios)
            .ToListAsync();

        return list.Select(entity => ConvertToDto(entity)).ToList();
    }

    public async Task<EventoDto> FindById(long id)
    {
        var entity = await FindEntityById(id);
        return ConvertToDto(entity);
    }

    public async Task<EventoDto> Create(EventoDto newData)
    {
        var entity = await ConvertToEntity(newData);
        _context.Evento.Add(entity);
        await _context.SaveChangesAsync();
        return ConvertToDto(entity);
    }

    public async Task<EventoDto> Update(long id, EventoDto updatedData)
    {
        var entity = await _context.Evento
            .Include(x => x.Voluntarios)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
        {
            throw new KeyNotFoundException($"Objeto não encontrado com o ID: {id}.");
        }

        entity.Voluntarios.Clear();

        if (updatedData.IdsVoluntarios != null)
        {
            var newVoluntarios = await _context.Usuario.Where(v => updatedData.IdsVoluntarios.Contains(v.Id)).ToListAsync();
            foreach (var voluntario in newVoluntarios)
            {
                entity.Voluntarios.Add(voluntario);
            }
        }

        updatedData.Id = entity.Id;
        var updatedEntity = await ConvertToEntity(updatedData);
        _context.Entry(entity).CurrentValues.SetValues(updatedEntity);
        await _context.SaveChangesAsync();
        return ConvertToDto(entity);
    }

    public async Task Delete(long id)
    {
        var entity = await FindEntityById(id);
        _context.Evento.Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<EventoModel> FindEntityById(long id)
    {
        var entity = await _context.Evento
            .Include(x => x.Organizador)
            .Include(x => x.TipoEvento)
            .Include(x => x.Status)
            .Include(x => x.Voluntarios)
            .FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
        {
            throw new KeyNotFoundException($"Objeto não encontrado com o ID: {id}");
        }
        return entity;
    }

    public async Task<List<EventoDto>> FindByOrganizadorId(long id)
    {
        var list = await _context.Evento
            .Where(x => x.Organizador.Id == id)
            .Include(x => x.Organizador)
            .Include(x => x.TipoEvento)
            .Include(x => x.Status)
            .Include(x => x.Voluntarios)
            .ToListAsync();

        return list.Select(x => ConvertToDto(x)).ToList();
    }

    public async Task<List<EventoDto>> FindByTipoEventoId(long id)
    {
        var list = await _context.Evento
            .Where(x => x.TipoEvento.Id == id)
            .Include(x => x.Organizador)
            .Include(x => x.TipoEvento)
            .Include(x => x.Status)
            .Include(x => x.Voluntarios)
            .ToListAsync();

        return list.Select(x => ConvertToDto(x)).ToList();
    }

    public async Task<List<EventoDto>> FindByStatusId(long id)
    {
        var list = await _context.Evento
            .Where(x => x.Status.Id == id)
            .Include(x => x.Organizador)
            .Include(x => x.TipoEvento)
            .Include(x => x.Status)
            .Include(x => x.Voluntarios)
            .ToListAsync();

        return list.Select(x => ConvertToDto(x)).ToList();
    }

    private EventoDto ConvertToDto(EventoModel entity)
    {
        return new EventoDto
        {
            Id = entity.Id,
            Titulo = entity.Titulo,
            Latitude = entity.Latitude,
            Longitude = entity.Longitude,
            DataInicio = entity.DataInicio,
            DataFim = entity.DataFim,
            Descricao = entity.Descricao,
            Urgencia = entity.Urgencia,
            IdOrganizador = entity.Organizador.Id,
            IdTipoEvento = entity.TipoEvento.Id,
            IdStatus = entity.Status.Id,
        };
    }

    private async Task<EventoModel> ConvertToEntity(EventoDto dto)
    {
        var organizador = await _context.Usuario.FindAsync(dto.IdOrganizador);
        if (organizador == null)
        {
            throw new KeyNotFoundException($"Objeto não encontrado com o ID: {dto.IdOrganizador}");
        }

        var tipo = await _context.TipoEvento.FindAsync(dto.IdTipoEvento);
        if (tipo == null)
        {
            throw new KeyNotFoundException($"Objeto não encontrado com o ID: {dto.IdTipoEvento}");
        }

        var status = await _context.Status.FindAsync(dto.IdStatus);
        if (status == null)
        {
            throw new KeyNotFoundException($"Objeto não encontrado com o ID: {dto.IdStatus}");
        }

        return new EventoModel
        {
            Id = dto.Id ?? 0,
            Titulo = dto.Titulo,
            Latitude = dto.Latitude,
            Longitude = dto.Longitude,
            DataInicio = dto.DataInicio,
            DataFim = dto.DataFim,
            Descricao = dto.Descricao,
            Urgencia = dto.Urgencia,
            Organizador = organizador,
            TipoEvento = tipo,
            Status = status
        };
    }
}