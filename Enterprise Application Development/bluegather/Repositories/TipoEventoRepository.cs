using BlueGather.Context;
using BlueGather.Models;

namespace BlueGather.Repositories
{
    public class TipoEventoRepository : Repository<TipoEventoModel>
    {
        public TipoEventoRepository(BlueGatherContext blueGatherContext) : base(blueGatherContext) { }
    }
}