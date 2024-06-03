using Microsoft.EntityFrameworkCore;
using BlueGather.Dto;
using BlueGather.Models;
using BlueGather.Context;

namespace BlueGather.Services;
public class UsuarioService
{
    private readonly BlueGatherContext _context;

    public UsuarioService(BlueGatherContext context)
    {
        _context = context;
    }

    public async Task<List<UsuarioDto>> FindAll()
    {
        var list = await _context.Usuario
            .Include(x => x.Eventos)
            .ToListAsync();

        return list.Select(entity => ConvertToDto(entity)).ToList();
    }

    public async Task<UsuarioDto> FindById(long id)
    {
        var entity = await FindEntityById(id);
        return ConvertToDto(entity);
    }

    public async Task<UsuarioDto> Create(UsuarioDto newData)
    {
        var entity = await ConvertToEntity(newData);
        _context.Usuario.Add(entity);
        await _context.SaveChangesAsync();
        return ConvertToDto(entity);
    }

    public async Task<UsuarioDto> Update(long id, UsuarioDto updatedData)
    {
        var entity = await _context.Usuario
            .Include(x => x.Eventos)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
        {
            throw new KeyNotFoundException($"Objeto não encontrado com o ID: {id}.");
        }

        entity.Eventos.Clear();

        if (updatedData.IdsEventos != null)
        {
            var newEventos = await _context.Evento.Where(e => updatedData.IdsEventos.Contains(e.Id)).ToListAsync();
            foreach (var evento in newEventos)
            {
                entity.Eventos.Add(evento);
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
        _context.Usuario.Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<UsuarioModel> FindEntityById(long id)
    {
        var entity = await _context.Usuario
            .Include(x => x.Eventos)
            .FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
        {
            throw new KeyNotFoundException($"Objeto não encontrado com o ID: {id}");
        }
        return entity;
    }

    public async Task<List<UsuarioDto>> FindByEventoId(long id)
    {
        var list = await _context.Usuario
            .Where(u => u.Eventos.Any(t => t.Id == id))
            .Include(x => x.Eventos)
            .ToListAsync();

        return list.Select(x => ConvertToDto(x)).ToList();
    }

    private UsuarioDto ConvertToDto(UsuarioModel entity)
    {
        return new UsuarioDto
        {
            Id = entity.Id,
            Cpf = entity.Cpf,
            Nome = entity.Nome,
            UrlImagem = entity.UrlImagem,
            Email = entity.Email,
            Senha = entity.Senha,
            IdsEventos = entity.Eventos.Select(e => e.Id).ToList()
        };
    }

    private async Task<UsuarioModel> ConvertToEntity(UsuarioDto dto)
    {
        var eventos = new List<EventoModel>();
        if (dto.IdsEventos != null && dto.IdsEventos.Any())
        {
            eventos = await _context.Evento.Where(evento => dto.IdsEventos.Contains(evento.Id)).ToListAsync();
        }

        return new UsuarioModel
        {
            Id = dto.Id ?? 0,
            Cpf = dto.Cpf,
            Nome = dto.Nome,
            UrlImagem = dto.UrlImagem,
            Email = dto.Email,
            Senha = dto.Senha,
            Eventos = eventos
        };
    }
}