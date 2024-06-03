using Microsoft.EntityFrameworkCore;
using BlueGather.Dto;
using BlueGather.Models;
using BlueGather.Context;

namespace BlueGather.Services;
public class ImagemService
{
    private readonly BlueGatherContext _context;

    public ImagemService(BlueGatherContext context)
    {
        _context = context;
    }

    public async Task<List<ImagemDto>> FindAll()
    {
        var list = await _context.Imagem
            .Include(x => x.Evento)
            .Include(x => x.Momento)
            .ToListAsync();

        return list.Select(entity => ConvertToDto(entity)).ToList();
    }

    public async Task<ImagemDto> FindById(long id)
    {
        var entity = await FindEntityById(id);
        return ConvertToDto(entity);
    }

    public async Task<ImagemDto> Create(ImagemDto newData)
    {
        var entity = await ConvertToEntity(newData);
        _context.Imagem.Add(entity);
        await _context.SaveChangesAsync();
        return ConvertToDto(entity);
    }

    public async Task<ImagemDto> Update(long id, ImagemDto updatedData)
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
        _context.Imagem.Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<ImagemModel> FindEntityById(long id)
    {
        var entity = await _context.Imagem
            .Include(x => x.Evento)
            .Include(x => x.Momento)
            .FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
        {
            throw new KeyNotFoundException($"Objeto não encontrado com o ID: {id}");
        }
        return entity;
    }

    public async Task<List<ImagemDto>> FindByEventoId(long id)
    {
        var list = await _context.Imagem
            .Where(x => x.Evento.Id == id)
            .Include(x => x.Evento)
            .Include(x => x.Momento)
            .ToListAsync();

        return list.Select(x => ConvertToDto(x)).ToList();
    }

    public async Task<List<ImagemDto>> FindByMomentoId(long id)
    {
        var list = await _context.Imagem
            .Where(x => x.Momento.Id == id)
            .Include(x => x.Evento)
            .Include(x => x.Momento)
            .ToListAsync();

        return list.Select(x => ConvertToDto(x)).ToList();
    }

    private ImagemDto ConvertToDto(ImagemModel entity)
    {
        return new ImagemDto
        {
            Id = entity.Id,
            IdEvento = entity.Evento.Id,
            IdMomento = entity.Momento.Id,
            UrlImagem = entity.UrlImagem
        };
    }

    private async Task<ImagemModel> ConvertToEntity(ImagemDto dto)
    {
        var evento = await _context.Evento.FindAsync(dto.IdEvento);
        if (evento == null)
        {
            throw new KeyNotFoundException($"Objeto não encontrado com o ID: {dto.IdEvento}");
        }

        var momento = await _context.Momento.FindAsync(dto.IdMomento);
        if (momento == null)
        {
            throw new KeyNotFoundException($"Objeto não encontrado com o ID: {dto.IdMomento}");
        }

        return new ImagemModel
        {
            Id = dto.Id ?? 0,
            Evento = evento,
            Momento = momento,
            UrlImagem = dto.UrlImagem
        };
    }
}