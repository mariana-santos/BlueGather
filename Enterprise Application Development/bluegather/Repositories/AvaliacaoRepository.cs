using bluegather.Dtos;
using BlueGather.Context;
using BlueGather.Dto;
using BlueGather.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BlueGather.Repositories
{
    public class AvaliacaoRepository : Repository<AvaliacaoModel>
    {
        public AvaliacaoRepository(BlueGatherContext blueGatherContext) : base(blueGatherContext) { }

        public async Task<AvaliacaoResumoDto> FindAvaliacaoResumoByEventoId(long eventoId)
        {
            return await _blueGatherContext.Avaliacao
                .Where(a => a.Evento.Id == eventoId)
                .GroupBy(a => a.Evento.Id)
                .Select(g => new AvaliacaoResumoDto
                {
                    IdEvento = g.Key,
                    QtdAvaliadores = g.LongCount(),
                    MediaNota = g.Average(a => a.Nota)
                })
                .FirstOrDefaultAsync();
        }
    }
}